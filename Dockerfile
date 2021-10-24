FROM docker:20

WORKDIR /app

RUN apk add --update nodejs npm
RUN apk --no-cache add curl

RUN apk add git

RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]