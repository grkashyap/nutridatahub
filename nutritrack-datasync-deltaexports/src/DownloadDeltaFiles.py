import configparser
import os

import requests

from src.objectstorage.GetObjectStorage import get_object_storage

def lambda_handler(event, context):
    download_delta_files()

def download_delta_files():
    """
    Method to download delta files from open food fact server and upload to s3
    :return: None
    """

    provider = os.environ.get('CLOUD_PROVIDER')

    print(f'About to retrieve delta files from internet for provider: {provider}')

    config = configparser.ConfigParser()
    config_path = os.path.join(os.path.dirname(__file__), 'config.ini')
    config.read(config_path)

    open_food_fact_url = config.get('OPEN_FOOD_FACT','open_food_fact_link')
    delta_file_link = config.get('OPEN_FOOD_FACT','delta_file_link')
    bucket_name = config.get(provider,'bucket_name')

    try:
        response = requests.get(open_food_fact_url)
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(f'Error while reading delta files: {e}')
        return

    delta_files_list = response.text.splitlines()
    num_export_files = len(delta_files_list)
    print('Number of files to process: ',num_export_files)

    object_storage_connector = get_object_storage(provider=provider, bucket_name=bucket_name)

    actual_exported_files = 0
    for file_name in delta_files_list:
        file_url = delta_file_link.format(filename=file_name)

        try:
            response = requests.get(file_url)
            response.raise_for_status()
        except requests.exceptions.HTTPError as e:
            print(f'Error while reading file {file_name} from url {file_url} : {e}')
            return_failure_response(e)

        object_storage_connector.upload_object_to_bucket(file_name=file_name, file_content=response.content)
        actual_exported_files = actual_exported_files+1

    return_success_response(num_files=actual_exported_files)


def return_success_response(num_files):
    result = {
        "message": f'Successfully uploaded {num_files} to object storage',
        "data": num_files
    }
    return {
        "statusCode": 200,
        "body": f'Successfully uploaded {num_files} to object storage'
    }

def return_failure_response(error):
    result = {
        "message": "Failed to upload files",
        "data": error
    }

    return {
        "statusCode": 500,
        "body": f'Failed to upload files due to error: {error}'
    }


if __name__ == '__main__':
    download_delta_files()