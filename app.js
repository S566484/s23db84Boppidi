var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
 
 
require('dotenv').config();
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var NutsRouter = require('./routes/Nuts');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');
var Nuts = require("./models/Nuts");
 
 
 
async function recreateDB() {
  // Delete everything
  await Nuts.deleteMany();
 
  let instance1 = new
Nuts({name:"almonds", size:'large',cost:10.03});
instance1.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});

let instance2 = new
Nuts({name:"hazelNuts.", size:'medium',cost:15.99});
instance2.save().then(doc=>{
console.log("Second object saved")}
).catch(err=>{
console.error(err)
});

let instance3 = new
Nuts({name:"Brazil Nuts", size:'small',cost:20.00});
instance3.save().then(doc=>{
console.log("Third object saved")}
).catch(err=>{
console.error(err)
});
}
  
 
let reseed = true;
if (reseed) {
  recreateDB(); // Seed the database on server start
}
 
 
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
 
// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 
// Check if the connection is successful
db.once("open", function () {
  console.log("Connection to DB succeeded");
});
 
 
var Account = require('./models/accounts');
var app = express();
 
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport config
// Use the existing connection
// The Account model
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Nuts', NutsRouter);
app.use('/board', boardRouter);
app.use('/choose',chooseRouter);
app.use('/resource',resourceRouter);;
 
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;