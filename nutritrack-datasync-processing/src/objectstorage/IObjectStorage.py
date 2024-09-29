from abc import ABC, abstractmethod

from src.nosqldatabase.ICloudDatabase import MethodNotImplementedException


class IObjectStorage(ABC):
    """
    Interface to define methods to handle object storage operations
    """

    __ERROR_MESSAGE = 'This method is not implemented'

    @abstractmethod
    def stream_gzip_file_content_from_object_storage(self, file_name):
        raise MethodNotImplementedException(self.__ERROR_MESSAGE)

    @abstractmethod
    def remove_file_from_object_storage(self, file_name):
        raise MethodNotImplementedException(self.__ERROR_MESSAGE)

    @abstractmethod
    def process_file_from_event(self, event):
        raise MethodNotImplementedException(self.__ERROR_MESSAGE)
