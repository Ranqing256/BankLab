from math import isfinite
from typing import Any, Iterable, Mapping


def _number(value: Any, label: str, *, minimum: float | None = None, maximum: float | None = None) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{label}必须是数字") from exc
    if not isfinite(number):
        raise ValueError(f"{label}必须是有限数字")
    if minimum is not None and number < minimum:
        raise ValueError(f"{label}不能小于{minimum:g}")
    if maximum is not None and number > maximum:
        raise ValueError(f"{label}不能大于{maximum:g}")
    return number


def calculate_reserve_requirement(deposit_average: Any, reserve_rate_pct: Any, method: str = "lagged") -> dict:
    """教材4.2.2：法定存款准备金 = 存款平均余额 × 法定存款准备金率。"""
    if method not in {"lagged", "synchronous"}:
        raise ValueError("计算方法只能是滞后法或同步法")
    deposits = _number(deposit_average, "存款平均余额", minimum=0)
    rate = _number(reserve_rate_pct, "法定存款准备金率", minimum=0, maximum=100)
    required = deposits * rate / 100
    return {
        "method": method,
        "deposit_average": deposits,
        "reserve_rate_pct": rate,
        "required_reserve": required,
        "formula": f"{deposits:g} × {rate:g}% = {required:g}",
    }


def calculate_liquidity_forecast(deposit_change: Any, loan_change: Any, reserve_change: Any) -> dict:
    """教材4.3.2因素法：头寸需求 = 贷款增量 + 准备金增量 − 存款增量。

    net_position 采用表4-3口径：正值代表流动性盈余，负值代表流动性赤字。
    """
    deposits = _number(deposit_change, "预计存款增量")
    loans = _number(loan_change, "预计贷款增量")
    reserve = _number(reserve_change, "应缴存款准备金增量")
    demand = loans + reserve - deposits
    return {
        "deposit_change": deposits,
        "loan_change": loans,
        "reserve_change": reserve,
        "funds_need": demand,
        "net_position": -demand,
        "position_type": "surplus" if demand < 0 else "deficit" if demand > 0 else "balanced",
    }


def calculate_structure_liquidity(rows: Iterable[Mapping[str, Any]], new_loan: Any = 0) -> dict:
    """教材4.3.2资金结构法与表4-4：负债需求加新增贷款需求。"""
    total = 0.0
    normalized = []
    for raw in rows:
        name = str(raw.get("name", "负债项目"))
        amount = _number(raw.get("amount"), f"{name}金额", minimum=0)
        reserve_rate = _number(raw.get("reserve_rate", 0), f"{name}法定准备金率", minimum=0, maximum=100)
        liquidity_ratio = _number(raw.get("liquidity_ratio"), f"{name}流动性准备率", minimum=0, maximum=100)
        reserve_amount = amount * reserve_rate / 100
        need = (amount - reserve_amount) * liquidity_ratio / 100
        total += need
        normalized.append({
            "name": name,
            "amount": amount,
            "reserve_rate": reserve_rate,
            "reserve_amount": reserve_amount,
            "liquidity_ratio": liquidity_ratio,
            "liquidity_need": need,
        })
    loan = _number(new_loan, "新增贷款", minimum=0)
    total += loan
    return {"rows": normalized, "new_loan": loan, "total_liquidity_need": total}


def calculate_headroom(cash: Any, central_excess: Any, interbank: Any, statutory_reserve: Any = 0) -> dict:
    """教材4.4.2头寸概念：可用头寸扣除法定存款准备金后的现金资产。"""
    values = {
        "cash": _number(cash, "库存现金", minimum=0),
        "central_excess": _number(central_excess, "超额存款准备金", minimum=0),
        "interbank": _number(interbank, "存放同业存款", minimum=0),
        "statutory_reserve": _number(statutory_reserve, "法定存款准备金", minimum=0),
    }
    gross = values["cash"] + values["central_excess"] + values["interbank"] + values["statutory_reserve"]
    available = gross - values["statutory_reserve"]
    base = values["cash"] + values["central_excess"]
    return {**values, "cash_assets_total": gross, "available_headroom": available, "base_headroom": base}

