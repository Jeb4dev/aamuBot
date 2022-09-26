FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build-ts

CMD ["npm", "start"]
