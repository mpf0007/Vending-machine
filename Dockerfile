FROM node:16
WORKDIR /usr/src/vending_machine
COPY . .
RUN npm install
CMD ["npm","start"]