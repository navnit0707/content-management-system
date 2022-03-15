const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
});

router.get('/', (req, res) => {


    res.render('admin/index');
});

router.post('/generate-fake-posts', (req, res) => {
    let numb = parseInt(req.body.amount);
    for (let i = 0; i < numb; i++) {

        let post = new Post();
        post.title = faker.name.title();
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();

        post.save(function(err) {
            if (err) { throw err; }

            /*

            getting this error and i am unable to figure out how to solve this
            Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                at ServerResponse.setHeader (_http_outgoing.js:561:11)
    at ServerResponse.header (Z:\intain\content-management-system\node_modules\express\lib\response.js:776:10)
    at ServerResponse.location (Z:\intain\content-management-system\node_modules\express\lib\response.js:893:15)
    at ServerResponse.redirect (Z:\intain\content-management-system\node_modules\express\lib\response.js:931:18)
    at Z:\intain\content-management-system\routes\admin\index.js:32:13
    at Layer.handle [as handle_request] (Z:\intain\content-management-system\node_modules\express\lib\router\layer.js:95:5)
    at next (Z:\intain\content-management-system\node_modules\express\lib\router\route.js:137:13)        
    at Route.dispatch (Z:\intain\content-management-system\node_modules\express\lib\router\route.js:112:3)
    at Layer.handle [as handle_request] (Z:\intain\content-management-system\node_modules\express\lib\router\layer.js:95:5)
    at Z:\intain\content-management-system\node_modules\express\lib\router\index.js:281:22
            */


        });

    }
    res.redirect('/admin/posts');
});



module.exports = router;