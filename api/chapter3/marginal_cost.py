from math import isfinite
from typing import Iterable, Mapping, Any


def calculate_marginal_cost_scenarios(
    scenarios: Iterable[Mapping[str, Any]], asset_yield_pct: float = 10.0
) -> dict:
    """教材 3.2.3 与表3-2的口径。"""
    asset_yield_pct = float(asset_yield_pct)
    if not isfinite(asset_yield_pct) or asset_yield_pct < 0:
        raise ValueError("投资资产收益率必须是非负有限数")
    ordered = sorted(
        ({"rate": float(s["rate"]), "amount": float(s["amount"])} for s in scenarios),
        key=lambda x: x["amount"],
    )
    if not ordered:
        raise ValueError("至少需要一个筹资方案")
    if any(not isfinite(s["rate"]) or s["rate"] < 0 for s in ordered):
        raise ValueError("存款利率不能为负")
    if any(not isfinite(s["amount"]) or s["amount"] <= 0 for s in ordered):
        raise ValueError("筹资规模必须大于0")
    rows = []
    previous = None
    for item in ordered:
        current_cost = item["rate"] / 100 * item["amount"]
        if previous is None:
            incremental_amount = item["amount"]
            marginal_cost = current_cost
        else:
            incremental_amount = item["amount"] - previous["amount"]
            if incremental_amount <= 0:
                raise ValueError("筹资规模必须严格递增")
            marginal_cost = current_cost - previous["current_cost"]
        marginal_rate = marginal_cost / incremental_amount * 100
        revenue = item["amount"] * asset_yield_pct / 100
        profit = revenue - current_cost
        rows.append({
            **item, "incremental_amount": incremental_amount,
            "cumulative_cost": current_cost, "marginal_cost": marginal_cost,
            "marginal_cost_rate": marginal_rate,
            "marginal_revenue_rate": asset_yield_pct,
            "cumulative_revenue": revenue, "profit": profit,
            "critical": abs(marginal_rate - asset_yield_pct) < 1e-9,
            "current_cost": current_cost,
        })
        previous = {**item, "current_cost": current_cost}
    best_profit = max(row["profit"] for row in rows)
    best = max(rows, key=lambda row: (row["profit"], row["amount"]))
    return {
        "asset_yield_pct": asset_yield_pct, "rows": rows,
        "best_profit": best_profit,
        "best_amount": best["amount"], "best_rate": best["rate"],
        "profit_maxima": [row["amount"] for row in rows if abs(row["profit"] - best_profit) < 1e-9],
        "critical_amount": next((row["amount"] for row in rows if row["critical"]), None),
    }

