function ProjectListCtrl ($scope, projects, session, socket) {
  session.auth();

  socket.emit('get projects');
  socket.on('return projects', function (response) {
    $scope.projects = response;
  });
};
