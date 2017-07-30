From node:boron

#create app directory
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ./package.json /app
COPY ./server.js /app
COPY ./config /app/config
COPY ./node_modules /app/node_modules
COPY ./tests /app/tests


CMD [ "node", "server.js" ]
