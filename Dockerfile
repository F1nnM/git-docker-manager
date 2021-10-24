FROM docker/compose:1.29.2

WORKDIR /app

RUN apk add --update nodejs npm
RUN apk --no-cache add curl

RUN apk add git

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]