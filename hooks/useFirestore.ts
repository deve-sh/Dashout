import { useEffect, useRef, useState } from "react";
import db from "../firebase/firestore";

const useFirestore = (docPath) => {
	let [docData, setDocData] = useState({
		fetching: true,
		error: null,
		data: null,
	});
	let subscriptionRef = useRef(null);

	useEffect(() => {
		if (!docPath) return;

		let ref = db.doc(docPath);
		subscriptionRef.current = ref.onSnapshot(
			(doc) => {
				const newDocData = { fetching: false, error: null, data: doc.data() };
				setDocData(newDocData);
			},
			(error) => setDocData({ fetching: false, error, data: null })
		);

		return () => {
			if (subscriptionRef.current instanceof Function)
				subscriptionRef.current(); // Unsubscribe from document's real-time updates.
		};
	}, [docPath]);

	return docData;
};

export default useFirestore;
