import responses
import pytest
import os
from DeltaExportSynchronizer import *

def my_function():
    return os.environ.get('OPEN_FOOD_FACT_LINK','test')

def test_environment_variable(monkeypatch):
    mock_url = 'https://static.openfoodfacts.org/data/delta/index.txt'
    monkeypatch.setenv('OPEN_FOOD_FACT_LINK',mock_url)
    result = my_function()
    assert result == mock_url

@responses.activate
def test_getDeltaExportFileNames(monkeypatch):
    mock_url = 'https://static.openfoodfacts.org/data/delta/index.txt'
    monkeypatch.setenv('OPEN_FOOD_FACT_LINK',mock_url)
    
    responses.add(responses.GET, mock_url, status=200)
    DeltaExportSynchronizer().getDeltaExportFileNames()
    assert len(responses.calls) == 1



if __name__ == 'main':
    pytest.main()