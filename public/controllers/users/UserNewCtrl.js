function UserNewCtrl ($scope, users, session, socket) {
  session.auth();

  $scope.newPassIncorrect = false;
  $scope.userCreated = false;

  $scope.user = {};

  $scope.newPassCheck = function () {
    if ($scope.user.newPass !== '' && $scope.user.repeatPass !== '' && ($scope.user.newPass === $scope.user.repeatPass)) {
      $scope.newPassIncorrect = false;
    } else if ($scope.user.newPass === '') {
      $scope.newPassIncorrect = false;
    } else {
      $scope.newPassIncorrect = true;
    };
  };

  $scope.sendForm = function () {
    if ($scope.newPassIncorrect === false) {
      socket.emit('add user', $scope.user);
    };
  };

  socket.on('user added', function(response) {
    $scope.userCreated = true;
    $scope.userCreatedTxt = response;
    $scope.user = {};
  });

  socket.on('add user failed', function(response) {
    $scope.errorTxt = response;
  });
};
