import mysql from "mysql";

var connection = mysql.createConnection({
	host: process.env.PSCALE_DB_HOST,
	user: process.env.PSCALE_DB_USERNAME,
	password: process.env.PSCALE_DB_PASS,
	database: process.env.PSCALE_DB_NAME,
});

connection.connect();

export default connection;
