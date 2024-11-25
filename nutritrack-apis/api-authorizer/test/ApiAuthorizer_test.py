import pytest
from src.ApiAuthorizer import lambda_handler

# Test case data for different request scenarios
test_data = [
    # Case 1: Valid request from the allowed origin
    {
        "event": {
            "headers": {'accept': 'application/json, text/plain, */*', 'accept-encoding': 'gzip, deflate, br, zstd', 'accept-language': 'en-US,en;q=0.5', 'content-length': '0', 'host': 'tjjs7ntd3a.execute-api.us-east-1.amazonaws.com', 'origin': 'http://localhost:3001', 'priority': 'u=0', 'referer': 'http://localhost:3001', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'cross-site', 'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0', 'x-amzn-trace-id': 'Root=1-6742f8ad-139e3f8f6ef3fb673ebf1d76', 'x-forwarded-for': '49.205.253.164', 'x-forwarded-port': '443', 'x-forwarded-proto': 'https'},
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
