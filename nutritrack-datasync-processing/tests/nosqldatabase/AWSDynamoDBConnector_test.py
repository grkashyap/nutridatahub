from operator import is_not
import boto3
from src.nosqldatabase.GetCloudStorage import get_cloud_storage
from src.nosqldatabase.AWSDynamoDBConnector import AWSDynamoDBConnector
from moto import mock_aws
import pytest

@mock_aws
def test_get_item_from_dynamodb(monkeypatch):
    provider = 'aws'
    table_name = 'TEST_TABLE'
    boto3.setup_default_session()
    client = boto3.resource('dynamodb', region_name='us-east-1')
    table = client.create_table(TableName='TEST_TABLE',
                        KeySchema=[{'AttributeName':'code','KeyType':'HASH'}],
                        AttributeDefinitions=[{'AttributeName':'code', 'AttributeType':'S'}],
                        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5})
    key = {'code':'TestUser'}
    table.put_item(Item=key)
    database_provider = get_cloud_storage(provider, table_name=table_name)
    assert isinstance(database_provider, AWSDynamoDBConnector)
    response = database_provider.get_from_db(key)
    assert is_not(response, None)
    assert response['code'] == 'TestUser'

@mock_aws
def test_add_item_to_dynamodb(monkeypatch):
    provider = 'aws'
    table_name = 'TEST_TABLE'
    boto3.setup_default_session()
    client = boto3.resource('dynamodb', region_name='us-east-1')
    client.create_table(TableName='TEST_TABLE',
                        KeySchema=[{'AttributeName':'code','KeyType':'HASH'}],
                        AttributeDefinitions=[{'AttributeName':'code', 'AttributeType':'S'}],
                        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5})
    database_provider = get_cloud_storage(provider=provider, table_name=table_name)
    assert isinstance(database_provider, AWSDynamoDBConnector)
    items = [{'code': 'TestUser'}]
    records_processed, records_in_error, total_records = database_provider.save_to_db(items)
    assert records_processed > 0
    assert records_in_error == 0
    assert total_records > 0
    item = {'code':'TestUser'}
    response = database_provider.get_from_db(item)
    assert is_not(response, None)
    assert response['code'] == 'TestUser'


if __name__ == 'main':
    pytest.main()