let express = require('express');
const Comment = require('./models/comment');
const Article = require('./models/article');
const app = express();

module.exports = function (app) {
// **************************** COMMENT ******************************


    app.post('/article/:id/comments', function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        let comment = new Comment(req.body);
        //SAVE INSTANCE OF ARTICLE MODEL TO DB
        Article.findById(req.params.id).populate('comments').exec(function (err, article) {
            comment.save(function (err, comment) {
                article.comments.unshift(comment);
                article.save();
            });
            // REDIRECT TO THE ROOT
            return res.redirect('/article/' + article._id);
        });
    });


};