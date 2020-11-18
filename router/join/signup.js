var express = require("express");
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : '1234',
  database : 'nodejs'
});
connection.connect();

router.get('/', function(req, res) {  
  res.sendFile(path.join(__dirname, '../../public/join.html'));  
});

router.post('/', function(req, res) {
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var password = body.password;  

  var query = connection.query(`insert into user (email,name,pw) 
    values ("${email}", "${name}", "${password}")`, 
      function(err, rows) {
        if(err) { throw err; } 
        else {
          rows.
          res.render('welcome.ejs', {'name': name});
        }
      });
});

module.exports = router;