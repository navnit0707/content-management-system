const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/cms').then((db) => {
    console.log('Mongo Connected');
}).catch((error) => {
    console.log(error);
});


app.use(express.static(path.join(__dirname, 'public')));

//helpers 
const { select } = require('./helpers/handlebars-helpers')


app.engine('handlebars', exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        defaultLayout: 'home',
        helpers: { select: select }
    }

));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//Method override
app.use(methodOverride('_method'));
//load routes
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');

//use Routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

app.listen(4500, () => {
    console.log(`listening on port 4500`);
});