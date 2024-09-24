import requests
import os
from WriteToObjectStorage import *


class DeltaExportSynchronizer:
    # Define link as a private variable using __ (double underscore)
    # __link = "https://static.openfoodfacts.org/data/delta/index.txt"

    def __init__(self) -> None:
        self.__link = os.environ.get('OPEN_FOOD_FACT_LINK')

    # starting point for the class
    def getDeltaExportFileNames(self):
        print("About to retrieve delta files")
        self.__getFileNames()

    # Define getFileNames as a private function using __ (double underscore)
    def __getFileNames(self):
        print("Link: {}".format(self.__link))
        response = requests.get(self.__link)

        try:
            response.raise_for_status()
        except requests.exceptions.HTTPError as e:
            print("Error: {}".format(str(e)))
            return

        print('Received Successful response: {}'.format(response.text))
        WriteToObjectStorage(response.text.splitlines()).downloadDeltaFiles()
