FROM node:14.15.3-alpine

WORKDIR /app

EXPOSE 8080

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY static static

RUN npm install
RUN npm run frontend

COPY . .

CMD [ "node", "index.js" ]