# Monitor Worker

## Description

**This script is the base of this project!**

He is start by a cron job every minute and he will log the stats of the server in the file `/var/log/worker/log_worker.json`.

## Features

* 📊 **Log of CPU, Memory and Disk usage.** (in percent)
* 🔀 **Log of Network ports (Open or Close).** (based on config file `/var/log/worker/conf.json`)

Example of log file:

```json
{
  "2024-01-28 11:19:01": {
    "cpu": 3.0,
    "memory": 10.4,
    "disk": [5.5],
    "network": [
      {"port": 80, "status": "OPEN"},
      {"port": 443, "status": "OPEN"}
    ]
  }
}
```

## Installation

1) Put the `worker` folder in `/` (root) of your server.

2) Execute the following command in your terminal:

```bash
sudo chmod +x /worker/init_log.sh
sudo ./worker/init_log.sh
```

3) You can now delete the `worker` folder.

4) Everythings is done! The script will start every minute and log the stats of the server in the file `/var/log/worker/log_worker.json`.

## Configuration

You can change the configuration of the ports to check in the file `/var/log/worker/conf.json`.

```json
{
  "portsSlots": [80, 443, 445, 3000, 6000, 8000, 8080]
}
```

## Cron job

If by any way, you delete the cron job, you can recreate it by executing the following command in your terminal:

```bash
sudo crontab -e
```

Then add this line at the end of the file:

```bash
* * * * * python3 /var/log/worker/main.py >> /var/log/worker/log.log 2>> /var/log/worker/error.log
00 * * * * python3 /var/log/worker/tidy_file.py >> /var/log/worker/log.log 2>> /var/log/worker/error.log
```

## Logs

You can find the logs of the script in the file `/var/log/worker/log.log` and the errors in the file `/var/log/worker/error.log`.
