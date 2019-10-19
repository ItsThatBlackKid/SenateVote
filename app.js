const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const knex = require('knex');
const Pool = require('pg').Pool;

const postgresdb = process.env.POSTGRES_DB || "senatevote";
const postgreshost = process.env.POSTGRES_HOST || "localhost";
const postgresuser = process.env.POSTGRES_USER || "shekukanneh";
const postgrespass = process.env.POSTGRES_PWD || "pokemon244";
const pool = new Pool({
  user:postgresuser,
  host:postgreshost,
  database: postgresdb,
  password: postgrespass,
});


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const votesRouter= require('./routes/votes');
const generateParameters = require("./crypto/crypto").generateParameters;

const app = express();

/**
 * ---- SELECTING KEY PARAMETERS ----
 * In this section the server generates the parameters p,q,n,phi(n),g
 * These are not persistent values.
 * Should this server program shut down,
 * all calculated in that instance will be irrecoverable.
 *
 */





const primes = generateParameters();
console.log(primes);
console.log("Key parameters generated.");

app.locals.parameters = primes;

//initialise sql database

app.locals.postgres = pool;

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
app.use('/votes', votesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
