import { ProductCode, ProductPrice } from "./types";
import { MainError } from "./components";

export function coinValidation(coin: number): void {
	if (!ProductPrice[coin]) {
		throw new MainError(
			`Please Enter a valid Coin:\n ${ProductPrice.Coca} for Coca\n ${ProductPrice.Coffee} for Coffee`,
			coin
		);
	}
}

export function productValidation(pNumber: number, coin: number): void {
	if (!ProductCode[pNumber]) {
		throw new MainError(
			`"\nChoose Your Product : \nCoffee: ${ProductCode.Coffee} \nCoca: ${ProductCode.Coca}\n"`,
			coin
		);
	}
}
