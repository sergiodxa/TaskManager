function TaskByUserCtrl ($scope, tasks) {
  var userId = 1;
  tasks.getByUser(userId).then(function (response) {
    if (response.data !== 'error') {
      $scope.tasks = response.data;
    }
  });
}
