from json import load, dump
from os import path
from enum import Enum
from datetime import datetime
from psutil import cpu_percent, virtual_memory, disk_usage, net_connections


if not path.exists("/var/log/worker/log_worker.json"):
    with open("/var/log/worker/log_worker.json", "w", encoding="utf-8") as f:
        dump({}, f)


class PortStatus(Enum):
    """
    Enum for port status
    """

    OPEN = 1
    CLOSED = 2
    PROTECTED = 3


def get_cpu_usage():
    return cpu_percent()


def get_memory_usage():
    return float(
        round(virtual_memory()[3] / virtual_memory()[0] * 100, 1)
    )


def get_disk_usage():
    return (float(round(disk_usage("/")[3], 1)),)


def get_network_usage():
    """
    Get network usage (ports)
    """

    with open("/var/log/worker/conf.json", "r", encoding="utf-8") as conf_file:
        conf = load(conf_file)
    ports = conf["portsSlots"]
    network = []
    useds_ports = net_connections()
    for port in ports:
        network.append({"port": port, "status": PortStatus.CLOSED.name})
        for used_port in useds_ports:
            if used_port.laddr.port == port:
                network[-1]["status"] = PortStatus.OPEN.name
    return network


class Process:
    """
    Class for process
    """

    def __init__(self):
        """
        Constructor
        """

        self.cpu = get_cpu_usage()
        self.memory = get_memory_usage()
        self.disk = get_disk_usage()
        self.network = get_network_usage()

    def __str__(self):
        """
        String representation (for debug)
        """

        return print(
            f"CPU: {self.cpu}\nMemory: {self.memory}\nDisk: {self.disk}\nNetwork: {self.network}"
        )

    def get_stats(self):
        return {
            "cpu": self.cpu,
            "memory": self.memory,
            "disk": self.disk,
            "network": self.network,
        }


process = Process()


def write_log():
    """
    Write log in ./log_worker.json
    """

    with open("/var/log/worker/log_worker.json", "r", encoding="utf-8") as load_file:
        log = load(load_file)

    log.update({datetime.now().strftime("%Y-%m-%d %H:%M:%S"): process.get_stats()})

    with open("/var/log/worker/log_worker.json", "w", encoding="utf-8") as write_file:
        dump(log, write_file)


def main():
    """
    Main function
    """

    print(f"{datetime.now()} - [INFO] Starting worker...")
    write_log()
    print(f"{datetime.now()} - [INFO] Data written in /var/log/worker/log_worker.json")


if __name__ == "__main__":
    main()
