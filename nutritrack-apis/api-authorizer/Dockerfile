FROM public.ecr.aws/lambda/python:3.12

LABEL maintainer="Rahul"

WORKDIR ${LAMBDA_TASK_ROOT}

ENV PYTHONPATH ${LAMBDA_TASK_ROOT}/src

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY ./src ./src

ENV PYTHONPATH /src

CMD ["src.ApiAuthorizer.lambda_handler"]