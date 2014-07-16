function TaskNewCtrl ($scope, tasks, projects, users) {

  $scope.taskCreated = false;
  $scope.task = {};

  projects.getAll().then(function (response) {
    $scope.projects = response.data;
  });

  users.getAll().then(function (response) {
    $scope.users = response.data;
  })

  $scope.sendForm = function () {
    $scope.task.estimatedTime = parseInt($scope.task.estimatedTime);
    $scope.task.project = parseInt($scope.task.project);
    $scope.task.requiredTime = null;
    $scope.task.state = 1;
    $scope.task.userAssigned = parseInt($scope.task.userAssigned);
    tasks.add($scope.task).then(function (response) {
      if (response.data === 'Task added') {
        $scope.taskCreatedTxt = response.data;
        $scope.taskCreated = true;
        $scope.task = {};
      } else {
        $scope.errorTxt = response.data;
      };
    });
  };
};