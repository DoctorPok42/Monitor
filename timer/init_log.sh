#!/bin/bash

# check if program is running in sudo
if [ "$EUID" -ne 0 ]
  then echo "Please run with sudo"
  exit
fi

# Check if python3 is installed
if ! [ -x "$(command -v python3)" ]; then
  echo 'Error: python is not installed.' >&2
  echo "Installing python and pip"
  sudo apt install python3
  sudo apt install python3-pip
  echo "Done"
  exit 1
fi

# Create Folder and file
echo "Creating folder and file"
sudo mkdir /var/log/worker && sudo touch /var/log/worker/requirements.txt
echo "Done"

# Copy files to the folder
echo "Copying files to the folder"
sudo cp ../worker/main.py /var/log/worker/main.py
sudo cp ../worker/requirements.txt /var/log/worker/requirements.txt
sudo cp ../worker/conf.json /var/log/worker/conf.json
echo "Done"

# Install dependencies
echo "Installing dependencies"
pip3 install -r /var/log/worker/requirements.txt
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
  echo "* * * * * python3 /var/log/worker/main.py >> /var/log/worker/log.log 2>/var/log/worker/error.log" >> mycron
  crontab mycron
  rm mycron
  crontab -l
  echo "Done"
fi

echo "Installation complete"
