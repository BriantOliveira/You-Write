// Calling all dependencies
const express = require('express');

const port = process.env.PORT || 8080;
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');

const app = express();

const routes = require('./routes');


//Connecting the database
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/discover-u-write', {useMongoClient: true});
console.log("You are connected to the database...");


//Setting up engine template
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});



// View Engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

// Import Routes
app.set('/', routes);


// INDEX
app.get('/', function (req, res) {
    res.render('article-index');
});

// User Routes
require('./controllers/usercontroller')(app);

// Article Routes
require('./controllers/articleController')(app);



app.listen(port);
console.log('You are connected to ' + port);

