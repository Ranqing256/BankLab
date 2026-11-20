from typing import Iterable, Mapping, Any


def _to_fraction(value: float) -> float:
    if value < 0:
        raise ValueError("cost must be non-negative")
    return value / 100 if value > 1 else value


def calculate_weighted_average_cost(sources: Iterable[Mapping[str, Any]]) -> dict:
    """教材 3.4.2 历史加权平均成本法。

    amount 使用货币单位，unit_cost 使用百分数（如 8 表示 8%）。
    available_ratio 为可用资金比率百分数；缺省为 100%。
    """
    items = []
    total_amount = 0.0
    weighted_sum = 0.0
    available_amount = 0.0
    available_weighted_sum = 0.0
    for raw in sources:
        name = str(raw.get("name", "资金来源"))
        amount = float(raw.get("amount", 0))
        unit_cost_pct = float(raw.get("unit_cost", 0))
        available_ratio_pct = float(raw.get("available_ratio", 100))
        if amount < 0 or unit_cost_pct < 0 or not (0 < available_ratio_pct <= 100):
            raise ValueError("amount, unit_cost and available_ratio are out of range")
        cost_amount = amount * _to_fraction(unit_cost_pct)
        available = amount * available_ratio_pct / 100
        total_amount += amount
        weighted_sum += cost_amount
        available_amount += available
        available_weighted_sum += cost_amount
        items.append({
            "name": name,
            "amount": amount,
            "unit_cost": unit_cost_pct,
            "available_ratio": available_ratio_pct,
            "cost_amount": cost_amount,
            "available_amount": available,
            "contribution_pct": 0.0,
        })
    if total_amount <= 0:
        raise ValueError("total amount must be greater than zero")
    for item in items:
        item["contribution_pct"] = item["cost_amount"] / weighted_sum * 100 if weighted_sum else 0
    return {
        "total_amount": total_amount,
        "total_cost": weighted_sum,
        "weighted_average_cost_pct": weighted_sum / total_amount * 100,
        "available_amount": available_amount,
        "available_cost_pct": available_weighted_sum / available_amount * 100 if available_amount else 0,
        "items": items,
    }

