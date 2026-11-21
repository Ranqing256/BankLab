import json
from http.server import BaseHTTPRequestHandler
from api.chapter3 import calculate_weighted_average_cost, calculate_historical_cost_table, calculate_marginal_cost_scenarios, calculate_cost_plus_pricing, calculate_funding_gap
from api.chapter4 import calculate_reserve_requirement, calculate_liquidity_forecast, calculate_structure_liquidity, calculate_headroom


def dispatch(payload):
    operation = payload.get("operation")
    if operation == "weighted_average_cost":
        return calculate_weighted_average_cost(payload.get("sources", []))
    if operation == "historical_cost_table":
        return calculate_historical_cost_table(payload.get("rows", []), payload.get("year", "a"))
    if operation == "marginal_cost":
        return calculate_marginal_cost_scenarios(payload.get("scenarios", []), payload.get("asset_yield_pct", 10))
    if operation == "cost_plus_pricing":
        return calculate_cost_plus_pricing(payload.get("sources", []))
    if operation == "funding_gap":
        return calculate_funding_gap(payload.get("demand", 0), payload.get("deposits", 0))
    if operation == "reserve_requirement":
        return calculate_reserve_requirement(payload.get("deposit_average", 0), payload.get("reserve_rate_pct", 0), payload.get("method", "lagged"))
    if operation == "liquidity_forecast":
        return calculate_liquidity_forecast(payload.get("deposit_change", 0), payload.get("loan_change", 0), payload.get("reserve_change", 0))
    if operation == "structure_liquidity":
        return calculate_structure_liquidity(payload.get("rows", []), payload.get("new_loan", 0))
    if operation == "headroom":
        return calculate_headroom(payload.get("cash", 0), payload.get("central_excess", 0), payload.get("interbank", 0), payload.get("statutory_reserve", 0))
    raise ValueError("unknown operation")


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = {
            "ok": True,
            "service": "BankLab Chapter 3 API",
            "operations": ["weighted_average_cost", "historical_cost_table", "marginal_cost", "cost_plus_pricing", "funding_gap", "reserve_requirement", "liquidity_forecast", "structure_liquidity", "headroom"],
        }
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(body, ensure_ascii=False).encode("utf-8"))

    def do_POST(self):
        try:
            length = int(self.headers.get("content-length", "0"))
            payload = json.loads(self.rfile.read(length) or b"{}")
            body = {"ok": True, "data": dispatch(payload)}
            status = 200
        except (ValueError, KeyError, TypeError, json.JSONDecodeError) as exc:
            body = {"ok": False, "error": str(exc)}
            status = 400
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(body, ensure_ascii=False).encode("utf-8"))

