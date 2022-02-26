const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "brightai",
    database: "category_database",
    host: "localhost",
    port: 5432
})


module.exports = pool;
