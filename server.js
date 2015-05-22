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

// Scopes
import {checkScopes, getScopesFrmoRequest} from './scopes';

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Server started").status(200);
});

// User Login
app.post('/login', (req, res) => {
  if (!req.body.username) {
    return res.status(401).send("Send a username to login");
  }

  var user = {
    name: req.body.username
  };

  res.status(200).send({
    id_token: jwt.sign(user, process.env.USER_SECERT)
  });
});

// API token creation. Requires User Login
app.post('/create-api-token', user.login(), (req, res) => {
  res.status(201).send({
    api_token: jwt.sign({
        tenant: req.user.name,
        scopes: getScopesFrmoRequest(req)
      },
      process.env.API_SECRET,
      { expiresInMinutes: 60*5 })
  });
});

// API calls. Require API key
app.use('/api', jwtCheck({
  secret: process.env.API_SECRET,
  userProperty: 'token_payload'
}));

app.post('/api/follow', checkScopes(['follow']), (req, res) => {
  return res.status(201).send({followed: true});
});

app.get('/api/users/names', checkScopes(['read_users', 'read_names']), (req, res) => {
  return res.status(201).send({names: true});
});


if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

let port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
