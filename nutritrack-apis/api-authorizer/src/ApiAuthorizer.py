import json
import os

def lambda_handler(event, context):
    # Extract headers from the incoming request
    headers = event.get('headers', {})

    # Get the 'Origin' or 'Referer' header
    origin = headers.get('Origin') or headers.get('Referer')

    # Define the allowed origin (your S3 bucket URL)
    allowed_origin = get_url()

    # Check if the 'Origin' or 'Referer' header starts with the allowed URL
    if origin and origin.startswith(allowed_origin):
        # If the request comes from the allowed origin, allow the request
        return generate_policy('Allow', event)
    else:
        # If the request doesn't come from the allowed origin, deny the request
        return generate_policy('Deny', event)


def generate_policy(effect, event):
    """
    Generates an IAM policy allowing or denying access to the API based on the provided effect ('Allow' or 'Deny').
    """
    return {
        'principalId': 'user',  # You can replace 'user' with a specific user identifier if available
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [{
                'Action': 'execute-api:Invoke',  # Action allowed (Invoke API)
                'Effect': effect,
                'Resource': event['methodArn']  # The specific API method being invoked
            }]
        }
    }

def get_url():
    current_dir = os.path.dirname(os.path.abspath(__file__))

    file_path = os.path.join(current_dir, 'config.json')

    with open(file_path, 'r') as file:
        data = json.load(file)
        print(data)
        return data['URL']
