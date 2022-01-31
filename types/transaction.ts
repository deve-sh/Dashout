import type { OrderDetails } from "./order";

export interface Transaction {
	order: string;
	orderDetails: OrderDetails;
	merchant: string;
	amount: string | number;
	user: string;
	createdAt: any;
	updatedAt: any;
}
