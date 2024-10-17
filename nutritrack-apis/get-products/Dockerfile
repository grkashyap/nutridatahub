FROM public.ecr.aws/lambda/nodejs:20

LABEL maintainer="Rahul"

WORKDIR ${LAMBDA_TASK_ROOT}

COPY package.json ${LAMBDA_TASK_ROOT}

RUN npm install

COPY ./dist/ ${LAMBDA_TASK_ROOT}

CMD ["index.handler"]