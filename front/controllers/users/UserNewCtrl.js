function UserNewCtrl ($scope, users, session) {
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
      users.add($scope.user).then(function (response) {
        if (response.data === 'User added') {
          $scope.userCreated = true;
          $scope.user = {};
        } else {
          $scope.errorTxt = response.data;
        };
      });
    };
  };
};
