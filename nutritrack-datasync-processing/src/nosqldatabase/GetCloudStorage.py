import os
from src.nosqldatabase.ICloudDatabase import ICloudDatabase
from src.nosqldatabase.AWSDynamoDBConnector import AWSDynamoDBConnector


def get_cloud_storage(provider,table_name) -> ICloudDatabase:

    if provider == 'aws':
        return AWSDynamoDBConnector(table_name)
    else:
        raise ValueError(f'Unsupported cloud provider: {provider}')