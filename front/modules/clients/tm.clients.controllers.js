(function() {
  /**
  * TM.Clients.Controllers Module
  *
  * Módulo de la parte de clients
  */
  angular.module('TM.Clients.Controllers', [])
    .controller('ClientDetailCtrl', ['$scope', '$routeParams', 'session', 'socket', function ($scope, $routeParams, session, socket) {
      session.auth();

      var id = $routeParams.id;

      socket.emit('get client', id);
      socket.on('return client', function (response) {
        $scope.client = response;
      });

      $scope.deleteClient = function () {
        socket.emit('delete client', id);
      };

      socket.on('client deleted', function (response) {
        window.location = '#/clients';
      });
    }])

    .controller('ClientEditCtrl', ['$scope', '$routeParams', 'session', 'socket', function () {
      session.auth();

      var id = $routeParams.id;

      $scope.clientEdited = false;

      socket.emit('get client', id);
      socket.on('return client', function (response) {
        $scope.client = response;
      });

      $scope.sendForm = function () {
        socket.emit('edit client', {
          id: $scope.client._id,
          data: $scope.client
        });
      };

      socket.on('client edited', function(response) {
        $scope.clientEdited = true;
        $scope.clientEditedTxt = response;
      });

      socket.on('edit client failed', function(response) {
        $scope.errorTxt = response;
      });
    }])

    .controller('ClientListCtrl', ['$scope', 'session', 'socket', function ($scope, session, socket) {
      session.auth();

      socket.emit('get clients');
      socket.on('return clients', function (response) {
        $scope.clients = response;
      });
    }])

    .controller('ClientNewCtrl', ['$scope', 'session', 'socket', function ($scope, session, socket) {
      session.auth();

      $scope.clientCreated = false;

      $scope.client = {};

      $scope.sendForm = function () {
        socket.emit('add client', $scope.client);
      };

      socket.on('client added', function(response) {
        $scope.clientCreated = true;
        $scope.clientCreatedTxt = response;
        $scope.project = {};
      });

      socket.on('add client failed', function(response) {
        $scope.errorTxt = response;
      });
    }]);
})();
