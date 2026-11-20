import unittest
from api.chapter3.cost_plus_pricing import calculate_cost_plus_pricing

class CostPlusTests(unittest.TestCase):
    def test_textbook_500_wan_case(self):
        result = calculate_cost_plus_pricing([
            {"name": "活期存款", "amount": 200, "cost_pct": 8, "reserve_pct": 15},
            {"name": "定期与储蓄存款", "amount": 200, "cost_pct": 10, "reserve_pct": 5},
            {"name": "货币市场借款", "amount": 50, "cost_pct": 10, "reserve_pct": 2},
            {"name": "股权资本", "amount": 50, "cost_pct": 20, "reserve_pct": 0},
        ])
        self.assertAlmostEqual(result["weighted_cost_pct"], 11.0, places=1)
        self.assertAlmostEqual(result["items"][0]["available"], 170, places=2)
        self.assertAlmostEqual(result["items"][0]["cost_contribution_pct"], 9.4118, places=3)
    def test_boundary(self):
        self.assertEqual(calculate_cost_plus_pricing([{"amount": 100, "cost_pct": 0, "reserve_pct": 0}])["weighted_cost_pct"], 0)
        with self.assertRaises(ValueError): calculate_cost_plus_pricing([])

