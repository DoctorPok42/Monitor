export function getFiles(setFileData: any) {
  try {
    fetch("/api/file", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
          setFileData(
            data[0].map((item: any) => {
              return {
                name: item.fs,
                size: item.size / 1000000000,
                used: item.used / 1000000000,
                use: item.use,
              };
            }
          )
        );
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function getCache(setCache: any) {
  try {
    fetch("/api/cache", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        const value = Object.values(data[0])
        const time = Object.keys(data[0])
        const newData = { value, time };
        setCache(newData);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function getTemp(setCpuState: any) {
  try {
    fetch("/api/temp", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        setCpuState({series: [data[0].main], cores: data[0].cores});
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function getSpeed(setBidData: any, setCpuSpeed: any) {
  try {
    fetch("/api/speed", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        const cpuSpeed = [{
          value: data[1].avg * 10,
        },
        {
          value: data[1].min * 10,
        },
        {
          value: data[1].max * 10,
        },
        ];
        setCpuSpeed(cpuSpeed)
        const speed = data[0].speed
        var time = new Date().toLocaleTimeString();
        time = time.split(":")[0] + "h" + time.split(":")[1] + ":" + time.split(":")[2].split(" ")[0]
        const newData = { speed, time };
        setBidData((prev: any) => [...prev, newData]);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function getProcess(setProcess: any) {
  try {
    fetch("/api/process", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        setProcess([{
          value: parseFloat(data[0].currentLoadUser.toFixed(2)),
          label: "User",
        },
        {
          value: parseFloat(data[0].currentLoadSystem.toFixed(2)),
          label: "System",
        }]);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function getServerInfos(setServerInfos: any) {
  try {
    fetch("/api/server", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        setServerInfos(data[0]);
      });
    });
  } catch (error) {
    console.log(error);
  }
}