import { useMemo, useState } from 'react'
import { ArrowUpRight, BookOpen, CheckCircle2, ChevronRight, FlaskConical, Gauge, Lightbulb, Menu, Network, Sparkles, Target, X } from 'lucide-react'
import { CostPlusLab, FundingGapLab, MarginalLab, StructureLab, WeightedLab } from './components/Chapter3Labs'
import { chapterTree, reviewQuestions } from './data/chapter3'
import type { ChapterNode, ModuleId, SourceType } from './data/chapter3'
import './styles.css'

const fmt = (value: number, digits = 2) => Number.isFinite(value) ? value.toFixed(digits) : '—'

function SourceBadge({ type }: { type: SourceType }) {
  return <span className={'source-badge ' + type}>{type === 'textbook' ? '教材依据' : '教学脚手架'}</span>
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

type AppProps = { active: ModuleId; onNavigate: (id: ModuleId) => void }

export default function App() {
  const [active, setActive] = useState<ModuleId>('map')
  const [mobileOpen, setMobileOpen] = useState(false)
  const names: Record<ModuleId, string> = { map: '负债管理知识地图', marginal: '存款边际成本', weighted: '历史加权平均成本', 'cost-plus': '成本加利润定价', gap: '资金缺口实验', structure: '负债结构对比' }
  const go = (id: ModuleId) => { setActive(id); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <div className="app-shell">
    <header className="topbar"><div className="brand"><div className="brand-mark">B<span>·</span></div><div><strong>BankLab</strong><small>Commercial Banking Interactive Learning Lab</small></div></div><div className="course-pill"><span className="status-dot"/> 当前课程 <b>第 3 章 · 商业银行负债管理</b></div><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="打开导航">{mobileOpen ? <X size={20}/> : <Menu size={20}/>}</button></header>
    <div className="layout"><aside className={'sidebar ' + (mobileOpen ? 'open' : '')}><div className="sidebar-heading"><span>学习路径</span><span className="chapter-badge">CH 03</span></div><nav><button className={'nav-item ' + (active === 'map' ? 'active' : '')} onClick={() => go('map')}><Network size={17}/><span>章节思维导图<em>3.1–3.5</em></span><ChevronRight size={15}/></button><div className="nav-label">互动实验</div>{([['marginal','存款边际成本','3.2.3'],['weighted','历史加权平均成本','3.4.2'],['cost-plus','成本加利润定价','3.2.2'],['gap','资金缺口','3.3.6'],['structure','负债结构对比','3.5']] as const).map(([id, label, code]) => <button key={id} className={'nav-item ' + (active === id ? 'active' : '')} onClick={() => go(id)}><FlaskConical size={17}/><span>{label}<em>{code}</em></span><ChevronRight size={15}/></button>)}</nav><div className="sidebar-note"><Sparkles size={17}/><div><b>边学边算</b><p>先独立计算，再用模拟器验证。</p></div></div><div className="sidebar-footer">教材版本<br/><strong>庄毓敏主编 · 第六版 · 2022</strong></div></aside>
      <main className="main-content"><div className="breadcrumb"><span>BankLab</span><ChevronRight size={14}/><span>第 3 章</span><ChevronRight size={14}/><b>{names[active]}</b></div><ModuleRouter active={active} onNavigate={go}/></main></div>
  </div>
}

function ModuleRouter({ active, onNavigate }: AppProps) {
  if (active === 'marginal') return <MarginalLab/>
  if (active === 'weighted') return <WeightedLab/>
  if (active === 'cost-plus') return <CostPlusLab/>
  if (active === 'gap') return <FundingGapLab/>
  if (active === 'structure') return <StructureLab/>
  return <KnowledgeMap onNavigate={onNavigate}/>
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

