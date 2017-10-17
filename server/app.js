// Calling all dependencies
const express = require('express');

const port = process.env.PORT || 8080;
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bluebird = require('bluebird');
const shallow = require('enzyme');
const jquery = require('jquery');
//const router = express.router();

const app = express();

//const routes = require('./routes');
require('express-debug');

//Connecting the database
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/discover-u-write', {useMongoClient: true});
console.log("You are connected to the database...");



let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});

//Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));
// app.set('views', path.join(__dirname, 'views'));

//Setting up engine template
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// AUTH

var checkAuth = function (req, res, next) {
  console.log('Checking for Authentication...');

  if(typeof req.cookies.nToken === 'undefined'|| req.cookies.nToken === null) {
      req.user = null;
  } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
  }

  next();
};

// Cookies
app.get('/cookies', function(req, res) {
    var currentUser = req.user;

    Article.find().exec(function (err, article) {
        res.render('article-index', {article: article, currentUser: currentUser});
    });
});
// INDEX
    app.get('/', function (req, res) {
        res.render('article-index');
    });

//LogOut
app.get('/logout', function(req, res, next) {
    res.clearCookie('nToken');
    res.redirect('/');
});

// LOGIN FORM
app.get('/login', function(req, res, next) {
    res.render('login');
});

// LOGIN
app.post('/login/now', function(req, res, next) {
    User.findOne({ username: req.body.username }, "+password", function (err, user) {
        if (!user) { return res.status(401).send({ message: 'Wrong username or password' }) };
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Wrong username or password' });
            }

            var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

            res.redirect('article-new');
        });
    })
});


// NOT FOUND PAGE
// app.get('/error', (req, res)=>{
//     res.render('error-page')
// });

//Auth Routes
    require('./controllers/auth')(app);

// User Routes
    require('./controllers/usercontroller')(app);

// Article Routes
    require('./controllers/articleController')(app);

// Comment Routes
    require('./controllers/commentController')(app);

// app.get('/', function(req, res, next) {
//
//     /* ... */
//
//     //Author search
//     if(req.query.author !== undefined) {
//         /* ... */
//         if(authorsPosts.length===0) {
//             res.render(/*...*/);
//         } else {
//             res.render(/*...*/);
//         }
//         /* ... */
//     }
//     //Tag search
//     else if(req.query.filter !== undefined) {
//         /* ... */
//         if(taggedPosts.length===0) {
//             res.render(/*...*/);
//         } else {
//             res.render(/*...*/);
//         }
//         /* ... */
//     }
//     //or just latest
//     else {
//         res.render(/*...*/);
//     }
// });

server.listen(port, function() {
    console.log("App is running on port " + port);
});