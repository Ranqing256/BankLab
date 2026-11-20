export type KnowledgeItem = {
  id: string
  title: string
  kicker: string
  summary: string
  source: string
  formula?: string
  tags: string[]
}

export const knowledgeMap: KnowledgeItem[] = [
  { id: 'accounts', title: '存款账户类型', kicker: '3.1', summary: '从交易账户、储蓄账户到定期存款，理解资金稳定性与服务差异。', source: '教材第 3.1 节，教材 pp.67–71', tags: ['交易账户', '核心存款'] },
  { id: 'pricing', title: '存款定价', kicker: '3.2', summary: '在增长、客户服务和盈利能力之间做出定价选择。', source: '教材第 3.2 节，教材 pp.71–74', tags: ['成本加利润', '边际成本'] },
  { id: 'cost-plus', title: '成本加利润定价法', kicker: '3.2.2', summary: '用资金成本、储备要求和计划利润构成存款服务价格。', source: '教材第 3.2.2 节，教材 pp.72–73', formula: '每单位服务价格 = 每单位存款服务经营支出 + 存款总支出 + 存款计划利润', tags: ['500 万元案例'] },
  { id: 'marginal', title: '边际成本定价法', kicker: '3.2.3', summary: '比较新增资金的边际成本率与投资资产边际收益率。', source: '教材第 3.2.3 节，教材 pp.73–74', formula: 'MC = 新利率×新总资金 − 旧利率×旧总资金', tags: ['最优规模', '利润'] },
  { id: 'non-deposit', title: '非存款性资金来源', kicker: '3.3', summary: '同业拆借、央行贴现借款、证券回购、国际市场融资和债券。', source: '教材第 3.3 节，教材 pp.74–77', tags: ['流动性', '融资工具'] },
  { id: 'gap', title: '资金缺口', kicker: '3.3.6', summary: '判断存款能否支持贷款与投资需求，并估算非存款资金需要。', source: '教材第 3.3.6 节，教材 p.77', formula: '资金缺口 = 贷款与投资需求 − 存款量', tags: ['缺口', '盈余'] },
  { id: 'weighted', title: '负债成本', kicker: '3.4', summary: '区分利息成本、营业成本、资金成本与可用资金成本。', source: '教材第 3.4 节，教材 pp.77–83', formula: 'X̄ = Σ(xᵢ × fᵢ) / Σxᵢ', tags: ['历史加权平均', '可用资金'] },
  { id: 'structure', title: '负债结构', kicker: '3.5', summary: '观察我国商业银行存款构成和负债来源变化。', source: '教材第 3.5 节，教材 pp.84–86', tags: ['2021 数据', '结构趋势'] },
]

export const marginalDefaults = [
  { rate: 7, amount: 25 }, { rate: 7.5, amount: 50 }, { rate: 8, amount: 75 }, { rate: 8.5, amount: 100 }, { rate: 9, amount: 125 },
]

export const weightedDefaults = [
  { name: '无息活期存款', amount: 58, unit_cost: 4.5, available_ratio: 70 },
  { name: '生息活期存款', amount: 15, unit_cost: 7.5, available_ratio: 76 },
  { name: '存折储蓄', amount: 12, unit_cost: 6.5, available_ratio: 91 },
  { name: '储蓄存单', amount: 7, unit_cost: 14.6, available_ratio: 91 },
  { name: '货币市场存单', amount: 23, unit_cost: 16.1, available_ratio: 91 },
  { name: '大额可转让定期存单', amount: 27, unit_cost: 18.2, available_ratio: 91 },
  { name: '公众与其他定期存款', amount: 8, unit_cost: 13.4, available_ratio: 91 },
  { name: '短期借款', amount: 11, unit_cost: 16.6, available_ratio: 96 },
  { name: '其他负债', amount: 6, unit_cost: 7.2, available_ratio: 96 },
  { name: '股权资本', amount: 11, unit_cost: 29.2, available_ratio: 96 },
]

export const costPlusDefaults = [
  { name: '活期存款', amount: 200, cost_pct: 8, reserve_pct: 15 },
  { name: '定期与储蓄存款', amount: 200, cost_pct: 10, reserve_pct: 5 },
  { name: '货币市场借款', amount: 50, cost_pct: 10, reserve_pct: 2 },
  { name: '股权资本', amount: 50, cost_pct: 20, reserve_pct: 0 },
]

