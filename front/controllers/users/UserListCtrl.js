function UserListCtrl ($scope, users, session) {
  session.auth();

  users.getAll().then(function (response) {
    $scope.users = response.data;
  });
};
