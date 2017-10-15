let app = require('express');
const Comment = require('./models/comment');
const Article = require('./models/article');
const User = require('./models/user');

module.exports = function (app) {
// **************************** COMMENT ******************************


    app.post('/article/:id/comments', function (req, res) {
        //SAVE INSTANCE OF ARTICLE MODEL TO DB
        Article.findById(req.params.id).exec(function (err, article) {
            // INSTANTIATE INSTANCE OF MODEL
            let comment = new Comment(req.body);
            comment.author = req.user.username;
            // UNSHIFT A NEW COMMENT
            comment.comments.unshift(req.body);
            // Save the parent
            Article.save();
            // REDIRECT TO THE ROOT
            return res.redirect('/article/' + article._id);
        });
    });

    app.get('/article/:id/comments', function (req, res) {
        Article.findById(req.params.id}).populate.('comments').(function (err, comment) {
            console.log(comment);
            res.render('article-show', { comment: comment})
        }
    });

};