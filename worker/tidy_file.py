"""
Tidy file, move files to another directory and clean file
"""

from json import load, dump
from os import path, mkdir, listdir, remove, rename
from datetime import datetime
import shutil


if not path.exists("/var/log/worker/save/last-hour/"):
    mkdir("/var/log/worker/save/last-hour/")
    print(f"{datetime.now()} - [INFO] - Directory created (/var/log/worker/save/)")


class Tidy:
    """
    Tidy class
    """

    def __init__(self) -> None:
        self.date = str(int(datetime.now().strftime("%H")) - 1)
        self.path = "/var/log/worker/log_worker.json"
        self.path_to_save = "/var/log/worker/save/last-hour/"
        self._new_path = None

    def check(self, path_to_test: str) -> bool:
        """
        Check if file exists
        """

        return path.exists(path_to_test)

    def create_file(self, file_name: str) -> str:
        """
        Create file
        """

        self._new_path = self.path_to_save + file_name + ".json"

        with open(self._new_path, "w", encoding="utf-8") as file:
            dump({}, file)

        return self._new_path

    def read(self, path_to_read: str):
        """
        Read file
        """

        with open(path_to_read, "r", encoding="utf-8") as file:
            return load(file)

    def write(self, path_to_write: str, data) -> None:
        """
        Write file
        """

        with open(path_to_write, "w", encoding="utf-8") as file:
            dump(data, file)

    def clean(self) -> None:
        """
        Clean file
        """

        with open(self.path, "w", encoding="utf-8") as file:
            dump({}, file)


def move_files(path_to_save: str) -> None:
    """
    Move files to another directory and create archive
    """

    date = datetime.now().strftime("%Y-%m-%d")

    dir_name = "/var/log/worker/save/" + date + "/"

    shutil.make_archive(date, "zip", "/var/log/worker/", path_to_save)

    rename(date + ".zip", "/var/log/worker/save/" + date + ".zip")

    for file in listdir(path_to_save):
        remove(path_to_save + file)

    print(f"{datetime.now()} - [INFO] - Archive created ({dir_name})")

def main():
    """
    Main function
    """

    tidy = Tidy()

    if tidy.check(tidy.path):
        new_file = tidy.create_file(tidy.date)
        if tidy.check(new_file):
            print(f"{datetime.now()} - [INFO] - File created ({new_file})")

            data = tidy.read(tidy.path)
            tidy.write(new_file, data)
            print(f"{datetime.now()} - [INFO] - File updated ({new_file})")

            tidy.clean()
            print(f"{datetime.now()} - [INFO] - File cleaned ({tidy.path})")
        else:
            print(f"{datetime.now()} - [ERROR] - File not created ({new_file})")
    else:
        print(f"{datetime.now()} - [ERROR] - File not found ({tidy.path})")

    if tidy.date == "22":
        move_files(tidy.path_to_save)

if __name__ == "__main__":
    main()
