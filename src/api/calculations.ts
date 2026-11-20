import type { MarginalRow, CostPlusRow, Table35Row } from '../types'

export function validateNumber(value: number, label: string, options: { min?: number; max?: number; positive?: boolean } = {}) {
  if (!Number.isFinite(value) || (options.positive ? value <= 0 : options.min !== undefined && value < options.min) || (options.max !== undefined && value > options.max)) {
    throw new Error(label + '输入不合法')
  }
}

export function calcMarginal(rows: MarginalRow[], yieldPct: number) {
  validateNumber(yieldPct, '投资资产收益率', { min: 0 })
  const ordered = [...rows].sort((a, b) => a.amount - b.amount)
  return ordered.map((row, index) => {
    const previous = ordered[index - 1]
    const incrementalAmount = previous ? row.amount - previous.amount : row.amount
    validateNumber(row.rate, '存款利率', { min: 0 })
    validateNumber(row.amount, '筹资规模', { positive: true })
    if (incrementalAmount <= 0) throw new Error('筹资规模必须严格递增')
    const cumulativeCost = row.rate / 100 * row.amount
    const previousCost = previous ? previous.rate / 100 * previous.amount : 0
    const marginalCost = cumulativeCost - previousCost
    const revenue = row.amount * yieldPct / 100
    return { ...row, incrementalAmount, cumulativeCost, marginalCost, marginalRate: marginalCost / incrementalAmount * 100, revenue, profit: revenue - cumulativeCost, critical: Math.abs(marginalCost / incrementalAmount * 100 - yieldPct) < 0.000001 }
  })
}

export function calcCostPlus(rows: CostPlusRow[]) {
  const total = rows.reduce((sum, row) => sum + row.amount, 0)
  validateNumber(total, '总筹资额', { positive: true })
  const items = rows.map(row => {
    validateNumber(row.amount, row.name, { positive: true })
    validateNumber(row.cost_pct, row.name + '成本率', { min: 0 })
    validateNumber(row.reserve_pct, row.name + '储备要求', { min: 0, max: 99.999 })
    const available = row.amount * (1 - row.reserve_pct / 100)
    const weightedContribution = row.amount * row.cost_pct / 100 / (1 - row.reserve_pct / 100)
    return { ...row, available, costContribution: weightedContribution / total * 100 }
  })
  const weighted = items.reduce((sum, item) => sum + item.amount * item.cost_pct / 100 / (1 - item.reserve_pct / 100), 0) / total * 100
  return { total, items, weighted }
}

export function calcHistorical(rows: Table35Row[], year: 'a' | 'b') {
  const items = rows.map(row => {
    const amount = year === 'a' ? row.amount_a : row.amount_b
    const interest = year === 'a' ? row.interest_a : row.interest_b
    const operating = year === 'a' ? row.operating_a : row.operating_b
    const availableRatio = year === 'a' ? row.available_a : row.available_b
    validateNumber(amount, row.name + '年平均数', { positive: true })
    validateNumber(interest, row.name + '利息成本', { min: 0 })
    validateNumber(operating, row.name + '营业成本', { min: 0 })
    validateNumber(availableRatio, row.name + '可用资金比率', { min: 0.01, max: 100 })
    const interestAmount = amount * interest / 100
    const operatingAmount = amount * operating / 100
    const fundCost = interestAmount + operatingAmount
    return { ...row, amount, interest, operating, availableRatio, interestAmount, operatingAmount, fundCost, availableAmount: amount * availableRatio / 100, availableCostRate: fundCost / (amount * availableRatio / 100) * 100 }
  })
  const totalAmount = items.reduce((s, r) => s + r.amount, 0)
  const totalCost = items.reduce((s, r) => s + r.fundCost, 0)
  const available = items.reduce((s, r) => s + r.availableAmount, 0)
  return { items, totalAmount, totalCost, available, costRate: totalCost / totalAmount * 100, availableCostRate: totalCost / available * 100 }
}

export function calcAverageMarginal() {
  const rows = [
    { name: '活期存款', increase: 3, availableRatio: 78, costPct: 6 },
    { name: '货币市场账户', increase: 6, availableRatio: 94, costPct: 8 },
    { name: '定期存单', increase: 2, availableRatio: 94, costPct: 10 },
    { name: '其他定期存款', increase: 4, availableRatio: 94, costPct: 7.8 },
    { name: '资本', increase: 1, availableRatio: 97, costPct: 25 },
  ]
  const items = rows.map(row => ({ ...row, available: row.increase * row.availableRatio / 100, totalCost: row.increase * row.costPct / 100 }))
  return { items, totalIncrease: 16, totalAvailable: 14.59, totalCost: 1.422, averageRate: 1.422 / 16 * 100, availableRate: 1.422 / 14.59 * 100 }
}

