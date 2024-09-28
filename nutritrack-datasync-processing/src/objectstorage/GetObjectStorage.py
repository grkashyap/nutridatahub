import os

from src.objectstorage.AWSObjectStorageConnector import AWSObjectStorageConnector
from src.objectstorage.IObjectStorage import IObjectStorage


def get_object_storage(bucket_name) -> IObjectStorage:
    provider = os.getenv('CLOUD_PROVIDER')

    if provider == 'aws':
        return AWSObjectStorageConnector(bucket_name)
    else:
        raise ValueError(f'Unsupported cloud provider: {provider}')