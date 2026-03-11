"""Dataset loading and mock data generation utilities."""

from __future__ import annotations

import json
import random
from datetime import datetime, timedelta
from pathlib import Path
from typing import Tuple

import numpy as np
import pandas as pd

RNG = random.Random(42)
NP_RNG = np.random.default_rng(42)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PRODUCTS_CSV = DATA_DIR / "products.csv"
USERS_CSV = DATA_DIR / "users.csv"
USERS_TS = DATA_DIR / "users.ts"

CATEGORIES = [
    "Pantry Staples",
    "Fresh Produce",
    "Dairy",
    "Bakery",
    "Frozen",
    "Beverages",
    "Snacks",
    "Household",
]



def _mock_products(num_products: int = 120) -> pd.DataFrame:
    """Create a realistic product dataset with expiry and sales signals."""
    rows = []
    for idx in range(1, num_products + 1):
        category = RNG.choice(CATEGORIES)
        base_price = round(RNG.uniform(2.5, 30.0), 2)
        stock = int(NP_RNG.integers(5, 200))
        sales_last_week = int(NP_RNG.integers(0, 100))
        expiry_offset = int(NP_RNG.integers(0, 14))

        rows.append(
            {
                "product_id": str(idx),
                "name": f"{category} Item {idx}",
                "description": f"High quality {category.lower()} product.",
                "price": base_price,
                "category": category,
                "stock_count": stock,
                "sales_last_week": sales_last_week,
                "expiry_date": (datetime.utcnow() + timedelta(days=expiry_offset)).date().isoformat(),
            }
        )
    return pd.DataFrame(rows)



def _mock_users(product_ids: list[str], num_users: int = 50) -> pd.DataFrame:
    """Create a realistic user dataset with purchase behavior preferences."""
    rows = []
    circular_true_count = int(num_users * 0.4)
    circular_flags = [True] * circular_true_count + [False] * (num_users - circular_true_count)
    RNG.shuffle(circular_flags)

    for idx in range(1, num_users + 1):
        history_size = int(NP_RNG.integers(3, 12))
        purchase_history = RNG.sample(product_ids, k=min(history_size, len(product_ids)))
        preferred = RNG.sample(CATEGORIES, k=int(NP_RNG.integers(1, 4)))

        min_budget = round(RNG.uniform(5, 40), 2)
        max_budget = round(min_budget + RNG.uniform(15, 80), 2)

        rows.append(
            {
                "user_id": f"user_{idx:03d}",
                "purchase_history": json.dumps(purchase_history),
                "preferred_categories": json.dumps(preferred),
                "budget_range": f"{min_budget}-{max_budget}",
                "circular_preference": bool(circular_flags[idx - 1]),
            }
        )
    return pd.DataFrame(rows)



def _write_users_ts(users_df: pd.DataFrame) -> None:
    """Persist users in TypeScript format for frontend/data interoperability."""
    records = users_df.to_dict(orient="records")
    content = "export const users = " + json.dumps(records, indent=2) + " as const;\n"
    USERS_TS.write_text(content, encoding="utf-8")



def ensure_datasets_exist() -> Tuple[pd.DataFrame, pd.DataFrame]:
    """Load datasets with pandas, generating realistic mock data if missing.

    This function checks for existing files first, then creates:
    - data/products.csv
    - data/users.csv
    - data/users.ts
    """

    DATA_DIR.mkdir(parents=True, exist_ok=True)

    if PRODUCTS_CSV.exists():
        products = pd.read_csv(PRODUCTS_CSV)
    else:
        products = _mock_products()
        products.to_csv(PRODUCTS_CSV, index=False)

    if USERS_CSV.exists():
        users = pd.read_csv(USERS_CSV)
    else:
        users = _mock_users(products["product_id"].astype(str).tolist(), num_users=50)
        users.to_csv(USERS_CSV, index=False)

    users["circular_preference"] = users["circular_preference"].astype(str).str.lower().map({"true": True, "false": False}).fillna(False)

    if not USERS_TS.exists():
        _write_users_ts(users)

    return products, users
