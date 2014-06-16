function TaskDetailCtrl ($scope, $routeParams, tasks) {
  var id = $routeParams.id;

  /*tasks.getSingle(id).then(function (response) {
    $scope.task = response.data;
  });*/
$scope.task = {
  id: 1,
  name: 'test',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae sequi, earum quam excepturi pariatur eius id, voluptate cupiditate minima temporibus, possimus optio ipsam quis repudiandae doloribus enim dolores obcaecati illo.',
  userAsigned: 1,
  userAsignedName: 'sergio',
  project: 1,
  estimatedTime: '01:00:00',
  requiredTime: null,
  stateName: 'completed'
}

  $scope.deleteTask = function () {
    tasks.erase(id).then(function (response) {
      window.location = "#/tasks";
    });
  };
}