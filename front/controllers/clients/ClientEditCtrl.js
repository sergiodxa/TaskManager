function ClientEditCtrl ($scope, $routeParams, clients) {
  var id = $routeParams.id;

  $scope.clientEdited = false;

  clients.getSingle(id).then(function (response) {
    $scope.client = response.data;
  });

  $scope.sendForm = function () {
    clients.edit($scope.client.id, $scope.client).then(function (response) {
      if (response.data === 'Client edited') {
        $scope.clientEditedTxt = response.data;
        $scope.clientEdited = true;
        clients.getSingle(id).then(function (response) {
          $scope.client = response.data;
        });
      } else {
        console.log('An error has ocurred');
      };
    });
  };
};
