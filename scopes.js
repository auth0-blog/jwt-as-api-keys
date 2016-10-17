import _ from 'lodash';

export function checkScopes(scopes) {
  return function(req, res, next) {

    var tokenScopes = req.token_payload.scopes;
    var check = _.every(scopes, function(val) {
      return _.contains(tokenScopes, val);
    });

    if (!check) {
      return res.send(401, 'insufficient scopes')
    } else {
      next();
    }
  }
};

export function getScopesFromRequest(req) {
  return ['follow', 'read_users'];
};
