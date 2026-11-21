import type { SourceType } from './v2-schema'

export type Chapter4Node = {
  id: string
  code: string
  title: string
  pages: string
  concept: string
  formula?: string
  exercise?: string
  children?: Chapter4Node[]
}

export const chapter4Tree: Chapter4Node = {
  id: 'ch4', code: 'CH 04', title: '第 4 章 商业银行现金资产管理', pages: '教材 pp.87–104',
  concept: '在满足流动性需求的前提下，保持适度现金资产并平衡安全性与盈利性。',
  children: [
    { id: '4.1', code: '4.1', title: '现金资产管理的目的和原则', pages: 'pp.87–90', concept: '现金资产包括库存现金、托收中的现金、在中央银行的存款和存放同业存款。', exercise: 'ch4-cash', children: [
      { id: '4.1.1', code: '4.1.1', title: '现金资产的构成', pages: 'p.87', concept: '狭义现金资产是库存现金，广义现金资产还包括准现金。' },
      { id: '4.1.2', code: '4.1.2', title: '目的与原则', pages: 'pp.88–90', concept: '适度存量控制、适时流量调节和安全性原则。' },
    ] },
    { id: '4.2', code: '4.2', title: '存款准备金管理', pages: 'pp.90–93', concept: '区分法定存款准备金与超额存款准备金，先满足法定要求，再管理可用头寸。', exercise: 'ch4-reserve', children: [
      { id: '4.2.1', code: '4.2.1', title: '法定与超额准备金', pages: 'pp.90–91', concept: '法定准备金具有强制性；超额准备金是可用资金。' },
      { id: '4.2.2', code: '4.2.2', title: '滞后法与同步法', pages: 'pp.92–93', concept: '非交易性账户使用滞后法，交易性账户使用同步法。', formula: '法定准备金 = 存款平均余额 × 法定准备金率' },
      { id: '4.2.3', code: '4.2.3', title: '超额准备金管理', pages: 'p.93', concept: '预测支付、清算和贷款需求，避免准备金账户过多或不足。' },
    ] },
    { id: '4.3', code: '4.3', title: '商业银行的流动性需求', pages: 'pp.93–100', concept: '流动性需求来自存款客户提现和贷款客户贷款要求，分为短期、长期、周期和临时需求。', exercise: 'ch4-demand', children: [
      { id: '4.3.1', code: '4.3.1', title: '流动性需求的含义与种类', pages: 'pp.93–95', concept: '短期、长期、周期和临时流动性需求。' },
      { id: '4.3.2', code: '4.3.2', title: '流动性需求预测', pages: 'pp.96–100', concept: '因素法、资金结构法和流动性指标法。', formula: '资金头寸需求量 = 预计贷款增量 + 应缴存款准备金增量 − 预计存款增量' },
      { id: '4.3.3', code: '4.3.3', title: '资金结构法', pages: 'pp.97–99', concept: '按游动性、脆弱性和稳定性货币负债及其流动性准备率估算需求。', formula: '总流动性需求 = 负债流动性需求 + 贷款流动性需求' },
      { id: '4.3.4', code: '4.3.4', title: '流动性指标法', pages: 'pp.99–100', concept: '用现金指标、流动证券比率等指标综合观察流动性。' },
    ] },
    { id: '4.4', code: '4.4', title: '商业银行的流动性管理', pages: 'pp.101–104', concept: '比较进取型、保守型和成本最低原则，协调流动性供给与需求。', exercise: 'ch4-management', children: [
      { id: '4.4.1', code: '4.4.1', title: '流动性需求管理原则', pages: 'pp.101–102', concept: '主动负债、资产转换和最低筹资成本之间的选择。' },
      { id: '4.4.2', code: '4.4.2', title: '供给与需求协调', pages: 'pp.102–103', concept: '可用头寸、基础头寸、可贷头寸，以及资产转换和借入资金。' },
      { id: '4.4.3', code: '4.4.3', title: '管理效果衡量', pages: 'pp.103–104', concept: '公众信心、股价、风险溢价、资产出售损失、贷款满足能力和央行借款频率。' },
    ] },
  ],
}

export const cashAssetTypes = [
  { id: 'vault', name: '库存现金', note: '满足日常交易支付，属于非盈利性资产，防护和保险费用较高。', page: 'p.87' },
  { id: 'collection', name: '托收中的现金', note: '处于银行间确认与转账过程中的支票金额，规模取决于票据数量和清算时间。', page: 'p.87' },
  { id: 'central', name: '在中央银行的存款', note: '用于支票清算、资金转账以及同业拆借、回购和央行借款等资金划转。', page: 'p.87' },
  { id: 'interbank', name: '存放同业存款', note: '便于同业票据清算和代理收付，通常可随时支用。', page: 'p.87' },
]

export const reserveCase = {
  depositAverage: 80000,
  reserveRate: 7,
  requiredReserve: 5600,
  basePeriod: '9 月 2 日（星期四）至 9 月 8 日（星期三）',
  holdingPeriod: '9 月 16 日（星期四）至 9 月 22 日（星期三）',
  page: '教材表 4-1，印刷 p.92',
}

export const liquidityFactors = {
  supply: ['客户存款', '提供非存款服务所得收入', '客户偿还贷款', '资产出售', '货币市场借款', '发行新股'],
  demand: ['客户提取存款', '合格贷款客户的贷款要求', '偿还非存款借款', '提供销售服务中产生的营业费用和税收', '向股东派发现金股利'],
  page: '教材表 4-2，印刷 p.96',
}

export const liquidityForecastRows = [
  { period: '1 月第一周', deposits: 1200, depositChange: 0, reserveChange: 0, loans: 800, loanChange: 0, net: 0 },
  { period: '1 月第二周', deposits: 1100, depositChange: -100, reserveChange: -8, loans: 850, loanChange: 50, net: -142 },
  { period: '1 月第三周', deposits: 1000, depositChange: -100, reserveChange: -8, loans: 950, loanChange: 100, net: -192 },
  { period: '1 月第四周', deposits: 950, depositChange: -50, reserveChange: -4, loans: 1000, loanChange: 50, net: -96 },
  { period: '2 月第一周', deposits: 1250, depositChange: 300, reserveChange: 24, loans: 750, loanChange: -250, net: 526 },
  { period: '2 月第二周', deposits: 1200, depositChange: -50, reserveChange: -4, loans: 900, loanChange: 150, net: -196 },
]

export const structureCaseRows = [
  { name: '游动性货币负债', amount: 300, reserveRate: 8, reserveAmount: 24, liquidityRatio: 95 },
  { name: '脆弱性货币负债', amount: 250, reserveRate: 5, reserveAmount: 12.5, liquidityRatio: 30 },
  { name: '稳定性货币负债', amount: 400, reserveRate: 3, reserveAmount: 12, liquidityRatio: 15 },
  { name: '新增贷款', amount: 12, reserveRate: 0, reserveAmount: 0, liquidityRatio: 100 },
]

export const liquidityPlanCase = {
  requirement: 1000,
  page: '教材 4.4.1，印刷 p.102',
  plans: [
    { name: '方案一', steps: ['1 月发行 300 万美元、3 个月期大额存单', '3 月用到期的 300 万美元有价证券购买 1 个月到期的国库券', '4 月用款时出售国库券', '剩余 400 万美元利用回购协议筹措'], principle: '进取型与资产转换相结合' },
    { name: '方案二', steps: ['1 月发行 500 万美元、3 个月期大额存单', '利用 300 万美元有价证券购买 4 月份可以出售的国库券', '利用再回购协议筹集 200 万美元资金'], principle: '较多主动负债与资产转换相结合' },
  ],
  costItems: ['发行费', '办公费', '利息支出费', '准备金额度', '保险费'],
}

export const chapter4ReviewQuestions = [
  '现金资产包括哪些形式？商业银行保留各种形式现金资产的目的是什么？',
  '法定存款准备金的计算方法有哪些？商业银行应该如何进行法定存款准备金的管理？',
  '影响超额存款准备金的因素是什么？商业银行应该如何进行超额存款准备金的管理？',
  '什么是流动性需求？商业银行的流动性需求有哪些种类？',
  '商业银行如何预测流动性需求？',
  '商业银行在什么情况下会产生流动性需求？',
  '结合流动性需求管理的原则分析商业银行是如何满足流动性需求的？',
  '如何对商业银行流动性需求管理的效果进行评价？',
  '用你所学的理论和方法对我国商业银行的流动性风险进行分析和判断。',
].map((text, index) => ({ id: index + 1, text, sourceType: 'textbook' as SourceType, page: '教材第 104 页' }))

export const chapter4Scaffolds = [
  '将四类现金资产与“日常支付、清算过程、央行结算、同业往来”匹配。',
  '根据存款类型选择滞后法或同步法，并提交法定准备金的代入过程。',
  '把表 4-2 的因素拖入“流动性供给增加”或“流动性需求增加”。',
  '用表 4-3 观察存款、贷款与准备金变化怎样共同形成盈余或赤字。',
  '比较两种 1,000 万美元筹资方案，列出需要核对的成本与时间条件。',
  '结合存款客户提现和贷款客户贷款要求，写出商业银行可能产生流动性需求的情形。',
  '比较进取型、保守型和成本最低原则，说明各自依赖的资金来源。',
  '从六个市场信号中选择至少两项，解释它们如何反映流动性管理效果。',
  '围绕我国商业银行流动性风险，列出需要观察的资产、负债和市场信号。',
]


