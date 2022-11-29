FROM node:lts-alpine3.16

WORKDIR /var/www
COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000

CMD ["npm", "run", "start"]