function ProjectDetailCtrl ($scope, $routeParams, projects) {
  var id = $routeParams.id;

  projects.getSingle(id).then(function (response) {
    $scope.projects = response.data;
  });

  $scope.deleteProject = function () {
    projects.erase(id).then(function (response) {
      window.location = "#/projects";
    });
  };
};
