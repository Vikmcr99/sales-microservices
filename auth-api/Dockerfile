FROM node:22
WORKDIR .
COPY package*.json ./
RUN yarn install
COPY . . 
EXPOSE 8080
CMD [ "node", "app.mjs" ]