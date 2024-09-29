import pytest

from src.objectstorage.AWSObjectStorageConnector import AWSObjectStorageConnector
from src.objectstorage.GetObjectStorage import get_object_storage


def test_valid_object_storage_provider(monkeypatch):
    provider = 'aws'
    object_storage_provider = get_object_storage(provider=provider, bucket_name='test')
    assert isinstance(object_storage_provider, AWSObjectStorageConnector)

def test_invalid_object_storage_provider(monkeypatch):
    provider = None
    with pytest.raises(ValueError) as exception:
        get_object_storage(provider=provider, bucket_name='test')
    assert str(exception.value) == f'Unsupported cloud provider: {provider}'

if __name__ == '__main__':
    pytest.main()
