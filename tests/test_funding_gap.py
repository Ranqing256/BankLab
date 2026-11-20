import unittest
from api.chapter3.funding_gap import calculate_funding_gap

class FundingGapTests(unittest.TestCase):
    def test_textbook_example(self):
        result = calculate_funding_gap(20000, 15000)
        self.assertEqual(result["gap"], 5000)
        self.assertEqual(result["non_deposit_need"], 5000)
    def test_surplus_and_boundary(self):
        self.assertEqual(calculate_funding_gap(100, 100)["gap_type"], "balanced")
        self.assertEqual(calculate_funding_gap(100, 120)["gap_type"], "surplus")
        with self.assertRaises(ValueError): calculate_funding_gap(-1, 2)

