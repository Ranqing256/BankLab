# BankLab V1.0

BankLab 是以《商业银行业务与经营》第六版第三章为依据的互动学习实验室。当前版本围绕“商业银行负债管理”提供知识地图、存款边际成本、历史加权平均成本、成本加利润定价和资金缺口五个模块。

## 本地运行

    npm install
    npm run dev

计算公式独立放在 api/chapter3/，运行单元测试：

    npm run test:python

## 教材与版权

教材 PDF 仅用于本地核对，已加入 .gitignore，不会提交到公开仓库。项目只保存公式、变量定义、例题参数、计算口径和必要的短篇说明。第三章公式与例题对应表见 docs/chapter3-source-map.md。

## API

api/index.py 是请求驱动的 Vercel Python Function，接受 JSON POST。第一版不使用数据库、登录或付费 AI API。前端实验可在本地实时计算，API 作为可复用的 Python 计算入口。

## Vercel

项目使用 vercel.json 配置 Vite 静态输出和 Python Function。连接 GitHub 仓库后，Vercel Hobby 计划可按默认 Git 集成自动构建预览和生产部署。部署前运行 npm run build 与 npm run test:python，并在 Vercel 控制台确认 Python Runtime 的当前版本与依赖限制。


## 在线预览

生产地址：https://banklab-seven.vercel.app/
