function ClientListCtrl ($scope, clients, session, socket) {
  session.auth();

  // clients.getAll().then(function (response) {
  //   $scope.clients = response.data;
  // });

  socket.emit('get clients');
  socket.on('return clients', function (response) {
    $scope.clients = response;
  })
};
