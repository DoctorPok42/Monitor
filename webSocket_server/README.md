# Monitor Server

## Description

This script represents the server of this project. It will respond to the requests of the [client](../pages/) and [bot](../bot/).

It uses [Socket.io](https://socket.io/) to listen and emit events.

## Features

* 📊 **CPU, Memory and Disk usage logs.** (in percentages)
* 💾 **All specs of the server.** (disk, os, hostname, uptime, ...)
* 🔀 **Network ports (Open or Close) logs.** (based on config file `/var/log/worker/conf.json`)

## Events

* `connect` - When a client connects to the server.
* `disconnect` - When a client disconnects from the server.
* `getCPUStates` - When a client requests the cpu status.
* `getServerInfos` - When a client requests the server info.
* `getFinalData` - When a client requests the final data (cpu, memory, disk, network).

## Installation

1) Put the all the files contained in the `webSocket_server` folder in `/var/www/yoursite.com/` (or any other folder you want).

2) Change the `.env.example` file name to `.env` and fill the values with your own. The `.env` file should look like this:

```js
SERVER_URL=http://localhost:8000
SERVER_PORT=8000
LOG_PATH=/var/log/worker/log_worker.json
```

3) Install the dependencies by running the following command in your terminal:

```js
npm install
```

4) Run the server by running the following command in your terminal:

```js
node server.mjs
```
