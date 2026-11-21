export type ReserveMethod = 'lagged' | 'synchronous'

function finite(value: number, label: string, min?: number, max?: number) {
  if (!Number.isFinite(value) || (min !== undefined && value < min) || (max !== undefined && value > max)) throw new Error(label + '输入不合法')
}

export function calcReserveRequirement(depositAverage: number, reserveRatePct: number, method: ReserveMethod) {
  finite(depositAverage, '存款平均余额', 0)
  finite(reserveRatePct, '法定存款准备金率', 0, 100)
  return { method, depositAverage, reserveRatePct, requiredReserve: depositAverage * reserveRatePct / 100 }
}

export function calcLiquidityForecast(depositChange: number, loanChange: number, reserveChange: number) {
  finite(depositChange, '预计存款增量')
  finite(loanChange, '预计贷款增量')
  finite(reserveChange, '应缴存款准备金增量')
  const fundsNeed = loanChange + reserveChange - depositChange
  return { depositChange, loanChange, reserveChange, fundsNeed, netPosition: -fundsNeed, positionType: fundsNeed > 0 ? 'deficit' as const : fundsNeed < 0 ? 'surplus' as const : 'balanced' as const }
}

export function calcStructureLiquidity(rows: Array<{ name: string; amount: number; reserveRate: number; liquidityRatio: number }>, newLoan: number) {
  finite(newLoan, '新增贷款', 0)
  const items = rows.map(row => {
    finite(row.amount, row.name + '金额', 0)
    finite(row.reserveRate, row.name + '法定准备金率', 0, 100)
    finite(row.liquidityRatio, row.name + '流动性准备率', 0, 100)
    const reserveAmount = row.amount * row.reserveRate / 100
    return { ...row, reserveAmount, liquidityNeed: (row.amount - reserveAmount) * row.liquidityRatio / 100 }
  })
  return { items, newLoan, total: items.reduce((sum, item) => sum + item.liquidityNeed, 0) + newLoan }
}

export function calcHeadroom(cash: number, centralExcess: number, interbank: number, statutoryReserve: number) {
  for (const [value, label] of [[cash, '库存现金'], [centralExcess, '超额存款准备金'], [interbank, '存放同业存款'], [statutoryReserve, '法定存款准备金']] as const) finite(value, label, 0)
  return { total: cash + centralExcess + interbank + statutoryReserve, available: cash + centralExcess + interbank, base: cash + centralExcess }
}

