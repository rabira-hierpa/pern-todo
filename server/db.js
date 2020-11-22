const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	password: 'rab@postgres987',
	database: 'perntodo',
	host: 'localhost',
	port: 5432,
});

module.exports = pool;
