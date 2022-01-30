interface User {
	uid: string;
	email: string;
	displayName: string;
	providerInfo?: any;
	emailVerified?: boolean;
	phoneNumber?: string;
	photoURL?: string;
	disabled?: boolean;
	nTransactions?: number;
	totalTransactionAmount?: number;
	totalAmountRepaid?: number;
	createdAt?: string;
	lastSignIn?: string;
	canCreateMerchants?: boolean;
}

export default User;
