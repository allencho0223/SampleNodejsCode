FROM node:latest
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . .
RUN npm install
CMD [ "npm", "start" ]