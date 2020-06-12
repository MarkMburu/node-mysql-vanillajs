const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user:'root',
  password:'',
  database:process.env.DATABASE,
  port:process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
      console.log(err.message);
  }
  // console.log('db ' + connection.state);
});


class DbService {
  static getDbServiceInstance() {
      return instance ? instance : new DbService();
  }

  async getAllData() {
      try {
          const response = await new Promise((resolve, reject) => {
              const query = "SELECT * FROM names;";

              connection.query(query, (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
              })
          });
          // console.log(response);
          return response;
      } catch (error) {
          console.log(error);
      }
  }

  async insertNewName(name){
    try{
      const dateAdded = new Date();
      let post  = {id: Math.floor(Math.random() * 10), name:name,date_added:dateAdded};
      let query = connection.query('INSERT INTO names SET ?', post, function(err, result) {
        // Neat!
        if(err) throw err
        console.log('adedd to db')
      });
      console.log(query.sql); 

      console.log(dateAdded);
      // return response
    }
    catch(error){
      console.log(error)
    }
  }


  async deleteRowById(id) {
      try {
          id = parseInt(id, 10); 
          const response = await new Promise((resolve, reject) => {
              const query = "DELETE FROM names WHERE id = ?";
  
              connection.query(query, [id] , (err, result) => {
                  if (err) reject(new Error(err.message));
                  resolve(result.affectedRows);
              })
          });
  
          return response === 1 ? true : false;
      } catch (error) {
          console.log(error);
          return false;
      }
  }

  async updateNameById(id, name) {
      try {
          id = parseInt(id, 10); 
          const response = await new Promise((resolve, reject) => {
              const query = "UPDATE names SET name = ? WHERE id = ?";
  
              connection.query(query, [name, id] , (err, result) => {
                  if (err) reject(new Error(err.message));
                  resolve(result.affectedRows);
              })
          });
  
          return response === 1 ? true : false;
      } catch (error) {
          console.log(error);
          return false;
      }
  }

  async searchByName(name) {
      try {
          const response = await new Promise((resolve, reject) => {
              const query = "SELECT * FROM names WHERE name = ?;";

              connection.query(query, [name], (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
              })
          });

          return response;
      } catch (error) {
          console.log(error);
      }
  }
}

module.exports = DbService;