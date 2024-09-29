import pytest

from src.objectstorage.AWSObjectStorageConnector import AWSObjectStorageConnector
from src.objectstorage.GetObjectStorage import get_object_storage


def test_valid_object_storage_provider(monkeypatch):
    monkeypatch.setenv('CLOUD_PROVIDER', 'aws')
    object_storage_provider = get_object_storage('test')
    assert isinstance(object_storage_provider, AWSObjectStorageConnector)

def test_invalid_object_storage_provider(monkeypatch):
    cloud_provider = 'gcp'
    with pytest.raises(ValueError) as exception:
        monkeypatch.setenv('CLOUD_PROVIDER', 'gcp')
        get_object_storage('test')
    assert str(exception.value) == f'Unsupported cloud provider: {cloud_provider}'

if __name__ == 'main':
    pytest.main()
