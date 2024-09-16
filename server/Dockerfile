# Dockerfile for React client

# Build react client
FROM node:16.17.0-alpine3.16

# Working directory
WORKDIR /src

COPY package*.json ./

### Installing dependencies

RUN npm i

# copy local files to app folder
COPY . .

EXPOSE 4000

CMD ["yarn", "dev"]