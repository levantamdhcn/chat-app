#vi Dockerfile
FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY . .

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

COPY clients/build /usr/share/nginx/html

ENTRYPOINT [ "nginx" , "-g" , "daemon off;" ]