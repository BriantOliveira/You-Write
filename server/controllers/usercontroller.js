let express = require('express');
const User = require('./../models/user');
const app = express();

module.exports = function (app) {

// **************************** USER ******************************

// User Routes
    app.get('/user', function (req, res) {
        //res.send("Its working");
        res.render('user-new', {});
    });
// Creating an user
    app.post('/user/new', function (req, res) {
        User.create(req.body, function (err, user) {
            console.log(req.body);
            res.render('article-index', {user: user})
        });
    });
};

// // User update
//     app.put('/user', function (req, res) {
//         res.send('Got a PUT request at /user');
//     });
// // User Delete
//     app.delete('/user', function (req, res) {
//         res.send('Got a DELETE request at /user');
//     });
//