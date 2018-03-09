FROM node:9.5

WORKDIR /app

ADD package.json /app/package.json
RUN npm install --silent
RUN npm install -g serve --silent

ADD . /app

CMD ["sh", "-c", "npm run build && serve -s build"]
