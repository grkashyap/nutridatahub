import json
import responses
import pytest
import os
from WriteToObjectStorage import *
from moto import mock_aws

@pytest.fixture
def s3_setup():
    with mock_aws():
        s3_client = boto3.client('s3')
        bucket_name = 'test-bucket'
        response = s3_client.create_bucket(Bucket=bucket_name, ACL='public-read-write', GrantFullControl='true')
        bucket_policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": [
                        "s3:PutObject",
                        "s3:GetObject"
                    ],
                    "Resource": f"arn:aws:s3:::{bucket_name}/*"
                }
            ]
        }
        #print(f'response is {response}')'
        s3_client.put_object(Bucket=bucket_name, Key='DeltaExports/file1.txt', Body='Content of file 1')
        #s3_client.put_bucket_policy(Bucket=bucket_name, Policy=json.dumps(bucket_policy))
        yield bucket_name

@responses.activate
def test_downloadDeltaFiles(monkeypatch):
    response_text = ['test.txt']
    bucket_name = s3_setup
    
    monkeypatch.setenv('BUCKET_NAME','test-bucket')
    monkeypatch.setenv('FOLDER_NAME','DeltaExports')
    monkeypatch.setenv('FILE_LINK','https://test.example.com/test.txt')

    mock_url = 'https://test.example.com/test.txt'
    mock_response = {'key':'This is a test file'}

    responses.add(responses.GET, mock_url, json=mock_response, status=200)

    write_to_obj_storage = WriteToObjectStorage(responseText=response_text)
    write_to_obj_storage.downloadDeltaFiles()

    #s3_client = boto3.client('s3')
    #response = s3_client.list_objects_v2(Bucket=bucket_name)

    #print(f'response is {response}')

    #assert 'Contents' in response