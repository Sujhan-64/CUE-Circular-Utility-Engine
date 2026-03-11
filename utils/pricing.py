"""Pricing helpers for circular deal discounts."""

from __future__ import annotations


def discount_percentage(days_to_expiry: int) -> float:
    """Return discount percentage based on expiry urgency."""
    if days_to_expiry <= 1:
        return 0.50
    if days_to_expiry <= 3:
        return 0.30
    if days_to_expiry <= 5:
        return 0.15
    return 0.0


def discounted_price(original_price: float, days_to_expiry: int) -> float:
    """Return final discounted price rounded to 2 decimals."""
    discount = discount_percentage(days_to_expiry)
    return round(original_price * (1 - discount), 2)
