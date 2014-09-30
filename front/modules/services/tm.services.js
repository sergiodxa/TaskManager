(function() {
  /**
  * TM.Services Module
  *
  * Servicios genéricas de la app
  */
  angular.module('TM.Services', [])
    .service('session', ['$http', function ($http) {
      this.login = function (user, pass) {
        return $http({
          method: 'GET',
          url   : '/session/login',
          params: {
            user: user,
            pass: pass
          }
        });
      };

      this.auth = function () {
        $http({
          method: 'POST',
          url   : '/session/auth',
          params: {
            token: localStorage.token
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
        $http({
          method: 'POST',
          url   : '/session/logout',
          params: {
            token: localStorage.token
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
    }]);
})();
