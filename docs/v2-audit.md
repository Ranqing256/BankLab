# BankLab V2.0 第一阶段审计

审计日期：2026-11-21

## 当前项目状态

| 项目 | 结论 |
|---|---|
| 前端 | React + TypeScript + Vite |
| 后端 | Vercel Python Function，入口为 api/index.py |
| 部署 | GitHub Ranqing256/BankLab → Vercel banklab，main 生产部署 READY |
| 线上域名 | https://banklab-seven.vercel.app/ |
| 当前内容范围 | 第三章“商业银行负债管理” |
| 当前测试 | Python 15 项单元测试通过；Vite 生产构建通过 |
| 教材 PDF | 本地可读取，已被 .gitignore 排除 |

## 已有能力

- 第三章知识结构和章节思维导图。
- 存款边际成本实验。
- 成本加利润定价实验。
- 历史加权平均成本实验。
- 资金缺口实验。
- 负债结构 2017/2021 数据对比。
- 第三章第 86 页七道复习思考题。
- 教材内容与教学脚手架的 sourceType 分层。
- Python 计算函数、API 健康检查和单元测试。

## V2.0 与现状的差距

### 内容工程

- 当前只有第三章结构化数据，没有16章目录、知识模块和知识点数据。
- 当前没有统一的 formulas、textbook_questions、practice_questions、case_studies、simulators、question_knowledge_relations 数据层。
- 当前题库只覆盖第三章七道章末复习思考题，尚未逐章核对16章题目数量。
- 当前没有完整的教材来源索引和“待人工核对”状态字段。

### 产品结构

- 当前首页以第三章为中心，没有整本教材16章入口。
- 当前没有 Knowledge Map、Exam Arena、Calculation Lab、Case Studio、My Weaknesses 五个一级产品模块。
- 当前没有全局搜索、最近访问和自主学习记录。
- 当前没有浏览器本地持久化的练习记录与错误类型统计。

### 交互与教学

- 第三章计算实验已具备先算后验雏形，但尚未统一抽象为题目、步骤、评分和模拟器关联数据。
- 当前没有通用的选择题、名词解释、简答题、论述题、案例题答题组件。
- 当前主观题只提供参考答案和脚手架反馈，尚未建立评分标准数据结构。
- 当前没有跨章节综合案例和个人知识漏洞地图。

## V2.0 实施顺序

1. 建立16章目录和知识内容数据结构，先只录入已核对教材内容。
2. 建立全局首页与五大模块入口。
3. 将第三章现有实验迁移到统一的 Calculation Lab 数据模型。
4. 完成第三章 Exam Arena、Case Studio 和 My Weaknesses 的可用闭环。
5. 逐章导入教材目录、知识点和章末题目，每章完成核对后再开放。
6. 运行完整测试并通过 GitHub → Vercel 部署。

## 当前明确不做

- 不把未核对的教材内容写成16章知识点。
- 不将系统变式题标记为教材原题。
- 不强制每日任务、打卡或学习计划。
- 不将整本教材 PDF 上传到 GitHub。

