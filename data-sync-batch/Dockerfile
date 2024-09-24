FROM python:3.9

WORKDIR /app

RUN pip install boto3 requests

COPY DeltaExportSynchronizer.py .
COPY WriteToObjectStorage.py .
COPY Init.py .

CMD ["python Init.py"]