FROM node:20-alpine
WORKDIR /app
COPY . .

RUN npm install

CMD ["node", "node_modules/@ndsk/ndsk/index.js"]