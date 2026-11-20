from typing import Iterable, Mapping, Any


def calculate_marginal_cost_scenarios(scenarios: Iterable[Mapping[str, Any]], asset_yield_pct: float = 10.0) -> dict:
    """教材 3.2.3: MC = 新利率×新总资金 - 旧利率×旧总资金。

    教材例题的利润口径为：总筹资额×投资资产收益率 - 总筹资额×当前存款利率。
    """
    if asset_yield_pct < 0:
        raise ValueError("asset yield must be non-negative")
    ordered = sorted(({"rate": float(s["rate"]), "amount": float(s["amount"])} for s in scenarios), key=lambda x: x["amount"])
    if not ordered or any(s["rate"] < 0 or s["amount"] <= 0 for s in ordered):
        raise ValueError("scenario rate and amount must be valid")
    rows = []
    prev = None
    for item in ordered:
        if prev is None:
            mc_amount = item["rate"] / 100 * item["amount"]
            incremental = item["amount"]
        else:
            incremental = item["amount"] - prev["amount"]
            if incremental <= 0:
                raise ValueError("scenario amounts must be strictly increasing")
            mc_amount = item["rate"] / 100 * item["amount"] - prev["rate"] / 100 * prev["amount"]
        mc_rate = mc_amount / incremental * 100 if incremental else 0
        total_profit = item["amount"] * (asset_yield_pct - item["rate"]) / 100
        rows.append({**item, "marginal_cost": mc_amount, "marginal_cost_rate": mc_rate, "marginal_revenue_rate": asset_yield_pct, "profit": total_profit})
        prev = item
    # 教材在 8.5% / 100 万元处标记利润最大化；若利润并列，取更大的筹资规模。
    best = max(rows, key=lambda x: (x["profit"], x["amount"]))
    return {"asset_yield_pct": asset_yield_pct, "rows": rows, "best_amount": best["amount"], "best_rate": best["rate"], "best_profit": best["profit"]}

