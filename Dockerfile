FROM node:alpine

WORKDIR /usr/scr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev:css" ]
