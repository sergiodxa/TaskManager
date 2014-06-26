function ClientNewCtrl ($scope, clients, session) {
  session.auth();

  $scope.clientCreated = false;

  $scope.client = {};

  $scope.sendForm = function () {
    clients.add($scope.client).then(function (response) {
      if (response.data === 'Client added') {
        $scope.clientCreated = true;
        $scope.clientCreatedTxt = response.data;
        $scope.client = {};
      } else {
        $scope.errorTxt = response.data;
      };
    });
  };
};
