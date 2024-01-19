FROM node:18-alpine

RUN apk add --no-cache tzdata
ENV TZ Asia/Tehran

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json package-lock.json ./

RUN npm install --force

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 80

CMD ["node", "dist/main.js"]
