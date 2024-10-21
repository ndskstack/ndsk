FROM node:latest

WORKDIR /app

COPY . .

RUN npm i

CMD ["node", "node_modules/@ndsk/ndsk/index.js"]