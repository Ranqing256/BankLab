export type SourceType = 'textbook' | 'scaffold' | 'system_variant' | 'system_extension'
export type ModuleId = 'map' | 'marginal' | 'weighted' | 'cost-plus' | 'gap' | 'structure'

export type ChapterNode = {
  id: string
  title: string
  code: string
  pages: string
  concept: string
  formula?: string
  exercise?: ModuleId
  children?: ChapterNode[]
}

export const chapterTree: ChapterNode = {
  id: 'ch3',
  title: '第 3 章 商业银行负债管理',
  code: 'CH 03',
  pages: '教材 pp.66–86',
  concept: '以最低风险、最小成本获取最大的资金保障，同时支持资产增长并保持流动性。',
  children: [
    { id: '3.1', title: '存款种类和构成', code: '3.1', pages: 'pp.67–71', concept: '交易账户、储蓄账户、定期存款与核心存款。' },
    { id: '3.2', title: '存款定价', code: '3.2', pages: 'pp.71–74', concept: '在存款增长、客户服务与盈利能力之间作出选择。', children: [
      { id: '3.2.1', title: '定价与经营目标', code: '3.2.1', pages: 'p.71', concept: '存款定价会影响存贷利差、存款余额和存款组合。' },
      { id: '3.2.2', title: '成本加利润定价法', code: '3.2.2', pages: 'pp.72–73', concept: '先计算资金成本，再构成存款服务价格。', exercise: 'cost-plus' },
      { id: '3.2.3', title: '边际成本定价法', code: '3.2.3', pages: 'pp.73–74', concept: '比较新增资金边际成本率和投资资产边际收益率。', formula: 'MC = 新利率 × 新总资金 − 旧利率 × 旧总资金', exercise: 'marginal' },
      { id: '3.2.4', title: '其他定价方法', code: '3.2.4', pages: 'p.74', concept: '按客户、客户关系和服务组合辅助定价。' },
    ] },
    { id: '3.3', title: '非存款性资金来源', code: '3.3', pages: 'pp.74–77', concept: '同业拆借、贴现借款、证券回购、国际市场融资和中长期债券。', children: [
      { id: 'interbank', title: '同业拆借', code: '3.3.1', pages: 'pp.74–75', concept: '用于调度头寸和保持流动性。' },
      { id: 'discount', title: '中央银行贴现借款', code: '3.3.2', pages: 'p.75', concept: '通过票据贴现或再贷款获取资金。' },
      { id: 'repo', title: '证券回购', code: '3.3.3', pages: 'pp.75–76', concept: '以优质证券融资，回购协议利率通常较低但存在违约风险。' },
      { id: 'international', title: '国际金融市场融资', code: '3.3.4', pages: 'p.76', concept: '利用欧洲货币市场等国际市场获得资金。' },
      { id: 'bonds', title: '中长期债券', code: '3.3.5', pages: 'p.77', concept: '资金稳定但成本和经营风险可能更高。' },
      { id: '3.3.6', title: '资金缺口', code: '3.3.6', pages: 'p.77', concept: '贷款与投资需求减存款量，决定非存款资金规模。', formula: '资金缺口 = 贷款与投资需求 − 存款量', exercise: 'gap' },
    ] },
    { id: '3.4', title: '负债成本管理', code: '3.4', pages: 'pp.77–83', concept: '区分利息成本、营业成本、资金成本、可用资金成本和有关成本。', children: [
      { id: 'interest', title: '利息成本', code: '3.4.1', pages: 'p.78', concept: '直接支付给存款者、债券持有人或信贷中介的报酬。' },
      { id: 'operating', title: '营业成本', code: '3.4.1', pages: 'p.78', concept: '吸收负债所发生的非利息开支。' },
      { id: 'fund-cost', title: '资金成本', code: '3.4.1', pages: 'pp.78–79', concept: '利息成本与营业成本之和。' },
      { id: 'available-cost', title: '可用资金成本', code: '3.4.1', pages: 'pp.79–80', concept: '以扣除准备金等后的可用资金为分母。' },
      { id: 'related-cost', title: '有关成本', code: '3.4.1', pages: 'p.80', concept: '风险成本与连锁反应成本。' },
      { id: 'weighted', title: '历史加权平均成本', code: '3.4.2', pages: 'pp.80–83', concept: '用历史数据评价资金来源的平均成本。', formula: 'X̄ = Σ（xᵢ × fᵢ）÷ Σxᵢ', exercise: 'weighted' },
      { id: 'single-marginal', title: '单一资金边际成本', code: '3.4.2', pages: 'p.83', concept: '新增利息和其他开支除以新增资金，必要时调整可用资金比例。' },
      { id: 'average-marginal', title: '平均边际成本', code: '3.4.2', pages: 'p.83', concept: '综合不同资金来源的新增额、可用资金和成本率。' },
    ] },
    { id: '3.5', title: '我国商业银行负债结构', code: '3.5', pages: 'pp.84–86', concept: '比较存款构成、负债构成及 2017 与 2021 年变化趋势。', exercise: 'structure', children: [
      { id: 'deposit-structure', title: '存款构成', code: '3.5.1', pages: 'pp.84–85', concept: '单位活期、单位定期、储蓄存款和其他存款。' },
      { id: 'liability-structure', title: '负债构成及变化趋势', code: '3.5.2', pages: 'pp.85–86', concept: '境内存款、央行负债、金融机构负债、债券等。' },
    ] },
  ],
}

export const marginalDefaults = [
  { rate: 7, amount: 25 }, { rate: 7.5, amount: 50 }, { rate: 8, amount: 75 }, { rate: 8.5, amount: 100 }, { rate: 9, amount: 125 },
]

export const costPlusDefaults = [
  { name: '活期存款', amount: 200, cost_pct: 8, reserve_pct: 15 },
  { name: '定期与储蓄存款', amount: 200, cost_pct: 10, reserve_pct: 5 },
  { name: '货币市场借款', amount: 50, cost_pct: 10, reserve_pct: 2 },
  { name: '股权资本', amount: 50, cost_pct: 20, reserve_pct: 0 },
]

export const table35Rows = [
  { name: '无息活期存款', amount_a: 58, interest_a: 0, operating_a: 4.5, available_a: 70, amount_b: 60, interest_b: 0, operating_b: 4.6, available_b: 70 },
  { name: '生息活期存款', amount_a: 15, interest_a: 5.2, operating_a: 2.3, available_a: 76, amount_b: 18, interest_b: 5.3, operating_b: 2.3, available_b: 76 },
  { name: '存折储蓄', amount_a: 12, interest_a: 5.4, operating_a: 1.1, available_a: 91, amount_b: 12, interest_b: 5.5, operating_b: 1.1, available_b: 91 },
  { name: '储蓄存单', amount_a: 7, interest_a: 14.4, operating_a: 0.2, available_a: 91, amount_b: 7, interest_b: 12, operating_b: 0.2, available_b: 91 },
  { name: '货币市场存单', amount_a: 23, interest_a: 15.71, operating_a: 0.4, available_a: 91, amount_b: 27, interest_b: 11.5, operating_b: 0.4, available_b: 91 },
  { name: '无限制储蓄存单', amount_a: 3, interest_a: 12, operating_a: 0.1, available_a: 91, amount_b: 6, interest_b: 10.2, operating_b: 0.1, available_b: 91 },
  { name: '大额可转让定期存单', amount_a: 27, interest_a: 18, operating_a: 0.2, available_a: 91, amount_b: 32, interest_b: 15, operating_b: 0.4, available_b: 91 },
  { name: '公众与其他定期存款', amount_a: 8, interest_a: 13.3, operating_a: 0.1, available_a: 91, amount_b: 8, interest_b: 12.1, operating_b: 0.1, available_b: 91 },
  { name: '短期借款', amount_a: 11, interest_a: 16.5, operating_a: 0.1, available_a: 96, amount_b: 12, interest_b: 14, operating_b: 0.1, available_b: 96 },
  { name: '其他负债', amount_a: 6, interest_a: 7.1, operating_a: 0.1, available_a: 96, amount_b: 6, interest_b: 7, operating_b: 0.1, available_b: 96 },
  { name: '股权资本', amount_a: 11, interest_a: 29.1, operating_a: 0.1, available_a: 96, amount_b: 12, interest_b: 29.1, operating_b: 0.1, available_b: 96 },
]

export const table37Rows = [
  { name: '活期存款', increase: 3, availableRatio: 78, costPct: 6 },
  { name: '货币市场账户', increase: 6, availableRatio: 94, costPct: 8 },
  { name: '定期存单', increase: 2, availableRatio: 94, costPct: 10 },
  { name: '其他定期存款', increase: 4, availableRatio: 94, costPct: 7.8 },
  { name: '资本', increase: 1, availableRatio: 97, costPct: 25 },
]

export const structureData = {
  deposit: [
    { name: '单位活期存款', y2017: 14.4, y2021: 11.0 },
    { name: '单位定期存款', y2017: 18.4, y2021: 18.9 },
    { name: '储蓄存款', y2017: 39.0, y2021: 44.0 },
    { name: '其他存款', y2017: 28.3, y2021: 26.1 },
  ],
  liabilities: [
    { name: '境内存款', y2017: 71.7, y2021: 71.6 },
    { name: '对中央银行负债', y2017: 3.8, y2021: 3.6 },
    { name: '对特定存款机构负债', y2017: 5.9, y2021: 5.2 },
    { name: '对其他金融机构负债', y2017: 2.2, y2021: 1.1 },
    { name: '债券', y2017: 8.4, y2021: 8.9 },
    { name: '国外负债', y2017: 0.4, y2021: 0.4 },
    { name: '其他负债', y2017: 7.7, y2021: 9.3 },
  ],
}

export const reviewQuestions = [
  { id: 1, text: '存款对商业银行的经营为什么很重要？商业银行主要有哪些存款服务？它们的特点是什么？', prompt: '把存款服务拖入“交易便利 / 稳定资金 / 付息成本”三个维度。', answer: '先区分交易账户、储蓄存款和定期存款，再说明便利性、稳定性与成本之间的关系。', activity: '分类匹配' },
  { id: 2, text: '我国商业银行存款的分类标准主要包括哪些？', prompt: '选择至少四个分类维度，并说明它们的观察对象。', answer: '教材列出按资产负债类型、国民经济部门、币种、地区、行业、出资人经济成分、剩余期限、重新定价期限、计息期限、账户类型、产品类别等维度分类。', activity: '分类维度矩阵' },
  { id: 3, text: '存款定价与商业银行经营目标是什么关系？实践中主要使用哪些定价方法？', prompt: '判断成本加利润法和边际成本法分别更适合回答什么问题。', answer: '存款定价会同时影响存贷利差、存款规模和客户组合；教材重点介绍成本加利润定价法与边际成本定价法。', activity: '定价方法选择' },
  { id: 4, text: '近年来，为什么商业银行的非存款负债规模在增加？非存款负债的获取方式是什么？', prompt: '比较五种非存款资金来源的期限、成本、风险和监管提示。', answer: '教材指出存款可能无法满足贷款和投资需求，银行因此寻求同业拆借、贴现借款、证券回购、国际市场融资和中长期债券等来源。', activity: '融资工具比较' },
  { id: 5, text: '你是否了解商业银行负债成本的概念？它们的区别在哪里？', prompt: '将五个成本概念与“直接付息 / 非利息开支 / 可投放资金分母”等线索配对。', answer: '利息成本、营业成本、资金成本、可用资金成本和有关成本的分子、分母与经济含义不同。', activity: '概念配对' },
  { id: 6, text: '对商业银行负债成本的分析方法有哪些？', prompt: '完成表 3-5、表 3-6、表 3-7 的中间计算，再解释适用场景。', answer: '教材从历史加权平均成本、单一资金边际成本和平均边际成本三个角度分析。', activity: '表格计算' },
  { id: 7, text: '试对我国商业银行的负债结构进行分析和解释。', prompt: '比较 2017 年和 2021 年教材数据，并写出一条结构变化。', answer: '教材数据表明存款占负债总额比重总体稳定，储蓄存款比重上升，单位活期存款比重下降，负债来源仍有多元化压力。', activity: '结构图表比较' },
]

export const variantQuestions = [
  { id: 'v3-1', text: '如果投资资产收益率下降到 8%，表 3-2 中银行应在哪一档停止扩大筹资？请说明判断依据。', activity: '变式判断', sourceType: 'system_variant' as const, questionType: '简答题', pages: '依据教材 3.2.3，pp.73–74', knowledge: '边际成本率与边际收益率', answer: '比较每一档的边际成本率与 8% 的边际收益率；当边际成本率不再低于收益率时停止扩张。应同时说明累计利润和临界点不是同一个概念。' },
  { id: 'v3-2', text: '为什么同样是 500 万元筹资，储备要求越高的资金来源，对可用资金成本率的推升越明显？', activity: '变式解释', sourceType: 'system_variant' as const, questionType: '简答题', pages: '依据教材 3.2.2、3.4.1，pp.72–80', knowledge: '可用资金与资金成本', answer: '储备要求会减少可用于贷款和投资的资金；成本仍然发生，但可用资金分母变小，所以可用资金成本率上升。' },
  { id: 'v3-3', text: '当贷款与投资需求小于存款量时，第三章资金缺口应如何表示？这与第九章 RSA−RSL 有什么区别？', activity: '概念辨析', sourceType: 'system_variant' as const, questionType: '判断辨析', pages: '依据教材 3.3.6，p.77', knowledge: '第三章资金缺口', answer: '第三章资金缺口为需求减存款，结果为负时表示资金盈余；第九章 RSA−RSL 是利率敏感资产与利率敏感负债的利率风险缺口，口径不同。' },
  { id: 'v3-4', text: '请用“负债总额基础”和“可用资金基础”两个分母解释表 3-5 中为什么同一资金来源会出现不同成本率。', activity: '口径解释', sourceType: 'system_variant' as const, questionType: '名词解释', pages: '依据教材 3.4.1–3.4.2，pp.78–83', knowledge: '历史加权平均成本', answer: '负债总额基础以吸收资金为分母；可用资金基础扣除了准备金、现金资产等不能直接投放的部分，因此分母更小，成本率通常更高。' },
]

