From node:boron

#create app directory
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY ./package.json /app
COPY ./server.js /app
COPY ./Makefile /app

# RUN npm i
COPY ./node_modules /app/node_modules

CMD [ "node", "server.js" ]
