function ProjectDetailCtrl ($scope, $routeParams, projects, session) {
  session.auth();

  var id = $routeParams.id;

  projects.getSingle(id).then(function (response) {
    $scope.project = response.data;
  });

  $scope.deleteProject = function () {
    projects.erase(id).then(function (response) {
      window.location = "#/projects";
    });
  };
};
