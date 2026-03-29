FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
# RAILWAY_GIT_COMMIT_SHA changes every deploy - busts cache for COPY layers below
ARG RAILWAY_GIT_COMMIT_SHA=unknown
RUN echo "Building commit: $RAILWAY_GIT_COMMIT_SHA"
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
