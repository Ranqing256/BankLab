import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, BookOpen, Calculator, CheckCircle2, ChevronRight, FlaskConical, Gauge, Info, LayoutGrid, Lightbulb, Menu, Network, Search, Sparkles, Target, X } from 'lucide-react'
import { CostPlusLab, FundingGapLab, MarginalLab, StructureLab, WeightedLab } from './components/Chapter3Labs'
import { CashAssetsLab, Chapter4Hub, Chapter4Map, DemandLab, ManagementLab, ReserveLab } from './components/Chapter4Labs'
import { chapterTree, reviewQuestions, variantQuestions } from './data/chapter3'
import { textbookCatalog } from './data/catalog'
import type { ChapterNode, ModuleId, SourceType } from './data/chapter3'
import './styles.css'

const fmt = (value: number, digits = 2) => Number.isFinite(value) ? value.toFixed(digits) : '—'

function SourceBadge({ type }: { type: SourceType }) {
  const label = type === 'textbook' ? '教材依据' : type === 'scaffold' ? '教学脚手架' : type === 'system_variant' ? '系统变式' : '系统拓展'
  return <span className={'source-badge ' + type}>{label}</span>
}

function PageHeader({ eyebrow, title, desc, source }: { eyebrow: string; title: string; desc: string; source: string }) {
  return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div><div className="source-chip"><BookOpen size={15}/><span>教材依据<br/><b>{source}</b></span></div></div>
}

function Panel({ title, kicker, children, className = '' }: { title: string; kicker?: string; children: React.ReactNode; className?: string }) {
  return <section className={'panel ' + className}><div className="panel-heading"><div>{kicker && <span className="eyebrow">{kicker}</span>}<h2>{title}</h2></div></div>{children}</section>
}

function FormulaCard({ formula, note, source = 'textbook' }: { formula: string; note: string; source?: SourceType }) {
  return <div className="formula-box"><div className="formula-label"><span>公式</span><SourceBadge type={source}/></div><strong>{formula}</strong><small>{note}</small></div>
}

function FlowSteps({ current = 5 }: { current?: number }) {
  const steps = ['经营问题', '公式与变量', '独立计算', '模拟验证', '经营解释']
  return <div className="flow-steps">{steps.map((step, index) => <div className={'flow-step ' + (index + 1 <= current ? 'done' : '')} key={step}><b>{index + 1}</b><span>{step}</span></div>)}</div>
}

function PracticeBox({ title, prompt, children, onSubmit, submitted, feedback }: { title: string; prompt: string; children: React.ReactNode; onSubmit: () => void; submitted: boolean; feedback?: React.ReactNode }) {
  return <div className="practice-box"><div className="practice-heading"><div><SourceBadge type="scaffold"/><h3>{title}</h3></div>{submitted && <CheckCircle2 size={19} className="check-icon"/>}</div><p>{prompt}</p><div className="practice-fields">{children}</div><button className="primary-button" onClick={onSubmit}>{submitted ? '已提交，可重新计算' : '提交我的计算'}</button>{submitted && <div className="practice-feedback">{feedback}</div>}</div>
}

function SourceCard({ text, pages }: { text: string; pages: string }) {
  return <div className="source-card"><BookOpen size={17}/><div><div className="source-card-title"><SourceBadge type="textbook"/><span>{pages}</span></div><p>{text}</p><small>教材内容与教学脚手架分层显示。</small></div></div>
}

type AppView = ModuleId | 'home' | 'exam' | 'calculation' | 'case' | 'weakness'
type AppProps = { active: AppView; onNavigate: (id: AppView) => void }

export default function App() {
  const [active, setActive] = useState<AppView>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const names: Record<AppView, string> = { home: '自主学习总览', exam: '考试训练场', calculation: '计算题实验室', case: '商业银行案例分析', weakness: '个人知识漏洞', map: '第三章知识网络', marginal: '存款边际成本', weighted: '历史加权平均成本', 'cost-plus': '成本加利润定价', gap: '资金缺口实验', structure: '负债结构对比', ch4: '第四章实验总览', 'ch4-map': '第四章知识网络', 'ch4-cash': '现金资产管理', 'ch4-reserve': '存款准备金管理', 'ch4-demand': '流动性需求预测', 'ch4-management': '流动性管理方案' }
  const go = (id: AppView) => { setActive(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <div className="app-shell">
    <header className="topbar"><div className="brand"><div className="brand-mark">B<span>·</span></div><div><strong>BankLab</strong><small>Commercial Banking Interactive Learning Lab</small></div></div><div className="course-pill"><span className="status-dot"/> 当前课程 <b>{String(active).startsWith('ch4') ? '第 4 章 · 商业银行现金资产管理' : '第 3 章 · 商业银行负债管理'}</b></div><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="打开导航">{mobileOpen ? <X size={20}/> : <Menu size={20}/>}</button></header>
    <div className="layout"><aside className={'sidebar ' + (mobileOpen ? 'open' : '')}><div className="sidebar-heading"><span>自主学习</span><span className="chapter-badge">V2</span></div><nav><button className={'nav-item ' + (active === 'home' ? 'active' : '')} onClick={() => go('home')}><LayoutGrid size={17}/><span>总览与章节<em>16章目录</em></span><ChevronRight size={15}/></button><button className={'nav-item ' + (active === 'exam' ? 'active' : '')} onClick={() => go('exam')}><Target size={17}/><span>考试训练场<em>原题与变式</em></span><ChevronRight size={15}/></button><button className={'nav-item ' + (active === 'calculation' ? 'active' : '')} onClick={() => go('calculation')}><Calculator size={17}/><span>计算题实验室<em>先算后验</em></span><ChevronRight size={15}/></button><button className={'nav-item ' + (active === 'case' ? 'active' : '')} onClick={() => go('case')}><Network size={17}/><span>案例分析<em>经营决策</em></span><ChevronRight size={15}/></button><button className={'nav-item ' + (active === 'weakness' ? 'active' : '')} onClick={() => go('weakness')}><Search size={17}/><span>知识漏洞<em>自主记录</em></span><ChevronRight size={15}/></button><div className="nav-label">第三章实验</div><button className={'nav-item ' + (active === 'map' ? 'active' : '')} onClick={() => go('map')}><Network size={17}/><span>章节思维导图<em>3.1–3.5</em></span><ChevronRight size={15}/></button>{([['marginal','存款边际成本','3.2.3'],['weighted','历史加权平均成本','3.4.2'],['cost-plus','成本加利润定价','3.2.2'],['gap','资金缺口','3.3.6'],['structure','负债结构对比','3.5']] as const).map(([id, label, code]) => <button key={id} className={'nav-item ' + (active === id ? 'active' : '')} onClick={() => go(id)}><FlaskConical size={17}/><span>{label}<em>{code}</em></span><ChevronRight size={15}/></button>)}</nav><div className="nav-label">第四章实验</div><button className={'nav-item ' + (active === 'ch4' ? 'active' : '')} onClick={() => go('ch4')}><Network size={17}/><span>第四章总览<em>现金资产管理</em></span><ChevronRight size={15}/></button>{([['ch4-map','章节思维导图','4.1–4.4'],['ch4-cash','现金资产管理','4.1'],['ch4-reserve','存款准备金管理','4.2'],['ch4-demand','流动性需求预测','4.3'],['ch4-management','流动性管理方案','4.4']] as const).map(([id, label, code]) => <button key={id} className={'nav-item ' + (active === id ? 'active' : '')} onClick={() => go(id)}><FlaskConical size={17}/><span>{label}<em>{code}</em></span><ChevronRight size={15}/></button>)}<div className="sidebar-note"><Sparkles size={17}/><div><b>自主选择</b><p>选择章节、题型或实验，不强制每日任务。</p></div></div><div className="sidebar-footer">教材版本<br/><strong>庄毓敏主编 · 第六版 · 2022</strong></div></aside>
      <main className="main-content"><div className="breadcrumb"><span>BankLab</span><ChevronRight size={14}/><span>{String(active).startsWith('ch4') ? '第 4 章' : '第 3 章'}</span><ChevronRight size={14}/><b>{names[active]}</b></div><ModuleRouter active={active} onNavigate={go}/></main></div>
  </div>
}

function ModuleRouter({ active, onNavigate }: AppProps) {
  if (active === 'home') return <MasteryHome onNavigate={onNavigate}/>
  if (active === 'exam') return <ExamArena onNavigate={onNavigate}/>
  if (active === 'calculation') return <CalculationHub onNavigate={onNavigate}/>
  if (active === 'case') return <CaseStudio/>
  if (active === 'weakness') return <WeaknessCenter onNavigate={onNavigate}/>
  if (active === 'ch4') return <Chapter4Hub onNavigate={onNavigate}/>
  if (active === 'ch4-map') return <Chapter4Map onNavigate={onNavigate}/>
  if (active === 'ch4-cash') return <CashAssetsLab/>
  if (active === 'ch4-reserve') return <ReserveLab/>
  if (active === 'ch4-demand') return <DemandLab/>
  if (active === 'ch4-management') return <ManagementLab/>
  if (active === 'marginal') return <MarginalLab/>
  if (active === 'weighted') return <WeightedLab/>
  if (active === 'cost-plus') return <CostPlusLab/>
  if (active === 'gap') return <FundingGapLab/>
  if (active === 'structure') return <StructureLab/>
  return <KnowledgeMap onNavigate={onNavigate as (id: ModuleId) => void}/>
}

function NodeTree({ node, onNavigate, depth = 0 }: { node: ChapterNode; onNavigate: (id: ModuleId) => void; depth?: number }) {
  const isRoot = depth === 0
  return <div className={'tree-node depth-' + depth}><button className={'tree-node-card ' + (isRoot ? 'root' : '')} onClick={() => node.exercise && onNavigate(node.exercise)}><div className="tree-node-top"><span className="code-pill">{node.code}</span><span className="tree-pages">{node.pages}</span></div><strong>{node.title}</strong><p>{node.concept}</p>{node.formula && <code>{node.formula}</code>}{node.exercise && <span className="tree-link"><ArrowUpRight size={14}/>进入计算实验</span>}</button>{node.children && <div className="tree-children">{node.children.map(child => <NodeTree key={child.id} node={child} onNavigate={onNavigate} depth={depth + 1}/>)}</div>}</div>
}

function KnowledgeMap({ onNavigate }: { onNavigate: (id: ModuleId) => void }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const question = reviewQuestions[questionIndex]
  return <><PageHeader eyebrow="第三章 · 章节思维导图" title="从存款类型走到负债结构" desc="这张图表达前置概念与计算实验的关系：存款类型 → 存款定价 → 资金成本 → 资金缺口 → 非存款融资选择 → 负债结构。" source="教材 pp.66–86"/><div className="map-intro"><div><Network size={20}/><div><b>章节关系</b><span>节点显示节号、印刷页码、核心概念和实验入口。</span></div></div><div className="map-legend"><span><i className="dot textbook"/>教材知识</span><span><i className="dot scaffold"/>学习脚手架</span></div></div><section className="mindmap-panel"><div className="mindmap-title"><div><span className="eyebrow">Chapter 3 map</span><h2>商业银行负债管理</h2></div><span className="section-hint">点击带实验标记的节点继续</span></div><NodeTree node={chapterTree} onNavigate={onNavigate}/></section><section className="review-section"><div className="section-title"><div><span className="eyebrow">教材第 86 页 · 复习思考题</span><h2>七道题，七种学习活动</h2></div><span className="section-hint">题干为教材原题，活动为教学脚手架</span></div><div className="review-grid"><div className="review-list">{reviewQuestions.map((item, index) => <button key={item.id} className={'review-item ' + (index === questionIndex ? 'active' : '')} onClick={() => { setQuestionIndex(index); setSubmitted(false); setAnswer('') }}><span>{item.id}</span><div><b>第 {item.id} 题</b><small>{item.activity}</small></div></button>)}</div><div className="review-card"><div className="review-meta"><SourceBadge type="textbook"/><span>教材第 86 页 · 原题 {question.id}</span></div><h3>{question.text}</h3><div className="scaffold-block"><SourceBadge type="scaffold"/><p>{question.prompt}</p><textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="先写下你的判断或计算步骤…"/></div><button className="primary-button" onClick={() => setSubmitted(true)}>提交答案，查看解析</button>{submitted && <div className="answer-panel"><b>教材依据</b><p>{question.answer}</p><b>教学提示</b><p>这部分是 BankLab 为帮助学习设计的反馈，不能替代教材原题或教材原文。</p></div>}</div></div></section><div className="callout"><Lightbulb size={20}/><div><b>学习路线提示</b><p>先点击 3.1 与 3.2 理解资金来源，再进入 3.2.2、3.2.3 和 3.4.2 的计算实验，最后用 3.3.6 和 3.5 检查经营含义。</p></div></div></>
}

function MasteryHome({ onNavigate }: { onNavigate: (id: AppView) => void }) {
  const features = [
    ['exam', '考试训练场', '名词、选择、简答、计算和案例训练，原题与系统变式分开。', '原题与变式'],
    ['calculation', '计算题实验室', '先选择公式、填写过程，再打开第三章模拟器验证。', '先算后验'],
    ['case', '商业银行案例分析', '从核心问题、影响因素到方案优劣，练习经营判断。', '跨知识点'],
    ['weakness', '个人知识漏洞', '自主标记容易出错的知识点，记录错误类型和最近练习。', '自主记录'],
  ] as const
  return <><PageHeader eyebrow="BankLab V2.0 · Commercial Banking Mastery Lab" title="从学过，到真正掌握" desc="自由选择章节、题型、计算实验或案例分析。BankLab 用知识网络、原题训练和错误记录帮助你把理解落到经营判断上。" source="第六版目录已核对"/><div className="mastery-hero"><div><div className="eyebrow">自主学习总览</div><h2>今天想解决什么问题？</h2><p>选择一个入口开始。系统不会安排每日任务，也不会用打卡代替掌握。</p><div className="mastery-actions"><button className="primary-button" onClick={() => onNavigate('exam')}><Target size={15}/>进入考试训练</button><button className="ghost-button" onClick={() => onNavigate('map')}><Network size={15}/>查看第三章知识网络</button></div></div><div className="mastery-stat"><strong>16</strong><span>教材章节目录</span><small>已从 PDF 目录核对</small></div></div><section className="home-section"><div className="section-title"><div><span className="eyebrow">Five core functions</span><h2>五大核心功能</h2></div><span className="section-hint">自主选择，不强制顺序</span></div><div className="feature-grid">{features.map(([id, title, desc, tag]) => <button className="feature-card" key={id} onClick={() => onNavigate(id)}><div className="feature-top"><span className="code-pill">{tag}</span><ArrowUpRight size={17}/></div><h3>{title}</h3><p>{desc}</p></button>)}</div></section><section className="home-section"><div className="section-title"><div><span className="eyebrow">Textbook catalog</span><h2>16 章自主入口</h2></div><span className="section-hint">目录已核对；知识点按教材导入进度开放</span></div><div className="catalog-grid">{textbookCatalog.map(chapter => <button className={'catalog-card ' + (chapter.number === 3 || chapter.number === 4 ? 'available' : '')} key={chapter.id} onClick={() => chapter.number === 3 ? onNavigate('map') : chapter.number === 4 ? onNavigate('ch4') : undefined}><div className="catalog-number">CH {String(chapter.number).padStart(2, '0')}</div><div><h3>{chapter.title}</h3><p>教材 p.{chapter.startPage} 起 · {chapter.modules.length} 个二级模块</p></div>{chapter.number === 3 || chapter.number === 4 ? <span className="open-tag">已开放</span> : <span className="open-tag muted-tag">目录已核对</span>}</button>)}</div></section><div className="callout"><Lightbulb size={20}/><div><b>内容分层</b><p>教材原题、教材公式和教材数据标记为“教材依据”；变式题、提示、反馈和模拟情景标记为“教学脚手架”。</p></div></div></>
}

function ExamArena({ onNavigate }: { onNavigate: (id: AppView) => void }) {
  const bank = [...reviewQuestions.map(item => ({ ...item, sourceType: 'textbook' as const, questionType: '复习思考题', pages: '教材第 86 页', knowledge: item.activity, answer: item.answer })), ...variantQuestions]
  const [filter, setFilter] = useState<'all' | 'textbook' | 'system_variant'>('all')
  const visible = bank.filter(item => filter === 'all' || item.sourceType === filter)
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errorType, setErrorType] = useState('')
  const question = visible[index] || visible[0]
  const submit = () => {
    setSubmitted(true)
    const records = JSON.parse(localStorage.getItem('banklab:v2:weakness-records') || '[]')
    records.push({ questionId: question.id, knowledge: question.knowledge, errorType: errorType || '待自评', completedAt: new Date().toISOString() })
    localStorage.setItem('banklab:v2:weakness-records', JSON.stringify(records.slice(-100)))
  }
  return <><PageHeader eyebrow="Exam Arena · 考试训练场" title="先作答，再查看解析" desc="原题与系统变式分开标记。提交后选择自己的错误类型，记录会进入个人知识漏洞中心。" source="第三章已核对题库"/><div className="exam-toolbar"><div className="toggle-group"><button className={filter === 'all' ? 'selected' : ''} onClick={() => { setFilter('all'); setIndex(0); setSubmitted(false) }}>全部</button><button className={filter === 'textbook' ? 'selected' : ''} onClick={() => { setFilter('textbook'); setIndex(0); setSubmitted(false) }}>教材原题</button><button className={filter === 'system_variant' ? 'selected' : ''} onClick={() => { setFilter('system_variant'); setIndex(0); setSubmitted(false) }}>系统变式</button></div><button className="ghost-button small" onClick={() => onNavigate('map')}>返回知识网络</button></div><div className="exam-layout"><div className="exam-question-list">{visible.map((item, i) => <button className={'review-item ' + (i === index ? 'active' : '')} key={item.id} onClick={() => { setIndex(i); setSubmitted(false); setAnswer(''); setErrorType('') }}><span>{i + 1}</span><div><b>{item.questionType}</b><small>{item.activity}</small></div></button>)}</div><div className="exam-card"><div className="review-meta"><SourceBadge type={question.sourceType}/><span>{question.pages} · {question.knowledge}</span></div><h2>{question.text}</h2><div className="scaffold-block"><SourceBadge type="scaffold"/><p>先写出你的答案，再提交查看参考解析。</p><textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="先分点写出你的答案…"/></div><button className="primary-button" onClick={submit}>提交答案，查看参考</button>{submitted && <div className="answer-panel"><b>参考解析</b><p>{question.answer}</p><b>错误类型自评</b><div className="error-type-grid selectable">{['概念记忆错误', '概念理解错误', '相似概念混淆', '公式选择错误', '计算口径错误', '分析逻辑不完整'].map(item => <button className={errorType === item ? 'selected' : ''} key={item} onClick={() => setErrorType(item)}>{item}</button>)}</div><p>提交的自评会保存在当前浏览器，进入“知识漏洞”查看。</p></div>}</div></div></>
}

function CalculationHub({ onNavigate }: { onNavigate: (id: AppView) => void }) {
  const labs = [
    ['marginal', '存款边际成本', '表 3-2 · 3.2.3', '公式选择、MC、边际成本率、临界筹资规模'],
    ['cost-plus', '成本加利润定价', '500 万元案例 · 3.2.2', '可用资金、四项成本贡献和 11%口径'],
    ['weighted', '历史加权平均成本', '表 3-5/6/7 · 3.4.2', '两个分母、无限制储蓄存单和汇总验证'],
    ['gap', '资金缺口', '2 亿元案例 · 3.3.6', '正值缺口、零平衡、负值盈余'],
  ] as const
  return <><PageHeader eyebrow="Calculation Lab · 计算题实验室" title="先独立计算，再用模拟器验证" desc="计算题不只判断最终数字，还要区分公式选择、变量识别、计算口径、代入过程和经营含义。" source="第三章已核对实验"/><div className="calculation-guidance"><div><span className="eyebrow">统一流程</span><h2>题目 → 公式 → 过程 → 结果 → 模拟器</h2></div><p>当前四个第三章模拟器均保留教材公式、单位、计算链和练习入口。</p></div><div className="feature-grid lab-entry-grid">{labs.map(([id, title, tag, desc]) => <button className="feature-card" key={id} onClick={() => onNavigate(id)}><div className="feature-top"><span className="code-pill">{tag}</span><ArrowUpRight size={17}/></div><h3>{title}</h3><p>{desc}</p></button>)}</div></>
}

function CaseStudio() {
  const cases = [
    { id: 'c3-marginal', title: '边际成本临界选择', source: '教材 3.2.3 · pp.73–74', prompt: '在 8.5% 档筹集 100 万元时，边际成本率与 10% 投资资产收益率相等。为什么 75 万元和 100 万元的利润同为 1.50 万元时，仍要关注临界点？' },
    { id: 'c3-cost', title: '500 万元资金成本', source: '教材 3.2.2 · pp.72–73', prompt: '四类资金来源的储备要求不同。请说明为什么 11% 只能解释为加权平均税前资金成本，还不能直接当作完整存款服务价格。' },
    { id: 'c3-gap', title: '资金缺口与融资选择', source: '教材 3.3.6 · p.77', prompt: '贷款与投资需求为 2 亿元、存款量为 1.5 亿元。请写出资金缺口，并说明选择非存款性资金来源时要比较哪些经营维度。' },
  ]
  const [index, setIndex] = useState(0); const [answer, setAnswer] = useState(''); const [submitted, setSubmitted] = useState(false)
  const current = cases[index]
  return <><PageHeader eyebrow="Case Studio · 第三章案例分析" title="把教材案例变成经营判断" desc="案例分析已先开放第三章三个已核对案例。题目数据来自教材，问题拆解和反馈属于教学脚手架。" source="第三章教材案例 · pp.72–77"/><div className="case-framework"><div className="case-step"><b>1</b><span>识别核心问题</span></div><ChevronRight size={17}/><div className="case-step"><b>2</b><span>关联教材公式</span></div><ChevronRight size={17}/><div className="case-step"><b>3</b><span>比较方案与风险</span></div><ChevronRight size={17}/><div className="case-step"><b>4</b><span>解释经营含义</span></div></div><div className="case-layout"><Panel title="教材案例入口" kicker="选择一个案例"><div className="case-topic-grid">{cases.map((item, i) => <button className={'case-topic ' + (i === index ? 'selected' : '')} key={item.id} onClick={() => { setIndex(i); setAnswer(''); setSubmitted(false) }}><SourceBadge type="textbook"/><h3>{item.title}</h3><p>{item.source}</p></button>)}</div></Panel><Panel title={current.title} kicker="先独立分析"><div className="review-meta"><SourceBadge type="textbook"/><span>{current.source}</span></div><h3>{current.prompt}</h3><div className="scaffold-block"><SourceBadge type="scaffold"/><p>先写出公式或判断链，再提交。</p><textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="核心问题 → 教材公式/数据 → 经营含义…"/></div><button className="primary-button" onClick={() => setSubmitted(true)}>提交分析，查看提示</button>{submitted && <div className="answer-panel"><b>教材依据</b><p>案例数字和公式请以右侧对应实验的教材来源卡为准；BankLab 不把自拟结论标记为教材原文。</p><b>教学提示</b><p>检查你的答案是否同时说明了计算口径、比较对象和经营决策含义。</p></div>}</Panel></div><div className="callout"><InfoIcon/><div><b>数据边界</b><p>这里没有加入未经 PDF 核对的额外案例数字；后续章节案例会在完成逐页核对后再开放。</p></div></div></>
}

function WeaknessCenter({ onNavigate }: { onNavigate: (id: AppView) => void }) {
  const [weaknesses, setWeaknesses] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('banklab:v2:weaknesses') || '[]') } catch { return [] } })
  const [records, setRecords] = useState<Array<{ questionId: string; knowledge: string; errorType: string; completedAt: string }>>(() => { try { return JSON.parse(localStorage.getItem('banklab:v2:weakness-records') || '[]') } catch { return [] } })
  useEffect(() => { localStorage.setItem('banklab:v2:weaknesses', JSON.stringify(weaknesses)); setRecords(JSON.parse(localStorage.getItem('banklab:v2:weakness-records') || '[]')) }, [weaknesses])
  const points = ['存款定价与经营目标', '边际成本率', '可用资金成本', '第三章资金缺口', '负债结构变化']
  return <><PageHeader eyebrow="My Weaknesses · 个人知识漏洞中心" title="记录容易出错的知识点" desc="掌握状态由你自主标记；答题后的错误类型自评会保存在当前浏览器，不把看过页面等同于已经掌握。" source="自主记录 · localStorage"/><Panel title="我的薄弱知识点" kicker="自主标记"><div className="weakness-list">{points.map(point => <label className="weakness-item" key={point}><input type="checkbox" checked={weaknesses.includes(point)} onChange={e => setWeaknesses(current => e.target.checked ? [...current, point] : current.filter(item => item !== point))}/><span>{point}</span><small>{weaknesses.includes(point) ? '需要加强' : '未标记'}</small></label>)}</div><div className="weakness-actions"><button className="primary-button" onClick={() => onNavigate('exam')}>去做题验证</button><button className="ghost-button" onClick={() => onNavigate('map')}>返回知识网络</button></div></Panel><Panel title="最近练习记录" kicker="答题记录">{records.length === 0 ? <p className="empty-state">还没有答题记录。进入考试训练场提交一道题后，这里会显示错误类型。</p> : <div className="record-list">{records.slice(-10).reverse().map((record, index) => <div className="record-row" key={record.questionId + record.completedAt + index}><b>{record.knowledge}</b><span>{record.errorType}</span><small>{new Date(record.completedAt).toLocaleString('zh-CN')}</small></div>)}</div>}</Panel><Panel title="错误类型" kicker="后续扩展"><div className="error-type-grid">{['概念记忆错误', '概念理解错误', '相似概念混淆', '公式选择错误', '计算口径错误', '分析逻辑不完整'].map(item => <span key={item}>{item}</span>)}</div></Panel></>
}

function InfoIcon() { return <Info size={19}/> }




