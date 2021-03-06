TaskManager.service('session', function ($http, encryptor){

  this.login = function (user, pass) {
    return $http({
      method: 'GET',
      url   : '/api/session/login',
      params: {
        user: user,
        pass: pass
      }
    });
  };

  this.auth = function () {
    var id    = localStorage.id;
    var user  = localStorage.user;
    var token = localStorage.token;

    $http({
      method: 'POST',
      url   : '/api/session/auth',
      params: {
        id   : id,
        user : user,
        token: token
      }
    }).success(function (data, status) {
      if (window.location.hash === '#/login') {
        window.location.hash = '#/tasks';
      }
    }).error(function () {
      window.location.hash = '#/login';
    });
  };

  this.logout = function () {
    var id    = localStorage.id;
    var user  = localStorage.user;
    var token = localStorage.token;

    $http({
      method: 'POST',
      url   : '/api/session/logout',
      params: {
        id   : id,
        user : user,
        token: token
      }
    }).success(function (data, status) {
      localStorage.removeItem('id');
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      window.location.hash = '#/login';
    }).error(function () {
      alert('We have an error with the logout. Yeah thats weird. If you aren\'t already logged please contact an administrator.');
    });
  };
});
