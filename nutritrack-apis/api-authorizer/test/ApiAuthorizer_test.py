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
            "requestContext": {
                "path": "/request",
                "accountId": "123456789012",
                "resourceId": "05c7jb",
                "stage": "test",
                "requestId": "...",
                "identity": {
                  "apiKey": "...",
                  "sourceIp": "...",
                  "clientCert": {
                    "clientCertPem": "CERT_CONTENT",
                    "subjectDN": "www.example.com",
                    "issuerDN": "Example issuer",
                    "serialNumber": "a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1",
                    "validity": {
                      "notBefore": "May 28 12:30:02 2019 GMT",
                      "notAfter": "Aug  5 09:36:04 2021 GMT"
                    }
                  }
                }
            }
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
            "requestContext": {
                "path": "/request",
                "accountId": "123456789012",
                "resourceId": "05c7jb",
                "stage": "test",
                "requestId": "...",
                "identity": {
                  "apiKey": "...",
                  "sourceIp": "...",
                  "clientCert": {
                    "clientCertPem": "CERT_CONTENT",
                    "subjectDN": "www.example.com",
                    "issuerDN": "Example issuer",
                    "serialNumber": "a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1",
                    "validity": {
                      "notBefore": "May 28 12:30:02 2019 GMT",
                      "notAfter": "Aug  5 09:36:04 2021 GMT"
                    }
                  }
                }
            }
        },
        "expected_policy_effect": "Deny"
    },

    # Case 3: Request with no 'Origin' or 'Referer' header (should deny)
    {
        "event": {
            "headers": {},
            "requestContext": {
                "path": "/request",
                "accountId": "123456789012",
                "resourceId": "05c7jb",
                "stage": "test",
                "requestId": "...",
                "identity": {
                  "apiKey": "...",
                  "sourceIp": "...",
                  "clientCert": {
                    "clientCertPem": "CERT_CONTENT",
                    "subjectDN": "www.example.com",
                    "issuerDN": "Example issuer",
                    "serialNumber": "a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1",
                    "validity": {
                      "notBefore": "May 28 12:30:02 2019 GMT",
                      "notAfter": "Aug  5 09:36:04 2021 GMT"
                    }
                  }
                }
            }
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
