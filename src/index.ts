import dotenv from "dotenv";
dotenv.config();
const {
  NUMBER_OF_MACHINES,
  NUMBER_OF_COFFEES,
  NUMBER_OF_COCA,
  PRICE_OF_COFFEES,
  PRICE_OF_COCA,
} = process.env;

console.log(NUMBER_OF_COCA);
console.log(NUMBER_OF_MACHINES);
console.log(NUMBER_OF_COFFEES);
console.log(PRICE_OF_COCA);
console.log(PRICE_OF_COFFEES);
