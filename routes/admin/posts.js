const express = require('express');
const router = express.Router();
const fs = require('fs');
const Post = require('../../models/Post');
const { isEmpty } = require('../../helpers/upload-helpers')

const uploadPath = __dirname + "/../../public/uploads/";

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

router.post("/create", (req, res) => {

    let errors = [];

    if (!req.body.title) {

        errors.push({ message: 'please add a title' });

    }


    if (!req.body.body) {

        errors.push({ message: 'please add a description' });

    }


    if (errors.length > 0) {

        res.render('admin/posts/create', {

            errors: errors

        })

    } else {


        // let filename = "BMW-Z4.jpg";
        // let file = req.files.file;
        // console.log(file);
        // filename = Date.now() + "-" + file.name;

        if (!isEmpty(req.files.file)) {
            let file = req.files.file;
            filename = Date.now() + "-" + file.name;

            const uploadPath = __dirname + "/../../public/uploads/";

            file.mv(uploadPath + filename, (err) => {
                if (err) {
                    console.log(err);

                    throw err;

                }
            });


        }

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
            body: req.body.body,
            file: filename,
        });

        newPost.save().then(savedPost => {

            req.flash('success_message', `Post ${savedPost.title} was created`);
            res.redirect('/admin/posts');


        });

    }


    // console.log(req.body.allowComments);


});

router.get('/edit/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }).then(post => {
        res.render('admin/posts/edit', { post: post });

    });

});

router.put('/edit/:id', (req, res) => {


    Post.findOne({ _id: req.params.id }).then(post => {

        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }

        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;

        if (!isEmpty(req.files.file)) {

            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            post.file = filename;

            const uploadPath = __dirname + "/../../public/uploads/";
            file.mv(uploadPath + filename, (err) => {
                if (err) {
                    console.log(err);

                    throw err;

                }
            });


        }
        post.save().then((updatedPost) => {
            req.flash('success_message', 'Post updated successfully')
            res.redirect('/admin/posts');
        });

    });

});
router.delete('/:id', (req, res) => {

    Post.findOne({ _id: req.params.id })

    .then(post => {
        const uploadPath = __dirname + "/../../public/uploads/";
        console.log(uploadPath + post.file);
        fs.unlink(uploadPath + post.file, (err) => {
            post.remove().then(postRemoved => {

                req.flash('success_message', 'Post was successfully deleted');
                res.redirect('/admin/posts/');

            });


        });

    });
});


module.exports = router;