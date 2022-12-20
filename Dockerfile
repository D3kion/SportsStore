FROM node:lts

RUN mkdir -p /usr/src/sports-store

COPY dist/sports-store /usr/src/sports-store/dist/sports-store
COPY server /usr/src/sports-store/server/
COPY package.deploy.json /usr/src/sports-store/package.json

WORKDIR /usr/src/sports-store

RUN npm i

EXPOSE 80
CMD ["npm", "start"]
