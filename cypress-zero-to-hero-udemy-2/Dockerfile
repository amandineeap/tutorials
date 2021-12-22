FROM cypress/base:14.17.0

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN yarn add -D cypress

RUN $(yarn bin)/cypress verify

RUN ["yarn", "run", "cypress:e2e"]