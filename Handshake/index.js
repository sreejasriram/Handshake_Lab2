var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser')
var student = require('./backend/Route/Student_Route');
var company = require('./backend/Route/Company_Route');
var session = require('express-session');
var cors = require('cors');
var port = 3001;
var app = express();

//use cors to allow cross origin resource sharing
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//use cors to allow cross origin resource sharing
// / app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
 app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use('/student', student);
app.use('/company', company);
app.listen(port);
console.log("Server Listening on port 3001");
module.exports = app;


