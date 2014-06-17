function ProjectListCtrl ($scope, projects) {
  projects.getAll().then(function (response) {
    $scope.projects = response.data;
  });
};
