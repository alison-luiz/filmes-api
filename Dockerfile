FROM node:16

WORKDIR /app
COPY . ./

COPY ./tsconfig*.json ./
COPY ./package.json ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]