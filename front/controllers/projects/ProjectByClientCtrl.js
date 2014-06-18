function ProjectByClientCtrl ($scope, $routeParams, projects) {
  var clientId = $routeParams.id;

  projects.getByClient(clientId).then(function (response) {
    console.log(response);
    $scope.projects = response.data;
  });
};
