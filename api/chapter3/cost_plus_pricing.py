from math import isfinite
from typing import Iterable, Mapping, Any


def calculate_cost_plus_pricing(sources: Iterable[Mapping[str, Any]]) -> dict:
    """教材3.2.2案例：以可用于生息资产的资金为分母加权。"""
    items = []
    total = weighted = 0.0
    for raw in sources:
        name = str(raw.get("name", "资金来源"))
        amount = float(raw.get("amount", 0))
        cost_pct = float(raw.get("cost_pct", 0))
        reserve_pct = float(raw.get("reserve_pct", 0))
        if not isfinite(amount) or amount <= 0:
            raise ValueError(f"{name}金额必须大于0")
        if not isfinite(cost_pct) or cost_pct < 0:
            raise ValueError(f"{name}成本率不能为负")
        if not isfinite(reserve_pct) or not 0 <= reserve_pct < 100:
            raise ValueError(f"{name}储备要求必须在0到100%之间")
        available = amount * (1 - reserve_pct / 100)
        cost_contribution = amount * cost_pct / 100 / available
        total += amount
        weighted += cost_contribution * amount
        items.append({"name": name, "amount": amount, "cost_pct": cost_pct,
                      "reserve_pct": reserve_pct, "available": available,
                      "cost_contribution_pct": cost_contribution * 100,
                      "weighted_contribution_pct": cost_contribution * amount / total * 100})
    if not items or total <= 0:
        raise ValueError("资金来源不能为空")
    return {"total_amount": total, "weighted_cost_pct": weighted / total * 100,
            "items": items,
            "price_note": "该结果是加权平均税前资金成本，不是包含营业支出和计划利润的完整服务价格。"}

