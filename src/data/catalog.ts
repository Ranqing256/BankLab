import type { ChapterCatalog, SourceType } from './v2-schema'

const textbook: SourceType = 'textbook'

// 目录来源：庄毓敏主编《商业银行业务与经营》第六版，目录印刷 pp.1–3。
export const textbookCatalog: ChapterCatalog[] = [
  { id: 'ch1', number: 1, title: '商业银行导论', startPage: 1, sourceType: textbook, modules: [
    { id: '1.1', title: '商业银行的起源和发展', page: 1 }, { id: '1.2', title: '商业银行的功能', page: 4 }, { id: '1.3', title: '商业银行的组织结构', page: 5 }, { id: '1.4', title: '中国银行业体系', page: 11 },
  ] },
  { id: 'ch2', number: 2, title: '商业银行资本管理', startPage: 20, sourceType: textbook, modules: [
    { id: '2.1', title: '商业银行资本的性质与作用', page: 20 }, { id: '2.2', title: '商业银行资本的构成', page: 23 }, { id: '2.3', title: '资本充足与商业银行的稳健', page: 32 }, { id: '2.4', title: '资本筹集与管理', page: 51 }, { id: '2.5', title: '经济资本管理', page: 59 },
  ] },
  { id: 'ch3', number: 3, title: '商业银行负债管理', startPage: 66, sourceType: textbook, modules: [
    { id: '3.1', title: '存款的种类和构成', page: 67 }, { id: '3.2', title: '存款的定价', page: 71 }, { id: '3.3', title: '非存款性的资金来源', page: 74 }, { id: '3.4', title: '商业银行负债成本的管理', page: 77 }, { id: '3.5', title: '我国商业银行的负债结构分析', page: 84 },
  ] },
  { id: 'ch4', number: 4, title: '商业银行现金资产管理', startPage: 87, sourceType: textbook, modules: [
    { id: '4.1', title: '商业银行现金资产管理的目的和原则', page: 87 }, { id: '4.2', title: '存款准备金的管理', page: 90 }, { id: '4.3', title: '商业银行的流动性需求', page: 93 }, { id: '4.4', title: '商业银行的流动性管理', page: 101 },
  ] },
  { id: 'ch5', number: 5, title: '贷款政策与管理', startPage: 105, sourceType: textbook, modules: [
    { id: '5.1', title: '贷款的种类及组合', page: 105 }, { id: '5.2', title: '贷款政策与程序', page: 108 }, { id: '5.3', title: '贷款的质量评价', page: 113 }, { id: '5.4', title: '问题贷款的发现和处理', page: 117 }, { id: '5.5', title: '我国商业银行信贷资产管理现状', page: 120 },
  ] },
  { id: 'ch6', number: 6, title: '企业贷款', startPage: 126, sourceType: textbook, modules: [
    { id: '6.1', title: '企业贷款的种类', page: 126 }, { id: '6.2', title: '企业贷款的政策制度体系', page: 132 }, { id: '6.3', title: '企业贷款的授信审批管理', page: 134 }, { id: '6.4', title: '企业贷款的定价', page: 147 },
  ] },
  { id: 'ch7', number: 7, title: '个人贷款', startPage: 153, sourceType: textbook, modules: [
    { id: '7.1', title: '个人贷款业务概述', page: 154 }, { id: '7.2', title: '个人贷款业务与经营', page: 159 }, { id: '7.3', title: '个人贷款的信用评估', page: 172 }, { id: '7.4', title: '个人贷款的定价', page: 180 },
  ] },
  { id: 'ch8', number: 8, title: '商业银行证券投资管理', startPage: 187, sourceType: textbook, modules: [
    { id: '8.1', title: '商业银行证券投资概述', page: 188 }, { id: '8.2', title: '商业银行证券投资的收益与风险', page: 194 }, { id: '8.3', title: '商业银行证券投资的一般策略', page: 199 }, { id: '8.4', title: '银行业和证券业的分离与融合', page: 203 },
  ] },
  { id: 'ch9', number: 9, title: '商业银行资产负债管理', startPage: 211, sourceType: textbook, modules: [
    { id: '9.1', title: '商业银行资产负债管理概述', page: 211 }, { id: '9.2', title: '资产负债计划管理', page: 215 }, { id: '9.3', title: '利率风险及其表内外对冲管理', page: 217 }, { id: '9.4', title: '内部资金转移定价', page: 232 },
  ] },
  { id: 'ch10', number: 10, title: '商业银行中间业务与管理', startPage: 238, sourceType: textbook, modules: [
    { id: '10.1', title: '中间业务概述', page: 239 }, { id: '10.2', title: '支付结算类中间业务', page: 241 }, { id: '10.3', title: '担保和承诺类中间业务', page: 243 }, { id: '10.4', title: '交易和投行类中间业务', page: 247 }, { id: '10.5', title: '财富管理业务', page: 248 },
  ] },
  { id: 'ch11', number: 11, title: '商业银行的国际业务', startPage: 260, sourceType: textbook, modules: [
    { id: '11.1', title: '国际结算与现金管理业务', page: 260 }, { id: '11.2', title: '外汇交易业务', page: 266 }, { id: '11.3', title: '国际信贷业务', page: 269 }, { id: '11.4', title: '商业银行的跨国经营', page: 279 },
  ] },
  { id: 'ch12', number: 12, title: '商业银行的金融科技业务', startPage: 285, sourceType: textbook, modules: [
    { id: '12.1', title: '商业银行的金融科技创新', page: 286 }, { id: '12.2', title: '大数据技术及其在商业银行的应用', page: 294 }, { id: '12.3', title: '人工智能技术及其在商业银行的应用', page: 297 }, { id: '12.4', title: '云计算技术及其在商业银行的应用', page: 301 }, { id: '12.5', title: '区块链技术及其在商业银行的应用', page: 303 },
  ] },
  { id: 'ch13', number: 13, title: '商业银行的业绩评价', startPage: 307, sourceType: textbook, modules: [
    { id: '13.1', title: '商业银行的资产负债表', page: 308 }, { id: '13.2', title: '商业银行的利润表', page: 317 }, { id: '13.3', title: '商业银行综合评价方法', page: 321 }, { id: '13.4', title: '商业银行的盈利能力分析', page: 324 },
  ] },
  { id: 'ch14', number: 14, title: '商业银行的并购管理', startPage: 332, sourceType: textbook, modules: [
    { id: '14.1', title: '商业银行的并购动机', page: 333 }, { id: '14.2', title: '银行并购的价值评估', page: 338 }, { id: '14.3', title: '商业银行大规模并购的效应', page: 345 }, { id: '14.4', title: '我国银行并购的现状与发展', page: 349 },
  ] },
  { id: 'ch15', number: 15, title: '商业银行全面风险管理', startPage: 354, sourceType: textbook, modules: [
    { id: '15.1', title: '商业银行全面风险管理概述', page: 355 }, { id: '15.2', title: '商业银行的信用风险管理', page: 360 }, { id: '15.3', title: '商业银行的市场风险管理', page: 364 }, { id: '15.4', title: '商业银行的操作风险管理', page: 367 }, { id: '15.5', title: '商业银行的流动性风险管理', page: 369 },
  ] },
  { id: 'ch16', number: 16, title: '政府对银行业的监管', startPage: 373, sourceType: textbook, modules: [
    { id: '16.1', title: '政府对银行业监管的原因和模式', page: 373 }, { id: '16.2', title: '银行业市场准入和退出监管', page: 377 }, { id: '16.3', title: '银行业经营监管', page: 381 }, { id: '16.4', title: '中国银行业的监管历程', page: 386 }, { id: '16.5', title: '全球银行业监管发展趋势', page: 391 },
  ] },
]

