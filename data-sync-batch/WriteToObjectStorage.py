import boto3
import os
import requests


class WriteToObjectStorage:

    # __file_link = 'https://static.openfoodfacts.org/data/delta/{filename}'

    def __init__(self, responseText):
        self.responseText = responseText
        self.__bucket_name = os.environ.get('BUCKET_NAME')
        self.__sub_folder = os.environ.get('FOLDER_NAME')
        self.__s3_client = boto3.client('s3')
        self.__file_link = os.environ.get('FILE_LINK')

    def list_s3_objects(self):
        response = self.s3_client.list_objects_v2(Bucket=self.bucket_name)
        for obj in response.get('Contents', []):
            print(obj['Key'])

    def downloadDeltaFiles(self):
        for file_name in self.responseText:            
            file_url = self.__file_link.format(filename=file_name)
            self.__getDeltaFile(file_name, file_url)

    def __getDeltaFile(self, file_name, file_url):
        response = requests.get(file_url)
        response.raise_for_status()

        s3_file_name = f'{self.__sub_folder}/{file_name}'
        s3_response = self.__s3_client.put_object(Bucket=self.__bucket_name,
                                                  Key=s3_file_name,
                                                  Body=response.content)
        print(f"Uploaded {file_name} from {file_url} with {s3_response}")
