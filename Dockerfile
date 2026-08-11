FROM node:alpine

ARG SERVER_URL
ARG SERVER_PORT

ENV NODE_ENV=production
ENV SERVER_URL=$SERVER_URL
ENV SERVER_PORT=$SERVER_PORT

WORKDIR /app/src

COPY src/package*.json ./

RUN npm install --ignore-scripts

COPY src/ ./

RUN npm run build

EXPOSE 4000


CMD ["npm", "run", "start"]

