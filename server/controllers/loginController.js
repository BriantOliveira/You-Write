// let express = require('express');
// const User = require('./../models/user');
// const Auth = require('./auth');
// const app = express();
//
// module.exports = function (app) {
//
//   //LogOut
//     app.get('/logout', function(req, res, next) {
//         res.clearCookie('nToken');
//         res.redirect('/');
//     });
//
//     // LOGIN FORM
//     app.get('/login', function(req, res, next) {
//         res.render('login');
//     });
//
//     // LOGIN
//     app.post('/login/now', function(req, res, next) {
//         User.findOne({ username: req.body.username }, "+password", function (err, user) {
//             if (!user) { return res.status(401).send({ message: 'Wrong username or password' }) };
//             user.comparePassword(req.body.password, function (err, isMatch) {
//                 if (!isMatch) {
//                     return res.status(401).send({ message: 'Wrong username or password' });
//                 }
//
//                 var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//                 res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//
//                 res.redirect('/');
//             });
//         })
//     });
// };