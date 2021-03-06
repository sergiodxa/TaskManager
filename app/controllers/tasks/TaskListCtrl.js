function TaskListCtrl ($scope, tasks, session, socket) {
  session.auth();

  var userId    = localStorage.id;
  var overActive;

  socket.emit('get tasks');
  socket.on('return tasks', function (response) {
    $scope.tasks = response;
  });

  // Drag&Drop
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
    var targetTaskUserAssigned = targetTask['userAssigned'];

    if (targetTask.stateName === 'to do' && targetTask.userAssigned === null) {
      targetTask.userAssigned = userId;
    }

    // le cambiamos el stateName y el userAsigned
    targetTask.stateName   = targetState;
    // obtenemos el state como número
    targetTask.state = tasks.getStateNumber(targetState);

    socket.emit('edit task', targetTask);
    setTimeout(function () {
      socket.emit('get tasks');
    }, 100);
  });
  $('[data-state]').on('dragover', function(event) {
    $(this).addClass('active');
    overActive = $(this);
  });
  $('[data-state]').on('dragleave', function(event) {
    $(this).removeClass('active');
  });
};
