var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const port = 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Employee");

	var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  	res.header('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range');
    res.header('Access-Control-Max-Age', 1728000);
   	res.header('Content-Type', 'text/plain; charset=utf-8');
    res.header('Content-Length', 0);
      
    if ('OPTIONS' == req.method) {
     	res.send(200);
    }
    else {
    	next();
  	}
	};

  app.use(allowCrossDomain); 

	var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    city: String,
    favourite:String,
    profile:String,
	});

	var User = mongoose.model('User', UserSchema);
	module.export = User;

  app.get('/',function(req,res){
    res.send('Hello World!')
  })

	app.post('/login', function(req, res) {
    console.log('Req body in login ')
    var username = req.body.username;
    var password = req.body.password;
    var data =  User.find();
    console.log('data is'+req.body.username);
  	User.find({username:username,password:password},function(err, isMatch) {
      console.log('ISMATCH IS: ' + isMatch)
    	if(err) {
        console.log('THIS IS ERROR RESPONSE')
      	res.json(err)
      } else {
          console.log('THIS IS ISMATCH RESPONSE');
      		res.json(isMatch);
        }
    })
  })

  app.post('/register', function(req, res, next) {

    const username = req.body.username;
    const password = req.body.password;
    const city = req.body.city;
    const favourite = req.body.favourite;
    const profile = req.body.profile;
   
    var user = new User({
      username : username,
      password : password,
      city : city,
      favourite : favourite,
      profile:profile
    });

   
    user.save(user, function(err, isMatch) {
      console.log('ISMATCH IS: ' + isMatch)
      if(err) {
        console.log('THIS IS ERROR RESPONSE')
        res.json({"status": false})
      } else {
          console.log('THIS IS ISMATCH RESPONSE')
          res.json(isMatch)  
      }
    })
  });


app.listen(3000, () => console.log(`Example app listening on port ${port}!`))
