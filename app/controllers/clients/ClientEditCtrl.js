function ClientEditCtrl ($scope, $routeParams, clients, session, socket) {
  session.auth();

  var id = $routeParams.id;

  $scope.clientEdited = false;

  socket.emit('get client', id);
  socket.on('return client', function (response) {
    $scope.client = response;
  });

  $scope.sendForm = function () {
    socket.emit('edit client', {
      id: $scope.client.id,
      data: $scope.client
    });
  };

  socket.on('client edited', function(response) {
    $scope.clientEdited = true;
    $scope.clientEditedTxt = response;
  });

  socket.on('edit client failed', function(response) {
    $scope.errorTxt = response;
  });
};
