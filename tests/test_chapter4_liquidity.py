import unittest

from api.chapter4 import (
    calculate_headroom,
    calculate_liquidity_forecast,
    calculate_reserve_requirement,
    calculate_structure_liquidity,
)


class Chapter4LiquidityTests(unittest.TestCase):
    def test_table_4_1_lagged_case(self):
        result = calculate_reserve_requirement(80000, 7, "lagged")
        self.assertEqual(result["required_reserve"], 5600)

    def test_synchronous_case(self):
        result = calculate_reserve_requirement(1000, 8, "synchronous")
        self.assertEqual(result["required_reserve"], 80)
        self.assertEqual(result["method"], "synchronous")

    def test_zero_boundary(self):
        self.assertEqual(calculate_reserve_requirement(0, 0)["required_reserve"], 0)
        balanced = calculate_liquidity_forecast(0, 0, 0)
        self.assertEqual(balanced["position_type"], "balanced")
        self.assertEqual(calculate_structure_liquidity([], 0)["total_liquidity_need"], 0)

    def test_invalid_reserve_rate(self):
        with self.assertRaises(ValueError):
            calculate_reserve_requirement(100, 101)

    def test_table_4_3_second_week(self):
        result = calculate_liquidity_forecast(-100, 50, -8)
        self.assertEqual(result["net_position"], -142)
        self.assertEqual(result["position_type"], "deficit")

    def test_table_4_4_case(self):
        rows = [
            {"name": "游动性货币负债", "amount": 300, "reserve_rate": 8, "liquidity_ratio": 95},
            {"name": "脆弱性货币负债", "amount": 250, "reserve_rate": 5, "liquidity_ratio": 30},
            {"name": "稳定性货币负债", "amount": 400, "reserve_rate": 3, "liquidity_ratio": 15},
        ]
        result = calculate_structure_liquidity(rows, 12)
        self.assertAlmostEqual(result["total_liquidity_need"], 403.65, places=2)

    def test_headroom(self):
        result = calculate_headroom(10, 20, 5, 8)
        self.assertEqual(result["available_headroom"], 35)
        self.assertEqual(result["base_headroom"], 30)

    def test_negative_inputs_rejected(self):
        with self.assertRaises(ValueError):
            calculate_liquidity_forecast(float("nan"), 2, 0)
        with self.assertRaises(ValueError):
            calculate_headroom(-1, 2, 0, 0)
        with self.assertRaises(ValueError):
            calculate_structure_liquidity([{"name": "项目", "amount": 1, "reserve_rate": 5, "liquidity_ratio": 101}], 0)


if __name__ == "__main__":
    unittest.main()

