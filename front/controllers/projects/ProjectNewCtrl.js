function ProjectNewCtrl ($scope, projects, users, clients) {

  $scope.projectCreated = false;

  $scope.project = {};

  users.getOnlyScrumMasters().then(function (response) {
    $scope.users = response.data;
  });

  clients.getAll().then(function (response) {
    $scope.clients = response.data;
  });

  $scope.sendForm = function () {
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
