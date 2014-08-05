function ClientListCtrl ($scope, clients, session, socket) {
  session.auth();

  socket.emit('get clients');
  socket.on('return clients', function (response) {
    $scope.clients = response;
  });
};
