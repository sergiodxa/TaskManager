function LoginCtrl($scope, session) {
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
};
