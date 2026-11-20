import unittest
from api.chapter3.weighted_average_cost import calculate_weighted_average_cost, calculate_historical_cost_table
from api.index import dispatch

class WeightedAverageCostTests(unittest.TestCase):
    def test_textbook_like_rows(self):
        result = calculate_weighted_average_cost([
            {"name": "A", "amount": 80, "unit_cost": 4.5, "available_ratio": 70},
            {"name": "B", "amount": 20, "unit_cost": 5.8, "available_ratio": 76},
        ])
        self.assertAlmostEqual(result["weighted_average_cost_pct"], 4.76, places=2)
        self.assertGreater(result["available_cost_pct"], result["weighted_average_cost_pct"])
    def test_zero_and_invalid(self):
        with self.assertRaises(ValueError): calculate_weighted_average_cost([])
        with self.assertRaises(ValueError): calculate_weighted_average_cost([{"amount": 1, "unit_cost": 2, "available_ratio": 0}])
    def test_parameter_change(self):
        a = calculate_weighted_average_cost([{"amount": 100, "unit_cost": 5}])
        b = calculate_weighted_average_cost([{"amount": 100, "unit_cost": 10}])
        self.assertGreater(b["weighted_average_cost_pct"], a["weighted_average_cost_pct"])
    def test_table_35_includes_unrestricted_savings_certificate(self):
        rows = [
            {"name": "无限制储蓄存单", "amount_a": 3, "interest_a": 12, "operating_a": 0.1, "available_a": 91,
             "amount_b": 6, "interest_b": 10.2, "operating_b": 0.1, "available_b": 91},
        ]
        result = calculate_historical_cost_table(rows, "a")
        self.assertAlmostEqual(result["total_fund_cost"], 0.363, places=3)
        self.assertAlmostEqual(result["total_available"], 2.73, places=2)
    def test_invalid_table_year(self):
        with self.assertRaises(ValueError):
            calculate_historical_cost_table([], "c")
    def test_api_dispatch_table_operation(self):
        result = dispatch({"operation": "historical_cost_table", "year": "a", "rows": [
            {"name": "A", "amount_a": 1, "interest_a": 1, "operating_a": 1, "available_a": 100}
        ]})
        self.assertAlmostEqual(result["fund_cost_pct"], 2.0, places=2)

