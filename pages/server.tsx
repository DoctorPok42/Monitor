import { useEffect, useState } from "react";
import { SideBar, Bar } from "../components";
import { getFiles, getServerInfos} from "../utils/functions";
import { Header } from "../components/";

export const Home = () => {
  const [fileData, setFileData] = useState<any>([{
    size: 1,
    used: 0,
    use: 0,
    name: ""
  }]);

  const [newDate, setNewDate] = useState<string>(new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
  }));

  const [serverInfos, setServerInfos] = useState<any>({
    hostname: "",
    type: "",
    platform: "",
    arch: "",
    release: "",
    uptime: 0,
    totalmem: 0,
    freemem: 0,
  });

  const formatUptime = (uptime: number) => {
    let days = Math.floor(uptime / 86400);
    let hours = Math.floor((uptime % 86400) / 3600);
    let minutes = Math.floor(((uptime % 86400) % 3600) / 60);

    return `${days} days, ${hours} hours and ${minutes} minutes`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getFiles(setFileData);
      getServerInfos(setServerInfos);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SideBar path="/server" />
      <Header title="Server Activity - Server" newDate={newDate} setNewDate={setNewDate} />

      <div id="wrapper" style={{
        position: "relative",
      }}>
        <div className="content-area" style={{
          width: "50%"
        }}>
          {serverInfos && (
            <div className="serverInfo">
              <div className="serverInfo__item">
                <h2 className="serverInfo__item__title">Hostname: </h2>
                <p className="serverInfo__item__value">{serverInfos.hostname}</p>
              </div>
              <div className="serverInfo__item">
                <h2 className="serverInfo__item__title">Platform: </h2>
                <p className="serverInfo__item__value">{serverInfos.platform}</p>
              </div>
              <div className="serverInfo__item">
                <h2 className="serverInfo__item__title">Arch: </h2>
                <p className="serverInfo__item__value">{serverInfos.arch}</p>
              </div>
              <div className="serverInfo__item">
                <h2 className="serverInfo__item__title">Type: </h2>
                <p className="serverInfo__item__value">{serverInfos.type}</p>
              </div>

              <div className="serverInfo__item" style={{
                  position: "absolute",
                  right: "0",
              }}>
                <h2 className="serverInfo__item__title">Free memory: </h2>
                <p className="serverInfo__item__value">{(serverInfos.freemem / 1000000000).toFixed(2)} GB</p>
              </div>
              <div className="serverInfo__item" style={{
                  position: "absolute",
                  right: "0",
                  top: "2.5rem",
              }}>
                <h2 className="serverInfo__item__title">Total memory: </h2>
                <p className="serverInfo__item__value">{(serverInfos.totalmem / 1000000000).toFixed(2)} GB</p>
              </div>

              <div className="serverInfo__item" style={{
                  position: "absolute",
                  right: "0",
                  bottom: "0rem",
              }}>
                <h2 className="serverInfo__item__title">Uptime: </h2>
                <p className="serverInfo__item__value">{(formatUptime(serverInfos.uptime))}</p>
              </div>
            </div>
          )}
        </div>
      </div>


      <div className="StorageBar">
      {
        fileData && fileData.map((data: any) => {
          return (
            <Bar title={data.name} data={data.used} use={data.use} maxValue={data.size} />
          )
        })
      }
      </div>
    </>
  );
};

export default Home;
