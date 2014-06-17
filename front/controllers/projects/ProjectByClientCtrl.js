function ProjectByClientCtrl ($scope, projects) {
  projects.getByClient().then(function (response) {
    $scope.projects = response.data;
  });
};
