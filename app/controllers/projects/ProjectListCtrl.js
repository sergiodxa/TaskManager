function ProjectListCtrl ($scope, projects, session) {
  session.auth();

  projects.getAll().then(function (response) {
    $scope.projects = response.data;
  });
};