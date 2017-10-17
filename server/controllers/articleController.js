//**************** ARTICLE ******************


const jquery = require('jquery');

module.exports = function (app) {

    // Importing models
    const User = require('./../models/user');
    const Article = require('./../models/article');


    // upVotes
//     app.put('post/:id/vote-up', function (req, res) {
//         if( !req.user ) {
//          console.log("Sign in to vote.")
//          res.status(400).send("User is not signed in")
//          }else {
//         Article.findById(req.params.id).then(function (err, article) {
//                console.log("Upvoat uId:", req.user._id)
//              }).catch((err) => {
//             console.log("Upvote error: ",err.message)
//              res.status(400).send(err.message)
//              });
//           };
//
//      });


    // Votedown
//     app.put('post/:id/vote-down', function (req, res) {
//
//        Post.findById(req.params.id).exec(function (err, post) {
//
//            post.downVote.push(req.user._id);
//            post.voteScore = post.voteTotal - 1
//            post.save();
//
//            res.status(200);
//        })
//     })


    app.get('/article/:id', function (req, res) {
        Article.findById(req.params.id).exec(function (err, article) {
            res.render('article-new', {article: article, currentUser: req.user});
        });
    });

    // *********** Create Article ******************

    app.post('/article/new', function (req, res) {
        let article = new Article(req.body);

        // var Article = {
        //     category: req.body.category,
        //     articleName: req.body.articleName,
        //     content: req.body.content
        // };
        console.log(article);
        Article.save = function (err, article) {
            if (err) return (err);
            // saved!
            res.render("article-show", {article: article})
        };
        // Article.create = function (err, article) {
        //     if (err) return (err);
        //     // saved!
        //     res.render("article-show", {article: article})
        // };


    });
};



// CREATE ARTICLE
//         app.post('/article/create/new', function (req, res) {
//             // console.log(req.body)
//             const currentUser = req.username;
//
//             //If user is not logged in it will send the user to login
//             if (currentUser === null) {
//                 res.redirect('/')
//             }
//
//             const category = req.body.category;
//             const articleName = req.body.articleName;
//             const user = req.user._id;
//
//             Article.create({
//                 category,
//                 articleName,
//                 author: user
//             }).then((article) => {
//                 return article.save()
//             }).then((article) => {
//                 console.log("Your Article is now save and ready to be shared with the world");
//                 res.redirect('/article/${article._id}')
//             }).catch((err) => {
//                 console.log("We had a problem while creating the Article ", err.message)
//             });
//
//         })
//res.render('article-new', {});


