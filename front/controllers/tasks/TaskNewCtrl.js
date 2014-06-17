function TaskNewCtrl ($scope, tasks, projects) {

  $scope.taskCreated = false;
  $scope.task = {};

  projects.getAll().then(function (response) {
    $scope.projects = response.data;
  });

  $scope.sendForm = function () {
    $scope.task.state = tasks.getStateNumber($scope.task);
    tasks.add($scope.task).then(function (response) {
      if (response.data === 'Task added') {
        $scope.taskCreatedTxt = response.data;
        $scope.taskCreated = true;
        $scope.task = {};
      } else if (response.data === 'An error has ocurred') {
        console.log(response.data);
      };
    });
  };
};