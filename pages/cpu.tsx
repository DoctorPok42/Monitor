import { useEffect, useState } from "react";
import { SideBar, RadialBar, CoresTemp, Column, Area, Header, Pie } from "../components";
import { io } from "socket.io-client";
import dotenv from 'dotenv';

export const Home = ({ SERVER_URL }: any) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [bidData, setBidData] = useState<any>([]);
  const [cpuState, setCpuState] = useState<any>({
    series: [0],
    cores: [0]
  });
  const [cache, setCache] = useState<any>([{
    value: [0, 0],
    time: ["0", "0"]
  }]);
  const [cpuSpeed, setCpuSpeed] = useState<any>(
    [{
      value: 0,
    },
    {
      value: 0,
    },
    {
      value: 0,
    }]
  );

  const [process, setProcess] = useState<any>([{
    value: 1,
    label: "User"
  },
  {
    value: 1,
    label: "System"
  }]);

  const [newDate, setNewDate] = useState<string>(new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
  }));

  const connectToSocket = () => {
    if (connected) return;
    const socket = io(`${SERVER_URL}`, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected to server!");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server!");
    });

    socket.on("getCPUStates", (data: any) => {
      const value = Object.values(data.cache[0]);
      const time = Object.keys(data.cache[0]);
      setCache({
        value,
        time
      });

      setCpuSpeed([{value: data.speed.avg * 10}, {value: data.speed.min * 10}, {value: data.speed.max * 10}]);
      const speed = data.cpu.speed;
      let newTime = new Date().toLocaleTimeString();
      newTime = newTime.split(":")[0] + "h" + newTime.split(":")[1] + ":" + newTime.split(":")[2].split(" ")[0];
      setBidData((prev: any) => [...prev, { speed, time }]);

      setProcess([{
          value: parseFloat(data.load.currentLoadUser.toFixed(2)),
          label: "User",
        },
        {
          value: parseFloat(data.load.currentLoadSystem.toFixed(2)),
          label: "System",
      }]);

      setCpuState({series: [data.temps[0].main], cores: data.temps[0].cores});
    });
  }

  useEffect(() => {
    connectToSocket();
  }, []);

  useEffect(() => {
    if (bidData.length > 15) {
      setBidData((prev: any) => prev.slice(1, prev.length));
    }
  }, [bidData]);

  return (
    <>
      <SideBar path="/cpu" />
      <Header title="Server Activity - CPU" newDate={newDate} setNewDate={setNewDate} />

      <div id="wrapper" style={{
        position: "relative",
      }}>
      <div className="content-area" style={{
        width: "30%",
        position: "absolute",
        right: "2.5rem",
        top: "-1rem"
      }}>
        <div className="box">
        <RadialBar title={"Cpu Speed"} titleColor={"#965ff3"} data={cpuSpeed} multiple={true} />
        </div>
      </div>
        <div className="content-area" style={{
          width: "50%"
        }}>
          <div className="box">
            <Area title={"Cpu Speed"} titleColor={"#965ff3"} colorData={["#b57021"]} data={bidData} />
          </div>
        </div>
        <div className="content-area" style={{
          width: "30%",
          position: "absolute",
          right: "2.5rem",
          marginTop: "0rem"
        }}>
          <div className="box">
          <RadialBar title={"Cpu Temp"} titleColor={"#965ff3"} data={cpuState} multiple={false} />
          <CoresTemp data={cpuState.cores} />
          </div>
        </div>
        <div className="content-area" style={{
          width: "50%",
        }}>
          <div className="box">
            <Column data={[
              {
                value: cache.value,
                time: cache.time
              }
            ]} />
          </div>
        </div>
        <div className="content-area" style={{
          width: "30%",
        }}>
          <div className="box">
            <Pie title={"Cpu Current Process Load"} data={process} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  dotenv.config();
  return {
    props: {
      SERVER_URL: process.env.SERVER_URL,
    }
  };
}

export default Home;
