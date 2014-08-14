function ClientNewCtrl ($scope, clients, session, socket) {
  session.auth();

  $scope.clientCreated = false;

  $scope.client = {};

  $scope.sendForm = function () {
    socket.emit('add client', $scope.client);
  };

  socket.on('client added', function(response) {
    $scope.clientCreated = true;
    $scope.clientCreatedTxt = response;
    $scope.project = {};
  });

  socket.on('add client failed', function(response) {
    $scope.errorTxt = response;
  });
};
