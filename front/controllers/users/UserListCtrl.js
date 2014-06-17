function UserListCtrl ($scope, users) {
  users.getAll().then(function (response) {
    $scope.users = response.data;
  });
};
