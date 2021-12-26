import mysql from "mysql";

var connection;

const connect = () => {
	if (!connection) {
		connection = mysql.createConnection(
			process.env.PSCALE_DB_CONNECTION_STRING || {
				host: process.env.PSCALE_DB_HOST,
				user: process.env.PSCALE_DB_USERNAME,
				password: process.env.PSCALE_DB_PASS,
				database: process.env.PSCALE_DB_NAME,
			}
		);
		connection.connect();
	}

	return connection;
};

export default connect();
