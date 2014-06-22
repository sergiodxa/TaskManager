function ProjectEditCtrl ($scope, $routeParams, projects, users, clients, session) {
  session.auth();

  var id = $routeParams.id;

  $scope.projectEdited = false;

  projects.getSingle(id).then(function (response) {
    $scope.project = response.data;
  });

  users.getOnlyScrumMasters().then(function (response) {
    $scope.users = response.data;
  });

  clients.getAll().then(function (response) {
    $scope.clients = response.data;
  });

  $scope.sendForm = function () {
    projects.edit($scope.project.id, $scope.project).then(function (response) {
      if (response.data === 'Project edited') {
        $scope.projectEdited    = true;
        $scope.projectEditedTxt = response.data;
        projects.getSingle(id).then(function (response) {
          $scope.project = response.data;
        });
      } else {
        $scope.errorTxt = response.data;
      };
    });
  };
};
