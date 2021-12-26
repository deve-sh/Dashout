interface User {
	uid: string;
	email: string;
	displayName: string;
	providerInfo?: any;
	emailVerified?: boolean;
	phoneNumber?: string;
	photoURL?: string;
	disabled?: boolean;
}

export default User;
