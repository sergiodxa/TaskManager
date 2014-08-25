function TaskByProjectCtrl ($scope, $routeParams, session, socket) {
  session.auth();

  var projectId = $routeParams.id;
  var userId    = localStorage.id;
  var overActive;

  socket.emit('get tasks by project', projectId);
  socket.on('return tasks by project', function (response) {
    if (response[0].project._id == projectId) {
      $scope.tasks = response;
    }
  });

  // Drag&Drop
  $('[data-state]').on('dragend', '[draggable]', function(event) {
    var taskList    = []; // creamos un array vacío
    var state       = $(this).parent().attr('data-state'); // obtenemos el stateName de la columna inicial
    var index       = $(this).attr('data-index'); // obtenemos la posición de la tarea dentro de la columna
    var targetState = $(overActive).attr('data-state'); // obtenemos el stateName objetivo

    // recorremos todas las tareas para buscar las que tengan el stateName inicial
    for (var i = 0; i < $scope.tasks.length; i++) {
      if ($scope.tasks[i].state === parseInt(state)) {
        taskList.push($scope.tasks[i]);
      };
    };

    // obtenemos los datos de la tarea
    var targetTask   = taskList[index];
    var targetTaskId = targetTask['_id'];
    var targetTaskUserAssigned = targetTask['userAssigned'];

   targetTask.project = targetTask.project._id;

    if ((targetTask.state === '1' && targetTask.userAssigned === null) || targetTask.userAssigned === null) {
      targetTask.userAssigned = userId;
    } else {
      targetTask.userAssigned = targetTask.userAssigned._id;
    }

    // obtenemos el state como número
    targetTask.state = targetState;

    delete targetTask["$$hashKey"];

    socket.emit('edit task', { id: targetTask._id, data: targetTask });

    setTimeout(function () {
      socket.emit('get tasks by project', projectId);
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
