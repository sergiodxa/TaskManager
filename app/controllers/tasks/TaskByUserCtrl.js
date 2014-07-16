function TaskByUserCtrl ($scope, $routeParams, tasks, session) {
  session.auth();

  var userId     = $routeParams.id || localStorage.id;
  var userActive = localStorage.id;
  var overActive;

  tasks.getByUser(userId).then(function (response) {
    if (response.data !== 'error') {
      $scope.tasks = response.data;
    }
  });

  // Drag&Drop
  if (userActive === userId) {
    $('.col-md-3').on('dragend', '.panel', function(event) {
      var taskList    = []; // creamos un array vacío
      var stateName   = $(this).parent().attr('data-state'); // obtenemos el stateName de la columna inicial
      var index       = $(this).attr('data-index'); // obtenemos la posición de la tarea dentro de la columna
      var targetState = $(overActive).attr('data-state'); // obtenemos el stateName objetivo

      // recorremos todas las tareas para buscar las que tengan el stateName inicial
      for (task in $scope.tasks) {
        if ($scope.tasks[task].stateName === stateName) {
          taskList.push($scope.tasks[task]);
        };
      };

      // obtenemos los datos de la tarea
      var targetTask   = taskList[index];
      var targetTaskId = targetTask['id'];

      // le cambiamos el stateName y el userAsigned
      targetTask.stateName   = targetState;
      targetTask.userAsigned = userActive;

      // obtenemos el state como número
      targetTask.state = tasks.getStateNumber(targetState);

      // creamos un string con los datos
      var targetTaskData = JSON.stringify(targetTask);

      tasks.edit(targetTaskId, targetTaskData).then(function (response) {
        if (response.data === 'Task data edited') {
          tasks.getByUser(userId).then(function (response) {
            if (response.data !== 'error') {
              $scope.tasks = response.data;
            };
          });
        };
      });
    });
    $('.col-md-3').on('dragover', function(event) {
      $(this).addClass('bg-info');
      overActive = $(this);
    });
    $('.col-md-3').on('dragleave', function(event) {
      $(this).removeClass('bg-info');
    });
  }
};