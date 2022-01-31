import type { OrderDetails } from "./order";

export default interface Transaction {
	id?: string;
	order: string;
	orderDetails: OrderDetails;
	merchant: string;
	amount: string | number;
	user: string;
	createdAt: any;
	updatedAt: any;
}
