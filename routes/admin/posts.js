const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Post = require('../../models/Post');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
});
router.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render('admin/posts', { posts: posts });

    });


});

router.get('/create', (req, res) => {
    res.render('admin/posts/create');
});
router.post('/create', (req, res) => {

    let allowComments = true;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }
    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body
    });

    //console.log(req.body.allowComments);


    newPost.save().then(savedPost => {
        res.redirect('/admin/posts');
    }).catch(error => {
        console.log('error');
    });

});

router.get('/edit/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }).then(post => {
        res.render('admin/posts/edit', { post: post });

    });

});

module.exports = router;