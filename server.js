var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_b3d83sdk:ucmpo29e9rokm345g6e631ffcq@ds061415.mongolab.com:61415/heroku_b3d83sdk');
//heroku mongodb://<heroku_mb4b83hr>:<3a412be7>@ds043324.mongolab.com:43324/heroku_mb4b83hr
//MONGOLAB_URI: mongodb://heroku_b3d83sdk:ucmpo29e9rokm345g6e631ffcq@ds061415.mongolab.com:61415/heroku_b3d83sdk    



/* call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});

*/

/*var db = null;

 MongoClient.connect("mongodb://localhost:27017/heroku-dev", function(err, db) {
	if(!err) {
		console.log("We are connected");
	}
});*/
//var collection = db.collection('users');

//var list = collection.find().toArray(function(err, items) {});



app.use(bodyParser.json());
/*app.use(bodyParser.urlencoded({
	extended: true
}));*/

// set the port of our application
// process.env.PORT lets the port be set by Heroku

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/teste', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});


app.get('/', function(req, res){
	res.send('API do Ismael');
});

app.get('/all-users', function(req, res){
	if(req.query){
		console.log(req.query);
	}

var User = mongoose.model('user',  require(__dirname + '/user'));

var users = User.find(function(err, users) {
  if (err) throw err;

  res.send(users);
});
	
});


app.get('/get-recipes', function(req, res){
	if(req.query){
		console.log(req.query);
	}

var Ingredients = mongoose.model('ingredients', require(__dirname + '/ingredient'));


var ingredients = Ingredients.find(function(err, ingredients) {
		if (err) throw err;
		res.send(ingredients);
});
	
});

app.post('/login', function(req, res){

	if(req.body){
		var User = mongoose.model('user',  require(__dirname + '/user'));
		var user = new User(req.body);
		User.findOne({ 'username': user.username }, function (err, person) {
			if (err) return handleError(err);

  			if(person.username === user.username && person.password === user.password){
  				res.send("OK");
  			}else {
  				res.status(404).send('Invalid User or Password');
  			}

		});
	}

});


app.post('/cadastrar-receita', function(req, res){

var Ingredients = mongoose.model('ingredients', require(__dirname + '/ingredient'));


var ingredients = new Ingredients(req.body);

if(!ingredients.description && !ingredients.ingredients){
	res.status(404).send('Invalid Recipe');
}


ingredients.validation (function(err, validation){
	if(err) throw err;
});

ingredients.save(function(err, ingredients) {
  if (err) throw err;
  res.json(ingredients);
});

});


app.post('/cadastrar', function(req, res){

	/*if(req.body){
		res.send('nome digitado: ' + req.body.nome);
	}*/

var User = mongoose.model('user', require(__dirname + '/user'));


var user = new User(req.body);

if(!user.username && !user.password){
	res.json("Error");
}


user.save(function(err, user) {
  if (err) throw err;
  res.json(user);
});

});

server.listen(process.env.PORT || 3000);