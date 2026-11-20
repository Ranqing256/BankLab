# 第三章实现对应表

| 教材内容 | 代码函数 | 界面模块 | 测试用例 | 印刷页码 |
|---|---|---|---|---|
| 存款边际成本与表 3-2 | calculate_marginal_cost_scenarios；calcMarginal | MarginalLab：完整计算链、临界选择、先算后验 | tests/test_marginal_cost.py、tests/test_average_marginal_cost.py | 73–74 |
| 成本加利润定价与 500 万元案例 | calculate_cost_plus_pricing；calcCostPlus | CostPlusLab：可用资金、四项成本贡献、11%口径提示 | tests/test_cost_plus_pricing.py | 72–73 |
| 历史加权平均成本与表 3-5 | calculate_historical_cost_table；calcHistorical | WeightedLab：11 项资金来源、第一年/第二年、两个分母切换 | tests/test_weighted_average_cost.py | 80–83 |
| 表 3-6、NOWs、表 3-7 | calcAverageMarginal；单一资金边际成本验证 | WeightedLab 汇总验证区 | tests/test_average_marginal_cost.py | 82–83 |
| 资金缺口 | calculate_funding_gap | FundingGapLab：正值缺口、零平衡、负值盈余和融资工具比较 | tests/test_funding_gap.py | 77 |
| 我国商业银行存款与负债结构 | structureData | StructureLab：表 3-8、表 3-9 2017/2021 图表比较 | tests/test_weighted_average_cost.py（数据口径） | 84–86 |
| 七道复习思考题 | reviewQuestions | KnowledgeMap：原题 + 先答后解析脚手架 | 构建检查与人工交互检查 | 86 |

