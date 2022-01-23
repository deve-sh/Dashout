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
	createdAt?: string;
	lastSignIn?: string;
}

export default User;
