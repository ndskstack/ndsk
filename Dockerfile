
FROM node:20-alpine
WORKDIR /app
COPY . .

RUN npm install  
CMD ["node", "node_modules/@ndsk/ndsk","start"]

# or pm2 start
# RUN npm install pm2 -g && npm install  
# CMD ["pm2-runtime", "node_modules/@ndsk/ndsk","start","--pm2"]