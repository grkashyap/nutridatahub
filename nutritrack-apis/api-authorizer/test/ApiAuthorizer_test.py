import pytest
from src.ApiAuthorizer import lambda_handler

# Test case data for different request scenarios
test_data = [
    # Case 1: Valid request from the allowed origin
    {
        "event": {
            "headers": {
                "Origin": "http://localhost:3001",
                "Referer": "http://localhost:3001"
            },
            "methodArn": "arn:aws:execute-api:us-east-1:123456789012:abcde/GET/my-resource"
        },
        "expected_policy_effect": "Allow"
    },

    # Case 2: Request from an invalid origin
    {
        "event": {
            "headers": {
                "Origin": "http://localhost:3002",
                "Referer": "http://localhost:3002"
            },
            "methodArn": "arn:aws:execute-api:us-east-1:123456789012:abcde/GET/my-resource"
        },
        "expected_policy_effect": "Deny"
    },

    # Case 3: Request with no 'Origin' or 'Referer' header (should deny)
    {
        "event": {
            "headers": {},
            "methodArn": "arn:aws:execute-api:us-east-1:123456789012:abcde/GET/my-resource"
        },
        "expected_policy_effect": "Deny"
    }
]

@pytest.mark.parametrize("test_case", test_data)
def test_lambda_authorizer(test_case):
    # Call the Lambda handler with the test case's event
    event = test_case["event"]
    expected_policy_effect = test_case["expected_policy_effect"]

    # Call the lambda_handler function (the actual Lambda Authorizer logic)
    response = lambda_handler(event, None)

    # Extract the 'Effect' from the returned policy
    effect = response['policyDocument']['Statement'][0]['Effect']

    # Assert that the effect matches the expected result (Allow or Deny)
    assert effect == expected_policy_effect
