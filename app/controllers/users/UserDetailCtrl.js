function UserDetailCtrl ($scope, $routeParams, users, session, socket) {
  session.auth();

  var id = $routeParams.id;

  socket.emit('get user', id);
  socket.on('return user', function (response) {
    $scope.user = response;
  });

  $scope.deleteUser = function () {
    socket.emit('delete user', id);
  };

  socket.on('user deleted', function (response) {
    window.location = '#/users';
  });
};
