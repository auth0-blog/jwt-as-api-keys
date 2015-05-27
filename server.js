import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import express from 'express';
import errorhandler from 'errorhandler';
import bodyParser from 'body-parser';
import _ from 'lodash';

// JWTs
import jwt from 'jsonwebtoken';
import jwtCheck from 'express-jwt';
import user from './user';


let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Server started").status(200);
});


// API Part goes here

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

let port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
