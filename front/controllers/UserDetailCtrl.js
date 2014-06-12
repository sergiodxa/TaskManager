function UserDetailCtrl ($scope, $routeParams, users) {
  var id = $routeParams.id;
  users.getSingle(id).then(function (response) {
    $scope.user = response.data;
  });

  $scope.deleteUser = function () {
    users.erase(id).then(function (response) {
      window.location = "/users";
    });
  };
}