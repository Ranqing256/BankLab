import unittest
from api.chapter3.weighted_average_cost import calculate_weighted_average_cost

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

