function TaskDetailCtrl ($scope, $routeParams, tasks) {
  var id = $routeParams.id;

  $scope.itsMe = true;

  tasks.getSingle(id).then(function (response) {
    $scope.task = response.data;
  });

  $scope.deleteTask = function () {
    tasks.erase(id).then(function (response) {
      window.location = "#/tasks";
    });
  };
}