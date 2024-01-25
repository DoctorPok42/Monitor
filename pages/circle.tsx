import { useEffect, useState } from "react";
import { Header, Pie, SideBar } from "../components";
import { getProcess } from "../utils/functions";

export const Circle = () => {
  const [newDate, setNewDate] = useState<string>(new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
  }));

  const [process, setProcess] = useState<any>([{
    value: 1,
    label: "User"
  },
  {
    value: 1,
    label: "System"
  }]);

  useEffect(() => {
    const interval = setInterval(() => {
      getProcess(setProcess);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SideBar path="/circle" />
      <Header title="Server Activity - Circle" newDate={newDate} setNewDate={setNewDate} />

      <div id="wrapper" style={{
        position: "relative",
      }}>
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

export default Circle;
