function ProjectNewCtrl ($scope, projects) {

  $scope.projectCreated = false;

  $scope.project = {};

  $scope.sendForm = function () {
    if ($scope.newPassIncorrect === false) {
      project.add($scope.project).then(function (response) {
        if (response.data === 'Project edited') {
          $scope.projectCreated = true;
          $scope.project = {};
        } else if (response.data === 'An error has ocurred') {
          console.log(response.data);
        };
      });
    };
  };
};
