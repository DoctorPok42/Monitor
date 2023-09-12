import { useEffect, useState } from "react";
import { SideBar, RadialBar, CoresTemp, Column, Area, Header, Pie } from "../components";
import { getCache, getTemp, getSpeed, getProcess } from "../utils/functions";

export const Home = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      getCache(setCache);
      getTemp(setCpuState);
      getSpeed(setBidData, setCpuSpeed);
      getProcess(setProcess);
    }, 1000);
    return () => clearInterval(interval);
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

export default Home;
