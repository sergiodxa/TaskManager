function UserListCtrl ($scope, users, session, socket) {
  session.auth();

  socket.emit('get users');
  socket.on('return users', function (response) {
    $scope.users = response;
  });
};
