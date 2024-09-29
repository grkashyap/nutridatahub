FROM python:3.12

WORKDIR /app

ENV PYTHONPATH="/app/src"

RUN pip install boto3 requests

COPY ./src ./src

ENV PYTHONPATH /src

CMD ["python","-m", "src.DownloadDeltaFiles"]