# BankLab V2.0

BankLab 是以《商业银行业务与经营》第六版为依据的互动学习实验室。当前已完成第三章“商业银行负债管理”和第四章“商业银行现金资产管理”的教材核对、知识网络、先算后验实验、案例分析与章末题目活动。第四章对应表见 `docs/chapter4-source-map.md`。

## 本地运行

    npm install
    npm run dev

计算公式独立放在 `api/chapter3/` 和 `api/chapter4/`，运行单元测试：

    npm run test:python

## 教材与版权

教材 PDF 仅用于本地核对，已加入 .gitignore，不会提交到公开仓库。项目只保存公式、变量定义、例题参数、计算口径和必要的短篇说明。第三章公式与例题对应表见 docs/chapter3-source-map.md。

## API

api/index.py 是请求驱动的 Vercel Python Function，接受 JSON POST。第一版不使用数据库、登录或付费 AI API。前端实验可在本地实时计算，API 作为可复用的 Python 计算入口。

第三章计算入口包括 weighted_average_cost、historical_cost_table、marginal_cost、cost_plus_pricing 和 funding_gap；第四章计算入口包括 reserve_requirement、liquidity_forecast、structure_liquidity 和 headroom。教材事实与教学脚手架在界面上分别标记。

## Vercel

项目使用 vercel.json 配置 Vite 静态输出和 Python Function。连接 GitHub 仓库后，Vercel Hobby 计划可按默认 Git 集成自动构建预览和生产部署。部署前运行 npm run build 与 npm run test:python，并在 Vercel 控制台确认 Python Runtime 的当前版本与依赖限制。

