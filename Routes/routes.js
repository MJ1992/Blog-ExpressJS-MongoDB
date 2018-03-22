var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//model file
var Blog = require('../Model/Model.js');
var blogModel = mongoose.model('Blog');


//Routes

router.get('/', function(req, res) {
    res.send("Welcome to the Blog App");

});


//to create a new blog
router.post('/blog/create', function(req, res) {
    var newBlog = new blogModel({

        title: req.body.title,
        subTitle: req.body.subTitle,
        content: req.body.content,
        author: req.body.author,
    });

    /*    var today = Date.now();
        newBlog.created_on = today;
    */
    var tags = (req.body.tags != undefined && req.body.tags != null) ? req.body.tags.split(',') : '';

    newBlog.tags = tags;



    newBlog.save(function(err) {
        if (err) {
            console.log(err.message);
            res.send(err);

        } else {
            console.log("New Blog created succesfully");
            res.send(newBlog);
        }
    });
});




///to get all blogs
router.get('/blogs', function(req, res) {
    blogModel.find(function(err, result) {
        if (err) {
            console.log(err.message);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
//to get particular blog
router.get('/blogs/:id', function(req, res) {
    blogModel.findOne({ '_id': req.params.id }, function(err, result) {
        if (err) {
            console.log(err.message);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//to edit a particular blog
router.put('/blogs/:id/edit', function(req, res) {

    var updatedContent = req.body;

    var today = Date.now();
    updatedContent.last_modified = today;

    var updatedTags = (req.body.tags != undefined && req.body.tags != null) ? req.body.tags.split(',') : '';

    updatedContent.tags = updatedTags;

    blogModel.findOneAndUpdate({ '_id': req.params.id }, updatedContent, { new: true }, function(err, result) {
        if (err) {
            console.log(err.message);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//to delete a particular blog
router.post('/blogs/:id/delete', function(req, res) {


    blogModel.remove({ '_id': req.params.id }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    });
});



module.exports = router;