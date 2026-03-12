"""RandomForest model for near-expiry promotion prioritization."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

MODEL_PATH = Path(__file__).resolve().parent / "promotion_model.joblib"


@dataclass
class PromotionPriorityModel:
    """Encapsulates training and scoring logic for product promotion priority."""

    model: RandomForestClassifier | None = None

    def _feature_frame(self, products: pd.DataFrame) -> pd.DataFrame:
        frame = products.copy()
        frame["expiry_date"] = pd.to_datetime(frame["expiry_date"], errors="coerce")
        frame["days_to_expiry"] = (frame["expiry_date"] - pd.Timestamp.now().normalize()).dt.days
        frame["days_to_expiry"] = frame["days_to_expiry"].clip(lower=0).fillna(14)
        frame["stock_count"] = frame["stock_count"].fillna(0)
        frame["sales_last_week"] = frame["sales_last_week"].fillna(0)
        return frame

    def train(self, products: pd.DataFrame) -> "PromotionPriorityModel":
        """Train a RandomForestClassifier from heuristic pseudo-labels."""
        frame = self._feature_frame(products)

        # Heuristic target that emphasizes near-expiry, high stock, and low sales velocity.
        urgency = 1 / (frame["days_to_expiry"] + 1)
        stock_pressure = np.log1p(frame["stock_count"])
        slow_sales = 1 / (frame["sales_last_week"] + 1)
        raw_priority = (0.55 * urgency) + (0.30 * stock_pressure / stock_pressure.max()) + (0.15 * slow_sales)

        threshold = float(np.quantile(raw_priority, 0.65))
        y = (raw_priority >= threshold).astype(int)

        X = frame[["days_to_expiry", "stock_count", "sales_last_week"]]
        self.model = RandomForestClassifier(n_estimators=250, random_state=42, class_weight="balanced")
        self.model.fit(X, y)
        return self

    def save(self, path: Path = MODEL_PATH) -> None:
        if self.model is None:
            raise ValueError("Model is not trained.")
        joblib.dump(self.model, path)

    def load(self, path: Path = MODEL_PATH) -> "PromotionPriorityModel":
        self.model = joblib.load(path)
        return self

    def score(self, products: pd.DataFrame) -> pd.DataFrame:
        """Predict promotion probability and return enriched frame."""
        if self.model is None:
            raise ValueError("Model is not available. Train or load it first.")

        frame = self._feature_frame(products)
        X = frame[["days_to_expiry", "stock_count", "sales_last_week"]]
        frame["priority_score"] = self.model.predict_proba(X)[:, 1]
        return frame
