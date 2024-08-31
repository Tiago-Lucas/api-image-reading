# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /api-image-reading
COPY . .

RUN rm -rf node_modules
RUN npm i

CMD ["npm","run","dev"]

EXPOSE 5002