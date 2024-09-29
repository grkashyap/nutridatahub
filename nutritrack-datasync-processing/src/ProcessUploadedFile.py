import configparser
import os

from src.objectstorage.GetObjectStorage import get_object_storage


def lambda_handler(event, context):
    """
    This method is invoked when a file is uploaded to object storage
    :param event:
    :param context:
    """
    provider = os.environ.get('CLOUD_PROVIDER')

    config = configparser.ConfigParser()
    config_path = os.path.join(os.path.dirname(__file__), 'config.ini')
    config.read(config_path)

    bucket_name = config.get(provider, 'bucket_name')
    table_name = config.get(provider,'table_name')
    print(f'Processing files from bucket: {bucket_name} for provider: {provider}')
    object_storage_adapter = get_object_storage(provider=provider, bucket_name=bucket_name)
    object_storage_adapter.process_file_from_event(event=event, table_name=table_name, provider=provider)
    print('Completed processing')

    return {
        'statusCode': 200,
        'body': f'Processed file in bucket: {bucket_name}'
    }