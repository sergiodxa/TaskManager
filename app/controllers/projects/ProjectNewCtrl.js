function ProjectNewCtrl ($scope, projects, users, clients, session) {
  session.auth();

  $scope.projectCreated = false;

  $scope.project = {};

  users.getOnlyScrumMasters().then(function (response) {
    $scope.users = response.data;
  });

  clients.getAll().then(function (response) {
    $scope.clients = response.data;
  });

  $scope.sendForm = function () {
    projects.add($scope.project).then(function (response) {
      if (response.data === 'Project edited') {
        $scope.projectCreated    = true;
        $scope.projectCreatedTxt = response.data;
        $scope.project           = {};
      } else {
        $scope.errorTxt = response.data;
      };
    });
  };
};
