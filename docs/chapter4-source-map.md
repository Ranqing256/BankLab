# 第四章教材—实现对应表

依据：庄毓敏主编《商业银行业务与经营》第六版，中国人民大学出版社，2022 年版。印刷页 87–104；PDF 页码以本地教材文件核对。

| 教材内容 | 核对页码 | 代码函数/数据 | 界面模块 | 测试 |
| --- | --- | --- | --- | --- |
| 现金资产四类构成与管理原则 | pp.87–90 | `cashAssetTypes`、`chapter4Tree` | `CashAssetsLab` | 配置合计边界与作答后提示 |
| 滞后法定存款准备金；表 4-1：80,000 万元、7%、5,600 万元 | p.92 | `calculate_reserve_requirement` / `calcReserveRequirement`、`reserveCase` | `ReserveLab` | `test_table_4_1_lagged_case`、同步法、非法率 |
| 同步法定存款准备金 | pp.92–93 | `calculate_reserve_requirement(method="synchronous")` | `ReserveLab` 方法切换 | `test_synchronous_case` |
| 流动性需求四种类型 | pp.93–95 | `chapter4Tree` | `DemandLab` 理论基础 | 结构化数据编译检查 |
| 表 4-2 流动性供给/需求因素 | p.96 | `liquidityFactors` | `DemandLab` 结果看板 | 数据来源标签检查 |
| 因素法公式与表 4-3 | pp.96–97 | `calculate_liquidity_forecast` / `calcLiquidityForecast`、`liquidityForecastRows` | `DemandLab` 表格和计算链 | `test_table_4_3_second_week` |
| 资金结构法公式与表 4-4：403.65 百万元 | pp.97–99 | `calculate_structure_liquidity` / `calcStructureLiquidity`、`structureCaseRows` | `DemandLab` 结构法案例 | `test_table_4_4_case` |
| 流动性指标法 | pp.99–100 | `chapter4Tree` | `DemandLab` 方法说明 | 不生成未核对指标数值 |
| 进取型、保守型、成本最低原则 | pp.101–102 | `liquidityPlanCase` | `ManagementLab` 方案比较 | 作答后提示 |
| 4 月 1,000 万美元流动性需求案例 | p.102 | `liquidityPlanCase` | `ManagementLab` 两方案卡片 | 案例来源页码显示 |
| 可用头寸、基础头寸、可贷头寸 | pp.102–103 | `calculate_headroom` / `calcHeadroom` | `ManagementLab` 头寸模拟 | `test_headroom` |
| 流动性管理效果的六类市场信号 | pp.103–104 | `ManagementLab` 信号列表 | `ManagementLab` 评价框架 | 不填入外部阈值 |
| 章末九道复习思考题 | p.104 | `chapter4ReviewQuestions` | `Chapter4Map`、`Chapter4Hub` | 逐题选择、提交后显示脚手架 |

教材原文、公式、案例数字标记为 `textbook`；分步提示、输入框、反馈和模拟配置标记为 `scaffold`。没有从 PDF 核对出的利率、成本和风险数值不进入页面。

