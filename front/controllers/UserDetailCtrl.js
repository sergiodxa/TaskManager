function UserDetailCtrl ($scope, $routeParams, users) {
  var id = $routeParams.id;
  users.getSingle(id).then(function (response) {
    $scope.user = response.data;
  });
}