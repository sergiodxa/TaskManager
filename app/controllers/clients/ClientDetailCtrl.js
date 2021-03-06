function ClientDetailCtrl ($scope, $routeParams, clients, session, socket) {
  session.auth();

  var id = $routeParams.id;

  socket.emit('get client', id);
  socket.on('return client', function (response) {
    $scope.client = response;
  });

  $scope.deleteClient = function () {
    socket.emit('delete client', id);
  };

  socket.on('client deleted', function (response) {
    window.location = '#/clients';
  });
};
