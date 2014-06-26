function ProjectDetailCtrl ($scope, $routeParams, $http, projects, session) {
  session.auth();

  var id = $routeParams.id;

  projects.getSingle(id).then(function (response) {
    $scope.project = response.data;
    if (response.data.githubUrl) {
      $http({
        method: 'GET',
        url   : response.data.githubUrl
      }).success(function (github) {
        response.data.github = github;
        $http({
          method: 'GET',
          url   : github.commits_url.slice(0, -6)
        }).success(function (commits) {
          response.data.github.commits_list = commits;
        });
      });
    }
  });

  $scope.deleteProject = function () {
    projects.erase(id).then(function (response) {
      window.location = "#/projects";
    });
  };
};
