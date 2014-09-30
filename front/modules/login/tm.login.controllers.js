(function() {
  /**
  * TM.Login.Controllers Module
  *
  * Módulo de la parte de login
  */
  angular.module('TM.Login.Controllers', [])
    .controller('LoginCtrl', ['$scope', 'session', function ($scope, session) {
      if (sessionStorage.login !== 'checked') {
        sessionStorage.login = 'checked';
        session.auth();
      };

      $scope.sendForm = function () {
        session.login($scope.userName, $scope.pass).then(function (response) {
          localStorage.id    = response.data.id;
          localStorage.user  = response.data.user;
          localStorage.token = response.data.token;

          window.location.hash = '#/tasks';
        });
      };
    }])
    .controller('LogoutCtrl', ['$scope', 'session', function ($scope, session) {
      $scope.logout = function () {
        session.logout();
      }
    }]);
})();
