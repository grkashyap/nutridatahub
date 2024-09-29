import pytest
from botocore.exceptions import ClientError
from moto import mock_aws
import boto3
import gzip
import json
import io

from src.objectstorage.GetObjectStorage import get_object_storage

@mock_aws
def test_upload_object_to_bucket(monkeypatch):
    monkeypatch.setenv('CLOUD_PROVIDER', 'aws')
    bucket_name = 'test-bucket'
    file_name = 'test.json.gz'
    json_text = [{'key1': 'test1'}, {'key2': 'test2'}]
    json_string = json.dumps(json_text)
    compressed_stream = io.BytesIO()
    with gzip.GzipFile(mode='wb', fileobj=compressed_stream) as gz:
        gz.write(json_string.encode('utf-8'))
    compressed_data = compressed_stream.getvalue()
    with open('test_data.json.gz', 'wb') as f:
        f.write(compressed_data)

    client = boto3.client('s3')
    client.create_bucket(Bucket=bucket_name)

    object_storage_adapter = get_object_storage(bucket_name=bucket_name)
    with gzip.open('test_data.json.gz', mode='rb') as file:
        data = file.read()

    response = object_storage_adapter.upload_object_to_bucket(file_name=file_name, file_content=data)
    assert response is True

    try:
        response = client.get_object(Bucket=bucket_name, Key=file_name)
        assert response['ResponseMetadata']['HTTPStatusCode'] == 200
    except ClientError as e:
        pytest.fail(f'Object should be available in the bucket: {e}')


if __name__ == 'main':
    pytest.main()