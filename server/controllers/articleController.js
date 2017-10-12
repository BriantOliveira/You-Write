const express = require('express');
const Article = require('./../models/article');
const app = express();

module.exports = function (app) {

//NEW
    app.get('/article/new', function (req, res) {
        res.render('article-new', {});
    });

// SHOW ARTICLE
    app.get('/article-show', function (req, res) {
        Article.findById(req.params.id).exec(function (err, article) {
            res.render('article-show', {article: article});
        });
    });
    app.get('/article/:id', function (req, res) {
        Article.findById({_id: req.params.id}, function (err, article) {
            console.log(article);
            res.render('article-show', {article: article});
        });
    });
// CREATE ARTICLE
    app.post('/article/new', function (req, res) {
        Article.create(req.body, function (err, article) {
            console.log(req.body);
            res.redirect('/article/' + article.id)
        });
        //res.render('article-new', {});
    });

// EDIT ARTICLE
    app.get('/article/:id/edit', function (req, res) {
        Article.findById(req.params.id, function (err, article) {
            res.render('article-edit', {article: article});
        });
    });

// UPDATE ARTICLE
    app.put('/article/:id', function (req, res) {
        Article.findByIdAndUpdate(req.params.id, req.body, function (err, article) {
            res.redirect('/article/show' + article._id);
        });
    });

// DELETE
    app.delete('/article/:id', function (req, res) {
        Article.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                console.error("Error")
            } else {
                res.redirect('/')
            }

        });
    });

};