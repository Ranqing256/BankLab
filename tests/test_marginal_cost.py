import unittest
from api.chapter3.marginal_cost import calculate_marginal_cost_scenarios

class MarginalCostTests(unittest.TestCase):
    def setUp(self):
        self.rows = [{"rate": 7, "amount": 25}, {"rate": 7.5, "amount": 50}, {"rate": 8, "amount": 75}, {"rate": 8.5, "amount": 100}, {"rate": 9, "amount": 125}]
    def test_textbook_example(self):
        result = calculate_marginal_cost_scenarios(self.rows, 10)
        self.assertEqual(result["best_amount"], 100)
        self.assertAlmostEqual(result["best_profit"], 1.5, places=2)
        self.assertAlmostEqual(result["rows"][3]["marginal_cost_rate"], 10, places=2)
        self.assertAlmostEqual(result["rows"][4]["profit"], 1.25, places=2)
    def test_parameter_change(self):
        result = calculate_marginal_cost_scenarios(self.rows, 8)
        self.assertEqual(result["best_amount"], 50)
    def test_invalid(self):
        with self.assertRaises(ValueError): calculate_marginal_cost_scenarios([], 10)
        with self.assertRaises(ValueError): calculate_marginal_cost_scenarios([{"rate": 1, "amount": 0}], 10)

