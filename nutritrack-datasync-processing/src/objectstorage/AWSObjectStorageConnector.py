import gzip
import json
from io import BytesIO

from src.objectstorage.IObjectStorage import IObjectStorage
import boto3
from botocore.exceptions import ClientError
import logging

class AWSObjectStorageConnector(IObjectStorage):

    # Declare empty variables
    s3_client = None
    bucket_name = None

    def __init__(self, bucket_name):
        """
        The constructor takes bucket name as input and creates an object
        :param bucket_name: Name of the bucket
        """
        try:
            self.s3_client = boto3.client('s3')
            self.bucket_name = bucket_name
        except ClientError as e:
            logging.error(e)

    def stream_gzip_file_content_from_object_storage(self, file_name):
        """
        This method takes a filename as input and returns a json object as generator
        :param file_name: Name of the file in the object storage
        :return: generator
        """
        try:
            response = self.s3_client.get_object(Bucket=self.bucket_name, Key=file_name)

            with gzip.GzipFile(fileobj=BytesIO(response['Body'].read())) as content:
                for line in content:
                    json_object = json.loads(line.decode('utf-8'))
                    # create a generator
                    yield json_object
        except ClientError as e:
            logging.error(e)

    def remove_file_from_object_storage(self, file_name):
        """
        This method takes a filename as input and deletes the object from object storage
        It returns true or false based on whether the file is successfully deleted or not
        :param file_name: Name of the file in object storage which has to be deleted
        :return: boolean: True if file is successfully deleted. False if there is an error
        """
        try:
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=file_name)
            return True
        except ClientError as e:
            logging.error(e)
            return False
