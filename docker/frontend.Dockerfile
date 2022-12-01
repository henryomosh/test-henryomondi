# 17 node does not work with webpack 5.x due to an old hashing function it uses
FROM node:16-slim

WORKDIR /app
COPY . /app

RUN yarn --cwd /app/frontend install

CMD docker/frontend-cmd.sh
