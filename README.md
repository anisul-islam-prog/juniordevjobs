# Junior devjobs
Using API services of GitHub jobs and filtering jobs for entry level jobs.

## Requirements:

```
> Node
> Redis-server
```

## Install Packages:
```
npm i
```

## How to run:

#### Start Redis-server 
Open terminal and run the following code:

```
$ sudo service redis-server start
```

#### Run cron to fetch jobs and store in redis-server
```
node worker/index.js
```

#### Run backend
```
node api/index.js
```

#### Run Client React App
```
cd client/
yarn start
```

## How to Deploy

#### Requirements:
```
> Domian
> Digital Ocean Droplet
> Certbot for ngnix and ssl certificate
```
#### Install redis in windows 10:

##### How do I know if I have Windows 10 with WSL?
To answer the question `Which version of Windows is my PC is running?` press your `Windows logo key + R`, type `winver,` then select OK. Starting with version 10, you’ve got a command called `wslconfig.` It lists distros you have and controls which one starts by typing `bash.` Try it out!

##### How to set up WSL!
To install Redis Windows Subsystem for Linux, follow the instructions on Microsoft Docs. The short version is: In Windows 10, Microsoft replaces Command Prompt with PowerShell as the default shell. Open PowerShell as Administrator and run this command to enable Windows Subsystem for Linux (WSL):
```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
Reboot Windows after making the change—note that you only need to do this one time.
Download and install one of the supported Linux distros from the Microsoft Store.

> Ubuntu 18.04 (installs Redis v4.09)

> Debian GNU/Linux (installs Redis v3.2.6)

Install and Test Redis
Launch the installed distro from your Windows Store and then install redis-server. The following example works with Ubuntu (you’ll need to wait for initialization and create a login upon first use):
```
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install redis-server
$ redis-cli -v
```
Start the Redis server:
```
$ sudo service redis-server start
```
Execute a simple Redis command to verify your Redis server is running and available:
```
$ redis-cli 
127.0.0.1:6379> set user:1 "Jane"
127.0.0.1:6379> get user:1
"Jane"
To stop your Redis server:
$ sudo service redis-server stop
```