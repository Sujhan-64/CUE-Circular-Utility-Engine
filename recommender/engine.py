"""Content-based recommendation engine for circular products."""

from __future__ import annotations

import json

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class CircularRecommender:
    """Recommend near-expiry products based on user profile and product similarity."""

    def __init__(self, products: pd.DataFrame):
        self.products = products.copy()
        self.vectorizer = TfidfVectorizer()
        self.product_vectors = self.vectorizer.fit_transform(self.products["category"].astype(str))

    def _build_user_profile_text(self, user_row: pd.Series) -> str:
        purchase_history = json.loads(user_row["purchase_history"])
        preferred_categories = json.loads(user_row["preferred_categories"])

        purchased_categories = self.products[
            self.products["product_id"].astype(str).isin([str(p) for p in purchase_history])
        ]["category"].astype(str).tolist()

        profile_tokens = purchased_categories + preferred_categories
        return " ".join(profile_tokens) if profile_tokens else ""

    def recommend(self, users: pd.DataFrame, user_id: str, top_n: int = 10) -> pd.DataFrame:
        """Return top-N recommendations filtered to near-expiry products only."""
        user_match = users[users["user_id"] == user_id]
        if user_match.empty:
            return pd.DataFrame(columns=self.products.columns)

        user_row = user_match.iloc[0]

        if not bool(user_row.get("circular_preference", False)):
            return pd.DataFrame(columns=self.products.columns)

        profile_text = self._build_user_profile_text(user_row)
        if not profile_text:
            return pd.DataFrame(columns=self.products.columns)

        user_vec = self.vectorizer.transform([profile_text])
        similarities = cosine_similarity(user_vec, self.product_vectors).flatten()

        scored = self.products.copy()
        scored["content_similarity"] = similarities

        # Keep near-expiry inventory only (<= 5 days).
        near_expiry = scored[scored["days_to_expiry"] <= 5]
        return near_expiry.sort_values(
            by=["content_similarity", "priority_score"], ascending=[False, False]
        ).head(top_n)
