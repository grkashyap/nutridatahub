from abc import ABC, abstractmethod

class IObjectStorage(ABC):
    """
    Interface to define methods to handle object storage operations
    """
    __ERROR_MESSAGE = 'This method is not implemented'

    @abstractmethod
    def upload_object_to_bucket(self, file_name, file_content):
        raise MethodNotImplementedException(self.__ERROR_MESSAGE)

class MethodNotImplementedException(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return f"Method Not Implemented Exception {self.message}"
