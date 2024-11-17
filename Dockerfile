FROM node:22.11.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]