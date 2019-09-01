FROM node:10.14.2
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node bin/www
EXPOSE 8088

