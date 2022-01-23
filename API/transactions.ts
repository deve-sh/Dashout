import db from "../firebase/firestore";

export const getUserTransactions = async (
	userId: string,
	startAfter: any,
	callback: (errorMessage: string, transactionList: any[]) => any
) => {
	try {
		let transactionsRef = db
			.collection("transactions")
			.where("user", "==", userId);
		if (startAfter) transactionsRef = transactionsRef.startAfter(startAfter);
		transactionsRef = transactionsRef.orderBy("createdAt", "desc").limit(10);
		return callback(null, (await transactionsRef.get()).docs);
	} catch (err) {
		console.log(err);
		return callback(err.message, []);
	}
};
