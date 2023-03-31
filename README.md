## Description
MERN stack chat application build with Typescript & Socket.IO

## Installation

```bash
$ npm install or yarn install
```

## Running the app

```bash
$ npm run dev
```

## Deployment
- Install docker on machine ( if using ec2 instance ): https://docs.docker.com/engine/install/ubuntu/
- If linux: goes through post installation step: https://docs.docker.com/engine/install/linux-postinstall/
- If window: goes through post installation step: https://docs.docker.com/desktop/install/windows-install/
- Fill .env information

```bash
$ scripts/deployment/production/start.sh
```
- Stop running deployment:

```bash
$ scripts/deployment/production/stop.sh
```
