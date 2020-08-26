require('dotenv').config();
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes/index');
var flash = require('connect-flash');
var session = require('express-session');
// var redis = require('redis');
// var redisStore = require('connect-redis')(session);
// var client = redis.createClient();
var multer = require('multer');
var os = require('os');

// var commonRoute = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // eslint-disable-line no-undef
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // eslint-disable-line no-undef
app.use(multer({ dest: os.tmpdir()}).any())
app.use(flash());
app.use(session({
	secret: 'topsecret',
  //store: new redisStore({ host: 'localhost', client: client }),
  cookie: { maxAge: 3600000 },
	resave: false,
saveUninitialized: false,

}));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.redirect('/');
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
    console.log(`App listening at http://localhost:3000`)
})