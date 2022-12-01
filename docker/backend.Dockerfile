FROM python:3-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY . /app

RUN set -ex \
    && RUN_DEPS="python3-dev" \
    && seq 1 8 | xargs -I{} mkdir -p /usr/share/man/man{} \
    && apt-get update \
    && apt-get install --fix-missing -y --no-install-recommends $RUN_DEPS \
    && rm -rf /var/lib/apt/lists/*
RUN set -ex && pip install -r requirements/dev.txt

CMD docker/backend-cmd.sh
