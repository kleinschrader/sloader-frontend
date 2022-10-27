FROM node:lts-alpine3.16 AS builder

WORKDIR /usr/app

COPY . .

RUN npm install 
RUN npm run build

FROM nginx:1.23.2-alpine

COPY --from=builder /usr/app/build/. /usr/share/nginx/html