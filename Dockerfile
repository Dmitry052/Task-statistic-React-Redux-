FROM node:8-alpine

WORKDIR /app
COPY . .
RUN apk update && apk add git python vips-dev fftw-dev make gcc g++ --no-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/
RUN npm i
RUN npm run build
RUN mkdir logs || true
USER root
CMD ["sh", "-c", "NODE_ENV=stage node ./server.js"]
