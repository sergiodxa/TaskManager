function ClientDetailCtrl ($scope, $routeParams, clients, session) {
  session.auth();

  var id = $routeParams.id;

  clients.getSingle(id).then(function (response) {
    $scope.client = response.data;
  });

  $scope.deleteClient = function () {
    clients.erase(id).then(function (response) {
      window.location = "#/clients";
    });
  };
};