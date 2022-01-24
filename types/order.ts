export interface OrderItem {
	name: string;
	desc?: string;
	externalId: string;
	pricePerUnit: number;
	quantity: number;
}
