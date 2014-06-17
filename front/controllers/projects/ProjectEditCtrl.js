function ProjectEditCtrl ($scope, $routeParams, projects, users) {
  var id = $routeParams.id;

  $scope.projectEdited = false;

  projects.getSingle(id).then(function (response) {
    $scope.project = response.data;
  });

  users.getOnlyScrumMasters().then(function(response) {
    $scope.project = response.data;
  });

  $scope.sendForm = function () {
    projects.edit($scope.project.id, $scope.project).then(function (response) {
      if (response.data === 'Project edited') {
        $scope.projectEditedTxt = response.data;
        $scope.projectEdited = true;
        projects.getSingle(id).then(function (response) {
          $scope.project = response.data;
        });
      } else {
        console.log('An error has ocurred');
      };
    });
  };
};
