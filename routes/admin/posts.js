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

module.exports = router;