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
        :param bucket_name: Bucket name
        """
        try:
            self.s3_client = boto3.client('s3')
            self.bucket_name = bucket_name
        except ClientError as e:
            logging.error(e)

    def upload_object_to_bucket(self, file_name, file_content):
        """
        This method take file name and file content as input and uploads the file to s3 bucket
        :param file_name: Name of the file to be uploaded to the bucket
        :param file_content: file content
        :return: True if file is successfully uploaded, otherwise False
        """
        try:
            response = self.s3_client.put_object(Bucket=self.bucket_name, Key=file_name, Body=file_content)
            return response['ResponseMetadata']['HTTPStatusCode'] == 200
        except ClientError as e:
            logging.error(e)
            return False
