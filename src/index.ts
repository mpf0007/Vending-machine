import { stdin as input, stdout as output } from "node:process";
import { coinValidation, productValidation } from "./utils";
import { VendorMachine } from "./services";
import * as readline from "node:readline";
import { MainError } from "./components";
import { ProductCode } from "./types";
const NUMBER_OF_MACHINES = 6;

// create a cli input and output for user interaction
const rl = readline.createInterface({ input, output });
rl.on("close", function () {
	console.log("\n\x1b[31m", "Good Bye !", "\x1b[0m");
});

async function init() {
	try {
		// get coin from user and validate machine standard acceptance token if not get user back his money
		const coin = Number(await getCoin());
		coinValidation(coin);

		// get product code from user and validate if product exist or not back his money
		const productNum = Number(await getProductNumber());
		productValidation(productNum, coin);

		const VendorMachineServices = VendorMachine.getInstance(NUMBER_OF_MACHINES);

		// check if coin is validate for choosen product or not if yes return product if not return money back
		VendorMachineServices.handle(productNum, coin).then((responseProduct) => {
			console.log("\n\x1b[32m", "=================================", "\x1b[0m");
			console.log("\n\x1b[32m", "Your Product Is Ready :", "\x1b[0m");
			console.log("\n\x1b[32m", responseProduct, "\x1b[0m");
			console.log("\n\x1b[32m", "=================================", "\x1b[0m");
		});

		console.log("------------- Machines Status -------------");
		console.log(VendorMachineServices.machines);
		console.log("-------------------------------------------");
	} catch (e: any) {
		if (e instanceof MainError) {
			console.log("\n\x1b[31m", e.message, "\x1b[0m");
			console.log(
				"\n\x1b[32m",
				`Take Your Money : ${e.detail.coin}`,
				"\x1b[0m"
			);
		} else {
			console.log(e);
		}
	} finally {
		init();
	}
}

function getCoin(): Promise<string> {
	return new Promise((resolve, reject) => {
		rl.question("\nEnter Your Coin!\n", (coin: string) => {
			return resolve(coin);
		});
	});
}

function getProductNumber(): Promise<string> {
	return new Promise((resolve, reject) => {
		rl.question(
			`\nChoose Your Product : \nCoca: ${ProductCode.Coca}  \nCoffee: ${ProductCode.Coffee}\n\n`,
			(ans) => {
				return resolve(ans);
			}
		);
	});
}

init();
