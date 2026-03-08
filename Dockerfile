FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
# Cache bust: v3-zoning-engine-20260308
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
