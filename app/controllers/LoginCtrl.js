function LoginCtrl($scope, session) {
  if (sessionStorage.login !== 'checked') {
    sessionStorage.login = 'checked';
    session.auth();
  };

  $scope.sendForm = function () {
    session.login($scope.userName, $scope.pass).then(function (response) {
      var data = response.data;
      localStorage.id = data.id;
      localStorage.user = data.user;
      localStorage.token = data.token;

      window.location.hash = '#/tasks';
    });
  };
};
