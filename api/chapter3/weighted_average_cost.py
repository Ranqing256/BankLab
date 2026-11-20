from math import isfinite
from typing import Iterable, Mapping, Any


def _positive(value: Any, label: str) -> float:
    number = float(value)
    if not isfinite(number) or number <= 0:
        raise ValueError(f"{label}必须大于0")
    return number


def calculate_weighted_average_cost(sources: Iterable[Mapping[str, Any]]) -> dict:
    """教材 3.4.2 历史加权平均成本法。百分数输入，例如 8 表示 8%。"""
    items = []
    total_amount = total_cost = available_amount = 0.0
    for raw in sources:
        name = str(raw.get("name", "资金来源"))
        amount = _positive(raw.get("amount", 0), f"{name}金额")
        unit_cost_pct = float(raw.get("unit_cost", 0))
        available_ratio_pct = float(raw.get("available_ratio", 100))
        if not isfinite(unit_cost_pct) or unit_cost_pct < 0:
            raise ValueError(f"{name}单位成本不能为负")
        if not isfinite(available_ratio_pct) or not 0 < available_ratio_pct <= 100:
            raise ValueError(f"{name}可用资金比率必须在0到100%之间")
        cost_amount = amount * unit_cost_pct / 100
        available = amount * available_ratio_pct / 100
        total_amount += amount
        total_cost += cost_amount
        available_amount += available
        items.append({"name": name, "amount": amount, "unit_cost": unit_cost_pct,
                      "available_ratio": available_ratio_pct, "cost_amount": cost_amount,
                      "available_amount": available})
    if not items or total_amount <= 0:
        raise ValueError("资金来源不能为空，且总金额必须大于0")
    for item in items:
        item["contribution_pct"] = item["cost_amount"] / total_cost * 100 if total_cost else 0
        item["available_cost_pct"] = item["cost_amount"] / item["available_amount"] * 100
    return {"total_amount": total_amount, "total_cost": total_cost,
            "weighted_average_cost_pct": total_cost / total_amount * 100,
            "available_amount": available_amount,
            "available_cost_pct": total_cost / available_amount * 100,
            "items": items}


def calculate_historical_cost_table(rows: Iterable[Mapping[str, Any]], year: str = "a") -> dict:
    """教材表3-5：输出利息额、营业成本额、资金成本额和可用资金口径。"""
    if year not in {"a", "b"}:
        raise ValueError("年份只能是a或b")
    normalized = []
    total_amount = total_interest = total_operating = total_fund_cost = total_available = 0.0
    for raw in rows:
        name = str(raw["name"])
        amount = _positive(raw[f"amount_{year}"], f"{name}年平均数")
        interest_pct = float(raw[f"interest_{year}"])
        operating_pct = float(raw[f"operating_{year}"])
        available_ratio = float(raw[f"available_{year}"])
        if any(not isfinite(x) or x < 0 for x in (interest_pct, operating_pct)):
            raise ValueError(f"{name}成本率不能为负")
        if not isfinite(available_ratio) or not 0 < available_ratio <= 100:
            raise ValueError(f"{name}可用资金比率必须在0到100%之间")
        interest_amount = amount * interest_pct / 100
        operating_amount = amount * operating_pct / 100
        fund_cost_amount = interest_amount + operating_amount
        available_amount = amount * available_ratio / 100
        total_amount += amount
        total_interest += interest_amount
        total_operating += operating_amount
        total_fund_cost += fund_cost_amount
        total_available += available_amount
        normalized.append({"name": name, "amount": amount, "interest_pct": interest_pct,
                           "interest_amount": interest_amount, "operating_pct": operating_pct,
                           "operating_amount": operating_amount,
                           "fund_cost_pct": interest_pct + operating_pct,
                           "fund_cost_amount": fund_cost_amount,
                           "available_ratio": available_ratio,
                           "available_amount": available_amount,
                           "available_cost_pct": fund_cost_amount / available_amount * 100})
    if not normalized:
        raise ValueError("表格不能为空")
    return {"year": year, "rows": normalized, "total_amount": total_amount,
            "total_interest": total_interest, "total_operating": total_operating,
            "total_fund_cost": total_fund_cost, "total_available": total_available,
            "fund_cost_pct": total_fund_cost / total_amount * 100,
            "available_cost_pct": total_fund_cost / total_available * 100}

