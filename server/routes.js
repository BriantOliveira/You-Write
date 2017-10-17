// let app = require('express');
// const Comment = require('./models/comment');
// const Article = require('./models/article');
// const User = require('./models/user');
//
// module.exports = function (app) {
// // **************************** COMMENT ******************************
//
//
//     app.post('/article/new/:articleId', function (req, res) {
//         // INSTANTIATE INSTANCE OF MODEL
//         let comment = new Comment(req.body);
//         comment.author = req.user.username;
//         //SAVE INSTANCE OF ARTICLE MODEL TO DB
//         Article.findById(req.params.id).exec(function (err, article) {
//             if (err) {
//                 console.error(err);
//             }
//             // UNSHIFT A NEW COMMENT
//             article.comments.unshift(req.body);
//             // Save the parent
//             Article.save();
//             // REDIRECT TO THE ROOT
//             return res.redirect('/article-show');
//         });
//     });
//
//     app.get('/article/:id/comments', function (req, res, next) {
//         Article.findById(req.params.id).exec(function (err, article) {
//             let comment = article.comment.id(req.params.id);
//             res.render('article-show', { comment: comment })
//         });
//     });
//

