import os

from src.objectstorage.GetObjectStorage import get_object_storage


def lambda_handler(event, context):
    """
    This method is invoked when a file is uploaded to object storage
    :param event:
    :param context:
    """
    bucket_name = os.environ.get('BUCKET_NAME')
    print(f'Processing files from bucket: {bucket_name}')
    object_storage_adapter = get_object_storage(bucket_name=bucket_name)
    object_storage_adapter.process_file_from_event(event)
    print('Completed processing')

    return {
        'statusCode': 200,
        'body': f'Processed file in bucket: {bucket_name}'
    }