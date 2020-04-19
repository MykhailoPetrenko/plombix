const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

const port = 8080;
const app = express();

mongoose.connect('mongodb://localhost:27017/Plombix', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + '/public'));
app.use(session({
    secret:'plombixsecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 60 * 60 * 1000} //3 hours
}));
app.use(flash());

app.use(function (req,res,next) {
    res.locals.session = req.session;
    next();
});

const mainController = require('./controller/mainController');
app.use('/', mainController.route);

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
