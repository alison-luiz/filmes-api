FROM node:16

WORKDIR /app
COPY . ./

COPY ./tsconfig*.json ./
COPY ./package.json ./
COPY ./.env.example ./.env

RUN yarn install

COPY . ./

EXPOSE 3000

CMD ["node", "dist/main"]