import responses
from moto import mock_aws
import boto3
import pytest

from src.DownloadDeltaFiles import download_delta_files


@mock_aws
@responses.activate
def test_download_delta_files(monkeypatch):
    monkeypatch.setenv('CLOUD_PROVIDER', 'aws')
    response_text='test.txt'
    mock_response = {'key':'This is a test file'}
    mock_url = 'https://static.openfoodfacts.org/data/delta/index.txt'
    mock_file_url='https://static.openfoodfacts.org/data/delta/test.txt'
    responses.add(responses.GET, mock_url, body='test.txt', status=200)
    responses.add(responses.GET, mock_file_url, json=mock_response, status=200)

    bucket_name = 'nutritrackdeltaexports'
    s3_client = boto3.client('s3')
    s3_client.create_bucket(Bucket=bucket_name)

    response_from_service = download_delta_files()
    print(response_from_service)

    response = s3_client.list_objects_v2(Bucket=bucket_name)
    assert response['ResponseMetadata']['HTTPStatusCode'] == 200
    assert response['Name'] == bucket_name
    assert response['KeyCount'] == 1

if __name__ == 'main':
    pytest.main()