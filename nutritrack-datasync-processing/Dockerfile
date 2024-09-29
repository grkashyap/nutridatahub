FROM python:3.12

LABEL maintainer="Rahul"

WORKDIR /app

ENV PYTHONPATH="/app/src"

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY ./src ./src

CMD ["src.ProcessUploadedFile.lambda_handler"]