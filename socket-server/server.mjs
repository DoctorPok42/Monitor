import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import si from "systeminformation";

dotenv.config();

const getCaches = async () => {
  try {
    const allData = [];
    await si.cpuCache().then(data => {
      allData.push(data)
    })
    return allData;
  } catch (err) {
    console.log(err);
    return err;
  }
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.SERVER_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connect', (socket) => {
  console.log('New client :', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected :', socket.id);
  });

  setInterval(async () => {
    // if (usersLength > 1) return;
    const cache = await getCaches();
    const temps = await si.cpuTemperature();
    const speed = await si.cpuCurrentSpeed();
    const cpu = await si.cpu();
    const load = await si.currentLoad();

    socket.emit('getCPUStates', { cache, temps, speed, cpu, load });

    console.log(new Date().toLocaleString(), 'Sending data to client');
  }, 1000);
});

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});
