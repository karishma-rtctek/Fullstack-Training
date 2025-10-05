// ----------- This file handles MySQL database connection setup -----------


require('dotenv').config(); // loads the ".env" variables at the very beginning

// mysql2 = it's a nodejs library used to connect with "mysql" database
// mysql2 acts as a bridge between nodejs and mysql database
// mysql2 is like a translator that converts nodejs code 
// into mysql understandable code & vice versa
// because "nodejs" speaks "javascript" and "mysql" speaks "sql" language
// So "mysql2" library helps them to communicate with each other
const mysql = require('mysql2'); 


// ----------- To create a connection of "mysql2" library with "mysql" database -----------
// createPool = it is used to create a connection only once,
// so that every time we don't have to create a new connection for every request
// It manages multiple connections for us and reuses them when needed
const mysql_db_conection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,         // the MySQL username
  password: process.env.DB_PASSWORD,         // the MySQL password
  database: process.env.DB_NAME,   // make sure this "database" exists in MySQL

  // update to actual MySQL port 
  // (if don't now the exact port then run these commands = 
  // command 1 = "mysql -u root -p"  
  // command 2 = "SHOW VARIABLES LIKE 'port';" 
  // it will show the port number in the output like this =
  // +---------------+-------+
  // | Variable_name | Value |
  // +---------------+-------+
  // | port          | 3307  |
  // +---------------+-------+

  // Number(process.env.MYSQL_PORT) = used "Number" to convert the string value coming from the ".env" file into number, 
  // as the ".env" file stores values as string and the connection pool needs port no. as number
  port: Number(process.env.MYSQL_PORT) || 3306,            
});

// To check the connection of "mysql2" library with "mysql" database is setup properly or not
// this connection checkup is done only once, when the nodejs server starts
mysql_db_conection.getConnection((err, connection) => { // err & connection = is provided by "mysql2" library
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
    connection.release();
  }
});

// module = in nodejs each file is treated as a separate module
// module = here it represents the current file (db.js)
// module.exports = it is used to make the "mysql_db_conection" object 
// which is used in this file, exportable to other files
// mysql_db_conection = it is the object created above in this file 
// (mysql_db_conection = is an object, created for making connection with mysql database)
module.exports = mysql_db_conection; 

