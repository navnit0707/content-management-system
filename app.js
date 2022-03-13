const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');


app.use(express.static(path.join(__dirname,'public')));

app.engine('handlebars', exphbs.engine({defaultLayout : 'home'}));
app.set('view engine', 'handlebars');


app.get('/',(req,res)=>{
    res.render('home/index');
});
app.get('/about',(req,res)=>{
    res.render('home/about');
});
app.get('/login',(req,res)=>{
    res.render('home/login');
});
app.get('/register',(req,res)=>{
    res.render('home/register');
});

app.listen(4500,()=>{
    console.log(`listening on port 4500`);
});