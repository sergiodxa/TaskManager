function ClientNewCtrl ($scope, clients) {

  $scope.clientCreated = false;

  $scope.client = {};

  $scope.sendForm = function () {
    client.add($scope.client).then(function (response) {
      if (response.data === 'Client edited') {
        $scope.clientCreated = true;
        $scope.client = {};
      } else if (response.data === 'An error has ocurred') {
        console.log(response.data);
      };
    });
  };
};
