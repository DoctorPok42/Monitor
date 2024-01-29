import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import si from "systeminformation";
import os from "os";
import fs from "fs";

config();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SERVER_URL,
    methods: ['GET', 'POST'],
  },
});

const logPath = process.env.LOG_PATH;

io.on('connect', (socket) => {
  console.log('New client :', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected :', socket.id);
  });

  // websocket send by the web app
  socket.on('getCPUStates', async () => {
    const cache = await si.cpuCache();
    const temps = await si.cpuTemperature();
    const speed = await si.cpuCurrentSpeed();
    const cpu = await si.cpu();
    const load = await si.currentLoad();

    socket.emit('getCPUStates', { cache, temps, speed, cpu, load });
    console.log(new Date().toLocaleString(), 'Sending CPU states to', socket.id);
  })

  // websocket send by the web app
  socket.on('getServerInfos', async () => {
    const allData = await [{
      hostname: os.hostname(),
      hostname: os.hostname(),
      arch: os.arch(),
      platform: os.platform(),
      release: os.release(),
      type: os.type(),
      uptime: os.uptime(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      networkInterfaces: os.networkInterfaces(),
      os: os,
    }]

    const files = await si.fsSize();

    socket.emit('serverInfos', { serverInfos: allData, files });
    console.log(new Date().toLocaleString(), 'Sending server infos to', socket.id);
  })

  // websocket send by the Discord bot
  socket.on("getFinalData", async () => {
    try {
      const file = await fs.readFileSync(logPath, 'utf8');

      const newFile = JSON.parse(file);

      const dates = Object.keys(newFile);
      const lastDate = dates.reduce((a, b) => { return a > b ? a : b });

      const cpu = newFile[lastDate].cpu;
      const memory = newFile[lastDate].memory;
      const disk = newFile[lastDate].disk[0];
      const networkPorts = newFile[lastDate].network;

      socket.emit("finalData", { lastDate, cpu, memory, disk, networkPorts });
      console.log(new Date().toLocaleString(), 'Sending final data to', socket.id);
    } catch (error) {
      console.log(error);
    }
    console.log(new Date().toLocaleString(), 'Sending final data to', socket.id);
  })
});

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
