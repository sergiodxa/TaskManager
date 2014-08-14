function UserEditCtrl ($scope, $routeParams, users, session, socket) {
  session.auth();

  var id = $routeParams.id;

  $scope.actualPassIncorrect = false;
  $scope.newPassIncorrect = false;
  $scope.userEdited = false;

  socket.emit('get user', id);
  socket.on('return user', function (response) {
    $scope.user = response;
  });

  $scope.actualPassCheck = function () {
    if (($scope.user.actualPass !== '') && ($scope.user.actualPass === $scope.user.pass)) {
      $scope.actualPassIncorrect = false;
    } else {
      $scope.actualPassIncorrect = true;
    };
  };

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
    if ($scope.actualPassIncorrect === false) {
      socket.emit('edit user', {
        id: $scope.user.id,
        data: $scope.user
      });
    };
  };

  socket.on('user with pass edited', function (response) {
    $scope.userEdited = true;
    $scope.userEditedTxt = response;
  });

  socket.on('user without pass edited', function (response) {
    $scope.userEdited = true;
    $scope.userEditedTxt = response;
  });

  socket.on('edit user failed', function (response) {
    $scope.errorTxt = response;
  });
};
