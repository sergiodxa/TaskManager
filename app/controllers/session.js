var session = require('../modules/session');

exports.login = function (req, res) {
  var user = req.query.user;
  var pass = req.query.pass;

  session.login(user, pass, function (data) {
    if (data) {
      res.send(data);
      return;
    } else {
      res.send(401);
      return;
    };
  });
};

exports.auth = function (req, res) {
  var id    = parseInt(req.query.id);
  var user  = req.query.user;
  var token = req.query.token;

  session.auth(id, user, token, function (response) {
    if (response === false) {
      res.send(401);
      return;
    } else {
      res.send(200);
      return;
    }
  });
};

exports.logout = function (req, res) {
  var id    = parseInt(req.query.id);
  var user  = req.query.user;
  var token = req.query.token;

  session.logout(id, user, token, function (response) {
    if (response === false) {
      res.send(400);
      return;
    } else {
      res.send(200);
      return;
    }
  })
}