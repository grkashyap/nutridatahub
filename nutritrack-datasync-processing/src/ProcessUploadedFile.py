import configparser
import os

from src.objectstorage.GetObjectStorage import get_object_storage


def lambda_handler(event, context):
    """
    This method is invoked from AWS lambda
    :param event: Event from AWS lambda
    :param context:
    : return: returns response from process_file method
    """
    return process_file(event)

def process_file(event):
    """
    This method takes event object from AWS lambda and processes it
    :param event:
    :return: Success or failure response based on whether the file is successfully processed
    """
    provider = os.environ.get('CLOUD_PROVIDER')
    config = configparser.ConfigParser()
    config_path = os.path.join(os.path.dirname(__file__), 'config.ini')
    config.read(config_path)

    # if bucket name cannot be retrieved from s3 event, get it from config.ini file
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    if bucket_name is None:
        bucket_name = config.get(provider, 'bucket_name')

    table_name = config.get(provider, 'table_name')
    print(f'Processing files from bucket: {bucket_name} for provider: {provider}')
    object_storage_adapter = get_object_storage(provider=provider, bucket_name=bucket_name)
    response = object_storage_adapter.process_file_from_event(event=event, table_name=table_name, provider=provider)
    if response is False:
        return send_failure_response()

    return send_success_response()

def send_success_response():
    """
    Method to send success response
    :return: JSON object with success message
    """
    return {
        'statusCode': 200,
        'body': 'Successfully processed file'
    }

def send_failure_response():
    """
    Method to send failure response
    :return: JSON object with failure message
    """
    return {
        'statusCode': 500,
        'body': 'Error occurred while processing file'
    }