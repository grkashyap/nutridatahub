import configparser
import os

import requests

from src.objectstorage.GetObjectStorage import get_object_storage


def download_delta_files():
    """
    Method to download delta files from open food fact server and upload to s3
    :return: None
    """
    print('About to retrieve delta files from internet')
    config = configparser.ConfigParser()
    config_path = os.path.join(os.path.dirname(__file__), 'config.ini')
    config.read(config_path)

    open_food_fact_url = config.get('OPEN_FOOD_FACT','open_food_fact_link')
    delta_file_link = config.get('OPEN_FOOD_FACT','delta_file_link')
    bucket_name = config.get('OPEN_FOOD_FACT','bucket_name')

    try:
        response = requests.get(open_food_fact_url)
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(f'Error while reading delta files: {e}')
        return

    delta_files_list = response.text.splitlines()
    print('Number of files to process: ',len(delta_files_list))

    object_storage_connector = get_object_storage(bucket_name=bucket_name)

    for file_name in delta_files_list:
        file_url = delta_file_link.format(filename=file_name)

        try:
            response = requests.get(file_url)
            response.raise_for_status()
        except requests.exceptions.HTTPError as e:
            print(f'Error while reading file {file_name} from url {file_url} : {e}')

        object_storage_connector.upload_object_to_bucket(file_name=file_name, file_content=response.content)

if __name__ == 'main':
    download_delta_files()