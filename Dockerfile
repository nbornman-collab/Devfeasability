FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
ARG CACHEBUST=20260328-1535
COPY public/ ./public/
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
