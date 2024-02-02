<div align="center">
    <h1 style="font-size: 50px; font-weight: bold; margin: 0px; padding: 0px;"
    >Monitor <img src="./public/favicon.ico" width="50px" height="50px"></h1>
</div>

## Description

<b>This is a monitoring project for your server!</b>

This project is composed of 4 parts:

* **⚙ [Worker](./worker/)**: This is the main part of the project. It's a Python script that will get the stats of the server send and save them in a json file.

* **🔀 [WebSocket Server](./webSocket_server/)**: This is a Node.js server that will send the different stats.

* **🤖 [Discord Bot](./bot/)**: This is a Discord bot that will send the stats of your server each minute in the same embed. If the critical level is reached, the bot will mention the role or user you set.

* **📊 [Website](./pages/)**: This is a website that will display the stats of your server in real time. (1 second delay)

## Features

* 📊 **CPU, Memory and Disk usage stats.**
* 🕛 **Server stats updated in real time.**
* 🔥 **You can set the critical level of cpu, memory and disk usage.** (By default it's set to 80%)
* 🏴 **If the critical level is reached, the bot will mention the role or user you set.**
* 💪 **You can add the bot in multiple servers (hosted on the same machine) and set different settings for each server.**
* 📈 **You can see the stats of your server in real time on a website.**
* 🔀 **Network ports (Open or Closed) logs.** (based on config file `/var/log/worker/conf.json`)

## Installation

1) Clone this repository by running the following command in your terminal:

```js
git clone git@github.com:DoctorPok42/Monitor.git
```

2) Follow the installation instructions of each part of the project:

* [Worker](./worker/) - [README.md](./worker/README.md)
* [WebSocket Server](./webSocket_server/) - [README.md](./webSocket_server/README.md)
* [Discord Bot](./bot/) - [README.md](./bot/README.md)

## Next features

* **Bot**:

  * [ ] Add a command to get the stats of the server.

  * [ ] Add a command to get the stats of the server in a graph.

  * [ ] Add graphs to the stats embed.

* **Bot, Website and WebSocket Server**:

  * [ ] Add dockerization.

* **Website**:

  * [ ] Add a page to see the logs of the worker.

  * [ ] Fill the website with more parameters.

## License

[MIT](https://github.com/DoctorPok42/Monitor/blob/main/LICENSE)
