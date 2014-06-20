function LogoutCtrl($scope, session) {
  $scope.logout = function () {
    session.logout();
  }
};
