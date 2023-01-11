// attach env variables to process object
import dotenv from "dotenv";
dotenv.config();
const { PRICE_OF_COFFEES, PRICE_OF_COCA } = process.env;

// create a cli input and output for user interaction
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
const rl = readline.createInterface({ input, output });

rl.on("close", function () {
	console.log("\n\x1b[31m", "Good Bye !", "\x1b[0m");
});

enum ProductCode {
	Coffee = 11,
	Coca = 12,
}

enum ProductPrice {
	Coffee = Number(PRICE_OF_COFFEES),
	Coca = Number(PRICE_OF_COCA),
}

function returnProduct(productNum: number, coin: number) {
	const product = ProductCode[productNum];
	const price = ProductPrice[coin];

	if (price != product) {
		const shouldPay = productNum < 12 ? ProductPrice.Coffee : ProductPrice.Coca;
		console.log(
			"\n\x1b[31m",
			`\nFor ${product}, you should pay ${shouldPay} , but you pay ${coin}\n`,
			"\x1b[0m"
		);

		console.log("\n\x1b[32m", `Take Your Money : ${coin}`, "\x1b[0m", "\n");
	} else {
		console.log("\n\x1b[32m", product, "\x1b[0m");
	}

	init();
}

async function coinValidation(coin: number) {
	if (!ProductPrice[coin]) {
		console.log(
			"\n\x1b[31m",
			`Please Enter a valid Coin:\n ${ProductPrice.Coca} for Coca\n ${ProductPrice.Coffee} for Coffee`,
			"\x1b[0m"
		);

		console.log("\n\x1b[32m", `Take Your Money : ${coin}`, "\x1b[0m");
		await init();
	}
}

async function productValidation(pNumber: number, coin: number) {
	if (!ProductCode[pNumber]) {
		console.log(
			"\n\x1b[31m",
			`"\nChoose Your Product : \nCoffee: ${ProductCode.Coffee} \nCoca: ${ProductCode.Coca}\n"`,
			"\x1b[0m"
		);

		console.log("\n\x1b[32m", `Take Your Money : ${coin}`, "\x1b[0m");

		await init();
	}
}

function getCoin() {
	return new Promise((resolve, reject) => {
		rl.question("\nEnter Your Coin!\n", (coin: string) => {
			return resolve(coin);
		});
	});
}

function getProductNumber() {
	return new Promise((resolve, reject) => {
		rl.question(
			`\nChoose Your Product : \nCoca: ${ProductCode.Coca}  \nCoffee: ${ProductCode.Coffee}\n\n`,
			(ans) => {
				return resolve(ans);
			}
		);
	});
}

async function init() {
	// get coin from user and validate machine standard acceptance token if not get user back his money
	const coin = await getCoin();
	await coinValidation(Number(coin));

	// get product code from user and validate if product exist or not back his money
	const productNum = await getProductNumber();
	await productValidation(Number(productNum), Number(coin));

	// check if coin is validate for choosen product or not if yes return product if not return money back
	returnProduct(Number(productNum), Number(coin));
}

init();
