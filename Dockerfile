FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
ARG CACHEBUST=20260329-1300
RUN echo "bust=$CACHEBUST"
COPY public/ ./public/
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
