import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import chalk from 'chalk';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import cors from 'cors';
import http from 'http';

import { server, mongo } from './config';
import { secret } from './config.secure';

// middlewares
import errorHandler from './middlewares/errorHandler';

// routes
import apiRoutes from './routes';

// config
import './config/passport';

// socket.io

const app = express();

const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer);

require('./services/chat')(io);

mongoose.Promise = bluebird;
mongoose.connect(mongo.url, {
  useMongoClient: true,
}, (e) => {
  if (e) throw e.message;
  console.log(chalk.cyan('Connected to MongoDB Atlas...'));
});

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(morgan('tiny'));
app.use(session({
  secret,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(apiRoutes);

httpServer.listen(server.port, () => {
  console.log(chalk.cyan(`Listening at ${server.port}...`));
});

app.use(errorHandler);

module.exports = {
  server,
  io,
};
