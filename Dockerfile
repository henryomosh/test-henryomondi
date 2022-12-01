# A single container to publish/run your app on a server

FROM node:16-slim AS frontend
WORKDIR /app
ADD ./frontend /app
RUN yarn install && yarn build

FROM python:3-slim
WORKDIR /app
ADD . /app

RUN set -ex \
    && RUN_DEPS="python3-dev" \
    && seq 1 8 | xargs -I{} mkdir -p /usr/share/man/man{} \
    && apt-get update \
    && apt-get install --fix-missing -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*
RUN set -ex && pip install -r requirements/dev.txt

COPY --from=frontend /app ./frontend
RUN rm -rf /app/staticroot && python manage.py collectstatic --noinput

CMD docker/backend-cmd.sh
