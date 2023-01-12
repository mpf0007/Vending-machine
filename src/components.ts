export class MainError {
	message: string;
	detail: { coin: number };
	constructor(message: string, coin: number) {
		this.message = message;
		this.detail = { coin: coin };
	}
}
