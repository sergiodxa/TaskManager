function ClientListCtrl ($scope, clients) {
  clients.getAll().then(function (response) {
    $scope.clients = response.data;
  });
};
