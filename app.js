const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cms').then((db) => {
    console.log('Mongo Connected');
}).catch((error) => {
    console.log(error);
});


app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'home' }));
app.set('view engine', 'handlebars');

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

app.listen(4500, () => {
    console.log(`listening on port 4500`);
});