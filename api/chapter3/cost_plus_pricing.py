from typing import Iterable, Mapping, Any


def calculate_cost_plus_pricing(sources: Iterable[Mapping[str, Any]]) -> dict:
    """教材 3.2.2: 各项成本按可用于生息资产的资金加权。"""
    items = []
    total = 0.0
    weighted = 0.0
    for raw in sources:
        amount = float(raw.get("amount", 0))
        cost_pct = float(raw.get("cost_pct", 0))
        reserve_pct = float(raw.get("reserve_pct", 0))
        if amount < 0 or cost_pct < 0 or not (0 <= reserve_pct < 100):
            raise ValueError("invalid source parameters")
        available = amount * (1 - reserve_pct / 100)
        contribution = (amount * cost_pct / 100) / available if available else 0
        total += amount
        weighted += amount * cost_pct / 100 / (1 - reserve_pct / 100) if available else 0
        items.append({"name": raw.get("name", "资金来源"), "amount": amount, "cost_pct": cost_pct, "reserve_pct": reserve_pct, "available": available, "contribution_pct": contribution * 100})
    if total <= 0:
        raise ValueError("total amount must be greater than zero")
    return {"total_amount": total, "weighted_cost_pct": weighted / total * 100, "items": items}

