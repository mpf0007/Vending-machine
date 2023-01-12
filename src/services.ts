import { ProductCode, ProductPrice, Machine } from "./types";
import { MainError } from "./components";

export class VendorMachine {
	private static instance: VendorMachine;
	machines: Machine[];

	private constructor(machineNumbers: number) {
		this.machines = [];
		this.initMachines(machineNumbers);
	}

	public static getInstance(machineNumbers: number): VendorMachine {
		if (!VendorMachine.instance) {
			VendorMachine.instance = new VendorMachine(machineNumbers);
		}

		return VendorMachine.instance;
	}

	public handle(productNum: number, coin: number): Promise<string> {
		try {
			this.checkProduct(productNum, coin);
			const machineId = this.findNotBusyMachine();
			return this.getProduct(machineId, productNum);
		} catch (error) {
			throw error;
		}
	}

	private initMachines(machineNumbers: number) {
		for (let i = 0; i < machineNumbers; i++) {
			this.machines.push({
				id: i + 1,
				busy: false,
			});
		}
	}

	private checkProduct(productNum: number, coin: number) {
		const product = ProductCode[productNum];
		const price = ProductPrice[coin];

		if (price != product) {
			const shouldPay =
				productNum == ProductCode.Coffee
					? ProductPrice.Coffee
					: ProductPrice.Coca;
			throw new MainError(
				`\nFor ${product}, you should pay ${shouldPay} , but you pay ${coin}\n`,
				coin
			);
		}
	}

	private findNotBusyMachine(): number {
		let finded = false;
		let findedMachineId = 0;
		while (!finded) {
			for (let i = 0; i < this.machines.length; i++) {
				if (!this.machines[i].busy) {
					finded = true;
					findedMachineId = this.machines[i].id;
					break;
				}
			}
		}
		return findedMachineId;
	}

	private getProduct(machineId: number, productNum: number): Promise<string> {
		this.machines[machineId - 1].busy = true;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.machines[machineId - 1].busy = false;
				resolve(ProductCode[productNum]);
			}, 10000);
		});
	}
}
