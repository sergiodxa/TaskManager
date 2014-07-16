function ClientEditCtrl ($scope, $routeParams, clients, session) {
  session.auth();

  var id = $routeParams.id;

  $scope.clientEdited = false;

  clients.getSingle(id).then(function (response) {
    $scope.client = response.data;
  });

  $scope.sendForm = function () {
    clients.edit($scope.client.id, $scope.client).then(function (response) {
      if (response.data === 'Client edited') {
        $scope.clientEdited = true;
        $scope.clientEditedTxt = response.data;
      } else {
        $scope.errorTxt = response.data;
      };
    });
  };
};