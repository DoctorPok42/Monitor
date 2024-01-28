from json import load, dump
from os import path, mkdir
from datetime import datetime


if not path.exists("./save/last-hour/"):
    mkdir("./save/last-hour/")
    print(f"{datetime.now()} - [INFO] - Directory created (./save/)")


class Tidy:
    def __init__(self) -> None:
        self.date = datetime.now().strftime("%H")
        self.path = "./log_worker.json"
        self.path_to_save = "./save/last-hour/"
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


if __name__ == "__main__":
    main()
