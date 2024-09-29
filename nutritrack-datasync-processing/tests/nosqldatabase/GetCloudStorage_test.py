from src.nosqldatabase.AWSDynamoDBConnector import AWSDynamoDBConnector
from src.nosqldatabase.GetCloudStorage import get_cloud_storage
import pytest

def test_valid_cloud_storage_provider(monkeypatch):
    monkeypatch.setenv('CLOUD_PROVIDER','aws')
    database_provider = get_cloud_storage('test')
    assert isinstance(database_provider, AWSDynamoDBConnector)

def test_invalid_cloud_storage_provider(monkeypatch):
    cloud_provider = 'gcp'
    with pytest.raises(ValueError) as exception:
        monkeypatch.setenv('CLOUD_PROVIDER', cloud_provider)
        get_cloud_storage('test')
    assert str(exception.value) == f'Unsupported cloud provider: {cloud_provider}'

if __name__ == 'main':
    pytest.main()