# Dockerfile for React client

# Build react client
FROM node:14.20.1-alpine

# Working directory
WORKDIR /src

COPY package*.json ./

### Installing dependencies

RUN npm ci

# copy local files to app folder
COPY . .

EXPOSE 3015

CMD ["yarn", "dev"]