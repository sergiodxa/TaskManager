function ClientListCtrl ($scope, clients, session) {
  session.auth();

  clients.getAll().then(function (response) {
    $scope.clients = response.data;
  });
};