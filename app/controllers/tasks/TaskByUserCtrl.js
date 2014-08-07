function TaskByUserCtrl ($scope, $routeParams, tasks, session, socket) {
  session.auth();

  var userId     = $routeParams.id || localStorage.id;
  var userActive = localStorage.id;
  var overActive;

  socket.emit('get tasks by user', userId);
  socket.on('return tasks by user', function (response) {
    if (response[0].userAssigned == userId) {
      $scope.tasks = response;
    }
  });

  // Drag&Drop
  if (userActive === userId) {
    $('[data-state]').on('dragend', '[draggable]', function(event) {
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

      socket.emit('edit task', targetTask);
      setTimeout(function () {
        socket.emit('get tasks by user', userId);
      }, 100);
    });
    $('[data-state]').on('dragover', function(event) {
      $(this).addClass('bg-info');
      overActive = $(this);
    });
    $('[data-state]').on('dragleave', function(event) {
      $(this).removeClass('bg-info');
    });
  }
};
