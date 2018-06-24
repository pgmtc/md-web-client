FROM node:8-alpine
WORKDIR /usr/src/app

COPY . .
#RUN npm install
RUN npm run build
RUN npm prune --only=production

RUN rm -rf build
RUN rm -rf src

EXPOSE 8080
CMD [ "npm", "start" ]
