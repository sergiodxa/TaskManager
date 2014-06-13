function TaskByUserCtrl ($scope, tasks) {
  var projectId = 1;
  tasks.getByProject(projectId).then(function (response) {
    if (response.data !== 'error') {
      $scope.tasks = response.data;
    }
  });
}
