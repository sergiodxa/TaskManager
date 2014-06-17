function TaskEditCtrl ($scope, $routeParams, tasks) {
  var id = $routeParams.id;
  $scope.taskEdited = false;

  tasks.getSingle(id).then(function (response) {
    $scope.task = response.data;
  });

  $scope.sendForm = function () {
    tasks.edit(id, $scope.task).then(function (response) {
      console.log(response.data);
      if (response.data === 'Task data edited') {
        $scope.taskEditedTxt = response.data;
        $scope.taskEdited = true;
      } else if (response.data === 'false') {
        console.log('An error has ocurred');
      }
    });
  }

}