# Dockerfile for React client

# Build react client
FROM node:18.17.0-alpine3.18

# Working directory
WORKDIR /src

COPY package*.json ./

### Installing dependencies

RUN npm ci

# copy local files to app folder
COPY . .

EXPOSE 4000

CMD ["yarn", "dev"]