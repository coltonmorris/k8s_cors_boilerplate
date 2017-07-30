From node:boron

#create app directory
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ./package.json /app
COPY ./app.js /app

COPY ./node_modules /app/node_modules
COPY ./tests /app/tests
COPY ./config /app/config

CMD [ "node", "app.js" ]
