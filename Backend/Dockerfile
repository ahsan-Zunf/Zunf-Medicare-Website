FROM node:18

WORKDIR /app

# Pehle sirf package.json copy karein taake npm install fast ho
COPY package*.json ./

RUN npm install

# Phir baqi saara code copy karein
COPY . .

# Cloud Run by default 8080 port sunta hai
EXPOSE 8080

CMD ["node", "server.js"]