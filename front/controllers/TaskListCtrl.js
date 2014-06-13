function TaskListCtrl ($scope, tasks) {
  tasks.getAll().then(function (response) {
    if (response.data !== 'error') {
      $scope.tasks = response.data;
    }
  });
}
