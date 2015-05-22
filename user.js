import jwtAuth from 'express-jwt'

function login() {
  return jwtAuth({
    secret: process.env.USER_SECERT
  });
};

export default {login};
