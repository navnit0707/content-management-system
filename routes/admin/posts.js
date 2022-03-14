const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';

    next();
});
router.get('/', (req, res) => {
    res.send('IT works')
});

router.get('/create', (req, res) => {
    res.render('admin/posts/create');
});

module.exports = router;