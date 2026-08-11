FROM node:alpine

ARG SERVER_URL
ARG SERVER_PORT
ARG LOG_PATH

ENV SERVER_URL=$SERVER_URL
ENV SERVER_PORT=$SERVER_PORT
ENV LOG_PATH=$LOG_PATH

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . ./

RUN npm run build

EXPOSE $SERVER_PORT

CMD ["node", "server.mjs"]
