const mysql  = require('mysql');
const connection = mysql.createConnection({
  host: process.env.HOST,
  user:'root',
  password : '',
  database : process.env.DATABASE
});

connection.connect((err)=>{
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;