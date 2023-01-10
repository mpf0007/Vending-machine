FROM node:16
WORKDIR /usr/src/vending_machine
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]