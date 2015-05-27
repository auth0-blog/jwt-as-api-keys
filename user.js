import jwtAuth from 'express-jwt'

function login() {
  return (req, res, next) => {
    req.user = {
      name: 'mgonto'
    };
    next();
  }
};

export default {login};
