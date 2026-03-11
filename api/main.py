"""FastAPI service exposing circular recommendations and deals."""

from __future__ import annotations

from fastapi import FastAPI, HTTPException

from models.priority_model import MODEL_PATH, PromotionPriorityModel
from recommender.engine import CircularRecommender
from utils.data_loader import ensure_datasets_exist
from utils.pricing import discounted_price

app = FastAPI(title="Circular Utility Engine API", version="1.0.0")

products_df = None
users_df = None
recommender = None


def _response_payload(df):
    payload = []
    for _, row in df.iterrows():
        payload.append(
            {
                "product_id": str(row["product_id"]),
                "name": row["name"],
                "original_price": float(row["price"]),
                "discounted_price": discounted_price(float(row["price"]), int(row["days_to_expiry"])),
                "days_to_expiry": int(row["days_to_expiry"]),
                "priority_score": round(float(row["priority_score"]), 4),
            }
        )
    return payload


@app.on_event("startup")
def startup_event() -> None:
    """Load data, train/load model, and prepare recommender at app startup."""
    global products_df, users_df, recommender

    products, users = ensure_datasets_exist()
    model = PromotionPriorityModel()

    if MODEL_PATH.exists():
        model.load(MODEL_PATH)
    else:
        model.train(products)
        model.save(MODEL_PATH)

    scored_products = model.score(products)

    products_df = scored_products
    users_df = users
    recommender = CircularRecommender(scored_products)


@app.get("/recommendations/{user_id}")
def get_recommendations(user_id: str):
    """Return top 10 near-expiry recommendations for a circular-preference user."""
    if users_df is None or recommender is None:
        raise HTTPException(status_code=503, detail="Service not initialized")

    if users_df[users_df["user_id"] == user_id].empty:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")

    recommendations = recommender.recommend(users_df, user_id=user_id, top_n=10)
    return {"user_id": user_id, "recommendations": _response_payload(recommendations)}


@app.get("/circular-deals")
def get_circular_deals():
    """Return all near-expiry discounted products sorted by priority."""
    if products_df is None:
        raise HTTPException(status_code=503, detail="Service not initialized")

    deals = products_df[products_df["days_to_expiry"] <= 5].sort_values("priority_score", ascending=False)
    return {"count": int(len(deals)), "deals": _response_payload(deals)}
