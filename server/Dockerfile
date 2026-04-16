FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci || npm install

COPY tsconfig.json ./
COPY src ./src

ENV NODE_ENV=production
RUN npm run build

EXPOSE 4000
CMD ["node", "dist/index.js"]

