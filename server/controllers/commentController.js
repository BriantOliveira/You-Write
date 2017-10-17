const comment = require('../models/comment');
const Article = require('../models/article');

module.exports = function (app) {

// GET COMMENT SUBMITTED
    app.post('/article/:id/comments', function (req, res) {
        // var comment = new Comment(req.body);
        comment.author = req.user.username;
        //SAVING IN THE MODEL DB
        Article.findById(req.params.id).exec(function (err, article) {
            article.comment.unshift(comment);
            comment.create = function (err, comment) {
                res.render('article-show', {article: article, comment: comment})
            };

        });
    });
};





//     app.post('/article/:articleID/comments', function (req, res) {
//         if (req.user === null) {
//             res.redirect('/login');
//         }
//         // const article;
//
//         Article.findById(req.params.articleID).then((article) => {
//             const author = req.user._id;
//             const comment = req.body.comment;
//
//             let commentObj = new Comment({comment, author});
//             return commentObj.save();
//         }).then((comment) => {
//             article.comments.unshift(comment);
//             return article.save();
//         }).then((article) => {
//             res.redirect('/article/${article._id}');
//         }).catch((err) => {
//             console.log("***Error while creating comment: ", err.message)
//         });
//
//     });

