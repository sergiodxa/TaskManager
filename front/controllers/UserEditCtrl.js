function UserEditCtrl ($scope, $routeParams, users) {
  var id = $routeParams.id;

  $scope.actualPassIncorrect = false;
  $scope.newPassIncorrect = false;
  $scope.userEdited = false;

  users.getSingle(id).then(function (response) {
    $scope.user = response.data;
  });

  $scope.actualPassCheck = function () {
    if ($scope.user.actualPass !== '' && ($scope.user.actualPass === $scope.user.pass)) {
      $scope.actualPassIncorrect = false;
    } else if ($scope.user.actualPass === '') {
      $scope.actualPassIncorrect = false;
    } else {
      $scope.actualPassIncorrect = true;
    }
  }

  $scope.newPassCheck = function () {
    if ($scope.user.newPass !== '' && $scope.user.repeatPass !== '' && ($scope.user.newPass === $scope.user.repeatPass)) {
      $scope.newPassIncorrect = false;
    } else if ($scope.user.newPass === '') {
      $scope.newPassIncorrect = false;
    } else {
      $scope.newPassIncorrect = true;
    }
  }

  $scope.sendForm = function () {
    if ($scope.actualPassIncorrect === false) {
      users.edit($scope.user.id, $scope.user).then(function (response) {
        if (response.data === 'User data with pass edited' || response.data === 'User data without pass edited') {
          $scope.userEditedTxt = response.data;
          $scope.userEdited = true;
          users.getSingle(id).then(function (response) {
            $scope.user = response.data;
          });
        } else if (response.data === response.data === 'Password wrong') {
          $scope.newPassIncorrect = true;
        } else if (response.data === 'false') {
          console.log('An error has ocurred');
        }
      });
    }
  }

}