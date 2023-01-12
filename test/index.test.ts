import { coinValidation, productValidation } from "../src/utils";
import { ProductCode, ProductPrice } from "../src/types";
import { VendorMachine } from "../src/services";
const NUMBER_OF_MACHINES = 6;

describe("Coin Validation", () => {
	test("Test Invalid Coin", () => {
		try {
			coinValidation(100);
		} catch (e: any) {
			expect(e.message).toBe(
				`Please Enter a valid Coin:\n ${ProductPrice.Coca} for Coca\n ${ProductPrice.Coffee} for Coffee`
			);
		}
	});

	test("Test Valid Coin", () => {
		expect(coinValidation(ProductPrice.Coca)).toBe(void 0);
		expect(coinValidation(ProductPrice.Coffee)).toBe(void 0);
	});
});

describe("Product Validation", () => {
	test("Test Invalid Product", () => {
		try {
			productValidation(5, 100);
		} catch (e: any) {
			expect(e.message).toBe(
				`"\nChoose Your Product : \nCoffee: ${ProductCode.Coffee} \nCoca: ${ProductCode.Coca}\n"`
			);
		}
	});

	test("Test Valid Product", () => {
		expect(productValidation(ProductCode.Coca, 1)).toBe(void 0);
		expect(productValidation(ProductCode.Coffee, 1)).toBe(void 0);
	});
});

describe("Vending Machine Service", () => {
	const VendorMachineServices = VendorMachine.getInstance(NUMBER_OF_MACHINES);

	test("Test Initials Machines", () => {
		expect(VendorMachineServices.machines.length).toEqual(NUMBER_OF_MACHINES);
	});

	test("Test Not Compatible Product With Coin", async () => {
		try {
			await VendorMachineServices.handle(ProductCode.Coca, ProductPrice.Coffee);
		} catch (e: any) {
			expect(e.message).toBe(
				`\nFor ${ProductCode[2]}, you should pay ${ProductPrice.Coca} , but you pay ${ProductPrice.Coffee}\n`
			);
		}
	});

	test("Test Compatible Product With Coin", async () => {
		const responseProduct = await VendorMachineServices.handle(
			ProductCode.Coffee,
			ProductPrice.Coffee
		);
		expect(VendorMachineServices.machines[0].busy).toEqual(false);
		expect(responseProduct).toEqual("Coffee");
	});
});
