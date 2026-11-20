import unittest
from api.chapter3.marginal_cost import calculate_marginal_cost_scenarios

class AverageMarginalCostTests(unittest.TestCase):
    def test_now_single_fund_case(self):
        # 教材表3-6：NOWs 利息5%、其他开支2%、24%用于非盈利资产。
        self.assertAlmostEqual((5 + 2) / (1 - 0.24), 9.210526, places=4)
    def test_rounding_and_units(self):
        result = calculate_marginal_cost_scenarios(
            [{"rate": 7, "amount": 25}, {"rate": 7.5, "amount": 50}], 10
        )
        self.assertAlmostEqual(result["rows"][1]["marginal_cost"], 2.0, places=6)
        self.assertAlmostEqual(result["rows"][1]["incremental_amount"], 25.0, places=6)

