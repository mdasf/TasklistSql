// const mongoose = require("mongoose");
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
//
// };
// const pg = require("pg");
// pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
//   database: "tasklist",
// });
// const connectDB = async () => {
//   return mysql.createPool(process.env.DATABASE_URL);
// };

const mysql = require("mysql2/promise");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tasklist",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the pool for reuse in other parts of the application
module.exports = pool;

// module.exports = connectDB;
