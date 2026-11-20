
def calculate_funding_gap(demand: float, deposits: float) -> dict:
    """教材 3.3.6: 资金缺口 = 当前和预计未来的贷款与投资需求 - 当前和预计的存款量。"""
    demand = float(demand); deposits = float(deposits)
    if demand < 0 or deposits < 0:
        raise ValueError("demand and deposits must be non-negative")
    gap = demand - deposits
    return {"demand": demand, "deposits": deposits, "gap": gap, "gap_type": "shortfall" if gap > 0 else "surplus" if gap < 0 else "balanced", "non_deposit_need": max(gap, 0)}

