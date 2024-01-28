# Monitor Bot

## Description

Tanks to [Discord.js v14 Bot Template](https://github.com/MericcaN41/discordjs-v14-template-ts) for the base of this bot.

This bot is used to monitor the server's cpu, memory, disk usage and network ports. It will send the stats every minute in the same embed. If the critical level is reached, the bot will mention the role or user you set.

He use [Socket.io](https://socket.io/) to get the stats of the [server](../socket-server/) and [MongoDB](https://www.mongodb.com/) to store the settings of the bot for each server.

## Features

* 📊 **CPU, Memory and Disk usage stats.**
* 🕛 **Minutely updated the stats of the server in the same embed.**
* 🔥 **You can set the critical level of cpu, memory and disk usage.** (By default it's set to 80%)
* 🏴 **If the critical level is reached, the bot will mention the role or user you set.**
* 💪 **You can add the bot in multiple servers (hosted on the same machine) and set different settings for each server.**

## Commands

* `/setdefaultchannel <channel>` - Set the default channel where the bot will send the stats.
* `/setnotify <mention>` - Set the role or user to mention when the critical level is reached.
* `/changelevel [cpu] [memory] [disk]` - Change the critical level of cpu, memory and disk usage.
* `/ping` - Check the bot's ping.
* `/clear <amount>` - Clear messages.

## Installation, Build and Run

1) Clone the repository then change the `.env.example` file name to `.env` and fill the values with your own. The `.env` file should look like this:

```js
TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_DISCORD_BOT_CLIENT_ID
PREFIX=!
MONGO_URI=YOUR_MONGO_URI
SOCKET_URL=http://localhost:8000
```

2) Install typescript, To install TypeScript, you can run the following command in your terminal, This will install the latest version of TypeScript globally on your computer. (You can skip this if you already have typescript installed)

```ts
  npm install -g typescript
  ```

3) Install the dependencies by running the following command in your terminal:

```js
npm install
```

4) Build the project by running the following command:

```js
npm run build
```

5) Once the build is complete it will generated a folder named `build` that contains compiled version of your ts code to js. You can run the following command in your terminal to run the project:

```js
npm start
```
