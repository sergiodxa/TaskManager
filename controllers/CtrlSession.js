var session = require('../modules/session');

exports.login = function (req, res) {
  var user = req.query.user;
  var pass = req.query.pass;
  var ip   = req.header('x-forwarded-for') || req.connection.remoteAddress;

  session.login(user, pass, ip, function (data) {
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
  var token = req.query.token;

  session.auth(token, function (response) {
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
  var token = req.query.token;

  session.logout(token, function (response) {
    if (response === false) {
      res.send(400);
      return;
    } else {
      res.send(200);
      return;
    }
  })
}