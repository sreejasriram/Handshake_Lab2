let mysql = require('mysql');

  //   let connection = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: '5655',
  //   database: 'mydb'
  // });
  let connection = mysql.createConnection({
    host: 'mydb.cms4tddf5n2p.us-east-2.rds.amazonaws.com',
    user: 'root',
    port: '3306',
    password: '56555655',
    database: 'mydb'
  });
  
 connection.connect(function(err) {
    if (err) {
        callback(err.message) 
    }else
    console.log('Connected to the MySQL server.');
  });



module.exports = connection
  