from abc import ABC, abstractmethod


class ICloudDatabase(ABC):
    """
    Interface to define methods to handle nosql database operations
    """

    @abstractmethod
    def get_from_db(self, key):
        """
        Subclasses should implement this method with logic specific to that database
        :param key:  Key:value pair to store data to a document database like AWS dynamo db
        :return: Any: response from the operation
        """
        raise MethodNotImplementedException("This method is not implemented")

    @abstractmethod
    def save_to_db(self, item):
        """
        Subclasses should implement this method with logic specific to that database
        :param item: Key:value pair to store data to a document database like AWS dynamo db
        :return: Any: response from the operation
        """
        raise MethodNotImplementedException("This method is not implemented")


class MethodNotImplementedException(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return f"Method Not Implemented Exception {self.message}"
