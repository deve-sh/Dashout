import connection from "./index";

const query = (queryString, params = undefined) =>
	new Promise<{ error?: any; results?: any[] }>((resolve) => {
		const callback = (error, results, fields) => {
			const returnValue = { error, results, fields };
			resolve(returnValue);
		};
		connection.query(
			queryString,
			params || callback,
			params ? callback : undefined
		);
	});

export default query;
