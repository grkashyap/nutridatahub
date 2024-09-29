import os

from src.objectstorage.AWSObjectStorageConnector import AWSObjectStorageConnector
from src.objectstorage.IObjectStorage import IObjectStorage


def get_object_storage(provider, bucket_name) -> IObjectStorage:

    if provider == 'aws':
        return AWSObjectStorageConnector(bucket_name)
    else:
        raise ValueError(f'Unsupported cloud provider: {provider}')