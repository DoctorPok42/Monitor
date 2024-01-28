#!/bin/bash

# check if program is running in sudo
if [ "$EUID" -ne 0 ]
  then echo "Please run with sudo"
  exit
fi

# Check if python3 is installed
if ! [ -x "$(command -v python3)" ]; then
  echo 'Error: python is not installed.' >&2
  echo "Installing python3 and pip"
  sudo apt install python3
  sudo apt install python3-pip
  echo "Done"
  exit 1
fi

# Create Folders
echo "Creating folder"
sudo mkdir /var/log/worker
sudo mkdir /var/log/worker/save
sudo mkdir /var/log/worker/save/last-hour
echo "Done"

# Copy files to the folder
echo "Copying files to the folder"
sudo cp ./main.py /var/log/worker/main.py
sudo cp ./tidy_file.py /var/log/worker/tidy_file.py
sudo cp ./requirements.txt /var/log/worker/requirements.txt
sudo cp ./conf.json /var/log/worker/conf.json
echo "Done"

# Install dependencies
echo "Installing dependencies"
cd /var/log/worker/
pip3 install -r /var/log/worker/requirements.txt
cd ~
echo "Done"

# Check if cron is installed
if ! [ -x "$(command -v cron)" ]; then
  echo 'Error: cron is not installed.' >&2
  echo "Installing cron"
  sudo apt install cron
  echo "Done"
  exit 1
fi

# Check if cron is running
if ! [ -x "$(command -v cron)" ]; then
  echo 'Error: cron is not running.' >&2
  echo "Starting cron"
  sudo service cron start
  echo "Done"
  exit 1
fi

# Check if our script is already running with cron
if crontab -l | grep -q '/var/log/worker/main.py'; then
  echo "Script is already running with cron"
else
  echo "Script is not running with cron"
  echo "Creating cron task"
  crontab -l > mycron
  echo "* * * * * python3 /var/log/worker/main.py >> /var/log/worker/log.log 2>> /var/log/worker/error.log" >> mycron
  echo "59 * * * * python3 /var/log/worker/tidy_file.py >> /var/log/worker/log.log 2>> /var/log/worker/error.log" >> mycron
  crontab mycron
  rm mycron
  crontab -l
  echo "Done"
fi

echo "Installation complete"

echo "You can check the logs at /var/log/worker/log_worker.json"
echo "You can check the cron logs at /var/log/worker/log.log"
echo "You can check the errors at /var/log/worker/error_worker.json"
echo "You can check the last hour logs at /var/log/worker/save/last-hour"

echo "You can change the configuration at /var/log/worker/conf.json"
