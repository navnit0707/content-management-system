const express = require('express');
//expressJs is a nodesj mdoule


const app = express(); 
//Calls the express function "express()" and puts new Express application inside the app variable (to start a new Express application). 
//It's something like you are creating an object of a class. Where "express()" is just like class and app is it's newly created object.

const path = require('path');
const exphbs = require('express-handlebars');
// express- handlebars is a templete generating library


const mongoose = require('mongoose');
//Mongoose provides a straight-forward, schema-based solution to model your application data. 
//It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.


const bodyParser = require('body-parser');
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

const methodOverride = require('method-override');
// use to create a middleware that over ride the data we get .
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


const Handlebars = require('handlebars');


const upload = require('express-fileupload');
const session = require('cookie-session');
const flash = require('connect-flash');
const { mongoDbUrl } = require('./config/database');
const passport = require('passport');



mongoose.connect(mongoDbUrl).then(db => {

    console.log('MONGO connected');

}).catch(error => console.log(error));



// Using Static

app.use(express.static(path.join(__dirname, 'public')));

// Set View Engine


const { select, generateDate, paginate } = require('./helpers/handlebars-helpers');

//handlebars: allowInsecurePrototypeAccess(Handlebars),
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.engine('handlebars', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'home',
    helpers: {
        select: select,
        generateDate: generateDate,
        paginate: paginate
    }
}));
app.set('view engine', 'handlebars');

// Upload Middleware


app.use(upload());

// Body Parser

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Method Override

app.use(methodOverride('_method'));

app.use(session({

    secret: 'Navnit0707',
    resave: true,
    saveUninitialized: true

}));
app.use(flash());

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());




// Local Variables using Middleware


app.use((req, res, next) => {

    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');

    res.locals.error_message = req.flash('error_message');

    res.locals.form_errors = req.flash('form_errors');

    res.locals.error = req.flash('error');

    next();


});



// Load Routes

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');
//const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// Use Routes

app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);


const port = process.env.PORT || 4500;

app.listen(port, () => {

    console.log(`listening on port 4500`);

});
