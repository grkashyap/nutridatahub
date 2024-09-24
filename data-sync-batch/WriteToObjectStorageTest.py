import json
import responses
import pytest
import os
from WriteToObjectStorage import *
from moto import mock_aws

@responses.activate
@mock_aws
def test_downloadDeltaFiles(monkeypatch):
    response_text = ['test.txt']
    
    s3_client = boto3.client('s3')
    bucket_name = 'test-bucket'
    s3_client.create_bucket(Bucket=bucket_name)
    
    monkeypatch.setenv('BUCKET_NAME','test-bucket')
    monkeypatch.setenv('FOLDER_NAME','DeltaExports')
    monkeypatch.setenv('FILE_LINK','https://test.example.com/test.txt')

    mock_url = 'https://test.example.com/test.txt'
    mock_response = {'key':'This is a test file'}

    responses.add(responses.GET, mock_url, json=mock_response, status=200)

    write_to_obj_storage = WriteToObjectStorage(responseText=response_text)
    write_to_obj_storage.downloadDeltaFiles()

    response = s3_client.list_objects_v2(Bucket=bucket_name)

    print(f'response is {response}')

    assert 'Contents' in response