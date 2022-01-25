export interface OrderItem {
	name: string;
	desc?: string;
	externalId: string;
	pricePerUnit: number;
	quantity: number;
}

export interface OrderDetails extends OrderItem {
	merchant: string;
	status: string;
}
