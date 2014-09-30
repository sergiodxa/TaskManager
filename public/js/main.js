(function () {
  /**
  * TaskManager Module
  *
  * WebApp para controlar tareas en proyectos.
  */
  var TM = angular.module('TaskManager', [
     'ngRoute',
     'TM.Directives',
     'TM.Services',
     'TM.Clients',
     'TM.Login',
     'HTMLTemplates'
    ]);

  TM.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/login', {
          controller : LoginCtrl,
          templateUrl: 'login.html'
        })
        .when('/clients', {
          controller : ClientListCtrl,
          templateUrl: 'clients.list.html'
        })
        .when('/clients/single/:id', {
          controller : ClientDetailCtrl,
          templateUrl: 'clients.detail.html'
        })
        .when('/clients/edit/:id', {
          controller : ClientEditCtrl,
          templateUrl: 'clients.edit.html'
        })
        .when('/clients/add', {
          controller : ClientNewCtrl,
          templateUrl: 'clients.new.html'
        });
        /*.when('/projects', {
          controller : ProjectListCtrl,
          templateUrl: 'projects.list.html'
        })
        .when('/projects/by/client/:id', {
          controller : ProjectByClientCtrl,
          templateUrl: 'projects.list.html'
        })
        .when('/projects/single/:id', {
          controller : ProjectDetailCtrl,
          templateUrl: 'projects.detail.html'
        })
        .when('/projects/edit/:id', {
          controller : ProjectEditCtrl,
          templateUrl: 'projects.edit.html'
        })
        .when('/projects/add', {
          controller : ProjectNewCtrl,
          templateUrl: 'projects.new.html'
        })
        .when('/tasks', {
          controller : TaskByUserCtrl,
          templateUrl: 'tasks.list.html'
        })
        .when('/tasks/single/:id', {
          controller : TaskDetailCtrl,
          templateUrl: 'tasks.detail.html'
        })
        .when('/tasks/by/project/:id', {
          controller : TaskByProjectCtrl,
          templateUrl: 'tasks.list.html'
        })
        .when('/tasks/by/user/:id', {
          controller : TaskByUserCtrl,
          templateUrl: 'tasks.list.html'
        })
        .when('/tasks/edit/:id', {
          controller : TaskEditCtrl,
          templateUrl: 'tasks.edit.html'
        })
        .when('/tasks/add', {
          controller : TaskNewCtrl,
          templateUrl: 'tasks.new.html'
        })
        .when('/tasks/all', {
          controller: TaskListCtrl,
          templateUrl: 'tasks.list.html'
        })
        .when('/users', {
          controller : UserListCtrl,
          templateUrl: 'users.list.html'
        })
        .when('/users/single/:id', {
          controller : UserDetailCtrl,
          templateUrl: 'users.detail.html'
        })
        .when('/users/edit/:id', {
          controller : UserEditCtrl,
          templateUrl: 'users.edit.html'
        })
        .when('/users/add', {
          controller : UserNewCtrl,
          templateUrl: 'users.new.html'
        })
        .otherwise({ redirectTo: '/tasks' });*/
    }]);
})();

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

(function() {
  /**
  * TM.Clients Module
  *
  * Módulo de la parte de clients
  */
  angular.module('TM.Clients', [])
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

(function() {
  /**
  * TM.Directives Module
  *
  * Directivas genéricas de la app
  */
  angular.module('TM.Directives', [])
    .directive('octicon', function () {
      return {
        restrict: 'E',
        template: function (element, attrs) {
          var htmlText = '<span class="octicon octicon-' + attrs.type + '"></span>';
          return htmlText;
        }
      }
    });
})();

(function() {
  /**
  * TM.Login.Controllers Module
  *
  * Módulo de la parte de login
  */
  angular.module('TM.Login.Controllers', [])
    .controller('LoginCtrl', ['$scope', 'session', function ($scope, session) {
      if (sessionStorage.login !== 'checked') {
        sessionStorage.login = 'checked';
        session.auth();
      };

      $scope.sendForm = function () {
        session.login($scope.userName, $scope.pass).then(function (response) {
          localStorage.id    = response.data.id;
          localStorage.user  = response.data.user;
          localStorage.token = response.data.token;

          window.location.hash = '#/tasks';
        });
      };
    }])
    .controller('LogoutCtrl', ['$scope', 'session', function ($scope, session) {
      $scope.logout = function () {
        session.logout();
      }
    }]);
})();

(function() {
  /**
  * TM.Login Module
  *
  * Módulo de la parte de login
  */
  angular.module('TM.Login', [])
    .controller('LoginCtrl', ['$scope', 'session', function ($scope, session) {
      if (sessionStorage.login !== 'checked') {
        sessionStorage.login = 'checked';
        session.auth();
      };

      $scope.sendForm = function () {
        session.login($scope.userName, $scope.pass).then(function (response) {
          localStorage.id    = response.data.id;
          localStorage.user  = response.data.user;
          localStorage.token = response.data.token;

          window.location.hash = '#/tasks';
        });
      };
    }])
    .controller('LogoutCtrl', ['$scope', 'session', function ($scope, session) {
      $scope.logout = function () {
        session.logout();
      }
    }]);
})();

(function() {
  /**
  * TM.Services Module
  *
  * Servicios genéricas de la app
  */
  angular.module('TM.Services', [])
    .service('session', ['$http', function ($http) {
      this.login = function (user, pass) {
        return $http({
          method: 'GET',
          url   : '/session/login',
          params: {
            user: user,
            pass: pass
          }
        });
      };

      this.auth = function () {
        $http({
          method: 'POST',
          url   : '/session/auth',
          params: {
            token: localStorage.token
          }
        }).success(function (data, status) {
          if (window.location.hash === '#/login') {
            window.location.hash = '#/tasks';
          }
        }).error(function () {
          window.location.hash = '#/login';
        });
      };

      this.logout = function () {
        $http({
          method: 'POST',
          url   : '/session/logout',
          params: {
            token: localStorage.token
          }
        }).success(function (data, status) {
          localStorage.removeItem('id');
          localStorage.removeItem('user');
          localStorage.removeItem('token');

          window.location.hash = '#/login';
        }).error(function () {
          alert('We have an error with the logout. Yeah thats weird. If you aren\'t already logged please contact an administrator.');
        });
      };
    }]);
})();

angular.module("HTMLTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("clients.detail.html","<section class=\"row\">\n  <article class=\"column-12-hand section-item\">\n    <div class=\"box\">\n      <h2 class=\"section-item-name\" ng-bind=\"client.clientName\"></h2>\n      <ul class=\"section-item-data\">\n        <li class=\"section-item-data-item\">\n          <octicon type=\"mail\"></octicon>\n          <strong>Email: </strong>\n          <a ng-href=\"mailto:{{client.email}}\" ng-bind=\"client.email\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"location\"></octicon>\n          <strong>Address: </strong>\n          <span ng-bind=\"client.address\"></span>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"device-mobile\"></octicon>\n          <strong>Telephone: </strong>\n          <span ng-bind=\"client.telephone\"></span>\n        </li>\n      </ul>\n      <a ng-href=\"#/projects/by/client/{{client._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"dashboard\"></octicon> View projects\n      </a>\n      <a ng-href=\"#/clients/edit/{{client._id}}\" class=\"btn btn-primary btn-block\">\n        <octicon type=\"pencil\"></octicon> Edit client\n      </a>\n      <a ng-click=\"deleteClient()\" class=\"btn btn-danger btn-block\">\n        <octicon type=\"x\"></octicon> Delete client\n      </a>\n    </div>\n  </article>\n</section>");
$templateCache.put("clients.edit.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        Edit client <strong ng-bind=\"client.name\"></strong>\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"clientEdited\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"clientEditedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- client name -->\n      <label>\n        <span>Client name</span>\n        <input type=\"text\" id=\"clientname\" ng-model=\"client.clientName\" placeholder=\"Client name\" required>\n      </label>\n<!-- client email -->\n      <label>\n        <span>Email</span>\n        <input type=\"text\" id=\"email\" ng-model=\"client.email\" placeholder=\"Email\" required>\n      </label>\n<!-- client address -->\n      <label>\n        <span>Address</span>\n        <input type=\"text\" id=\"address\" ng-model=\"client.address\" placeholder=\"Address\" required>\n      </label>\n<!-- client telephone -->\n      <label>\n        <span>Telephone</span>\n        <input type=\"text\" id=\"telephone\" ng-model=\"client.telephone\" placeholder=\"Telephone\" required>\n      </label>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Edit client\n      </button>\n    </form>\n  </article>\n</section>\n");
$templateCache.put("clients.list.html","<section class=\"row\">\n  <legend class=\"section-title text-center column-12-hand\">\n    Clients\n    <a ng-href=\"#/clients/add/\" class=\"btn btn-primary pull-right\">\n      <octicon type=\"plus\"></octicon> Add client\n    </a>\n  </legend>\n  <article ng-repeat=\"client in clients\" class=\"column-12-hand column-6-lap section-item\">\n    <div class=\"box\">\n      <h2 class=\"section-item-name\" ng-bind=\"client.clientName\"></h2>\n      <ul class=\"section-item-data\">\n        <li class=\"section-item-data-item\">\n          <octicon type=\"mail\"></octicon>\n          <strong>Email: </strong>\n          <a ng-href=\"mailto:{{client.email}}\" ng-bind=\"client.email\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"location\"></octicon>\n          <strong>Address: </strong>\n          <span ng-bind=\"client.address\"></span>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"device-mobile\"></octicon>\n          <strong>Telephone: </strong>\n          <span ng-bind=\"client.telephone\"></span>\n        </li>\n      </ul>\n      <a ng-href=\"#/clients/single/{{client._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"info\"></octicon> View details\n      </a>\n      <a ng-href=\"#/projects/by/client/{{client._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"dashboard\"></octicon> View projects\n      </a>\n    </div>\n  </article>\n</section>");
$templateCache.put("clients.new.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        New client\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"clientCreated\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"clientCreatedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- client name -->\n      <label>\n        <span>Client name</span>\n        <input type=\"text\" id=\"clientname\" ng-model=\"client.clientName\" placeholder=\"Client name\" required>\n      </label>\n<!-- client email -->\n      <label>\n        <span>Email</span>\n        <input type=\"text\" id=\"email\" ng-model=\"client.email\" placeholder=\"Email\" required>\n      </label>\n<!-- client adress -->\n      <label>\n        <span>Address</span>\n        <input type=\"text\" id=\"address\" ng-model=\"client.address\" placeholder=\"Address\" required>\n      </label>\n<!-- client telehpone -->\n      <label>\n        <span>Telephone</span>\n        <input type=\"text\" id=\"telephone\" ng-model=\"client.telephone\" placeholder=\"Telephone\" required>\n      </label>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Create client\n      </button>\n    </form>\n  </article>\n</section>\n");
$templateCache.put("login.html","<div class=\"container\">\n  <h1>Login</h1>\n  <form ng-submit=\"sendForm()\">\n    <label>\n      <span>User name</span>\n      <input type=\"text\" id=\"userName\" ng-model=\"userName\" placeholder=\"User name\" required>\n    </label>\n    <label>\n      <span>Password</span>\n      <input type=\"password\" id=\"pass\" ng-model=\"pass\" placeholder=\"Password\" required>\n    </label>\n    <button type=\"submit\" class=\"btn btn-primary\">Login</button>\n  </form>\n</div>");
$templateCache.put("projects.detail.html","<section class=\"row\">\n  <article class=\"column-12-hand section-item\">\n    <div class=\"box\">\n      <h2 class=\"section-item-name\" ng-bind=\"project.projectName\"></h2>\n      <a ng-if=\"project.githubRepo !== null\" ng-href=\"{{project.githubRepo}}\" target=\"_blank\" class=\"pull-right\">\n        <octicon type=\"logo-github\"></octicon>\n      </a>\n      <ul class=\"section-item-data\">\n        <li class=\"section-item-data-item\">\n          <octicon type=\"organization\"></octicon>\n          <strong>Project owner: </strong>\n          <a ng-href=\"#/clients/single/{{project.owner._id}}\" ng-bind=\"project.owner.clientName\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"person\"></octicon>\n          <strong>Project Leader: </strong>\n          <a ng-href=\"#/users/single/{{project.projectLeader._id}}\">{{project.projectLeader.firstName}} {{project.projectLeader.lastName}}</a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"rocket\"></octicon>\n          <strong>Release date: </strong>\n          <span>{{project.releaseDate | date:\'dd/MM/yyyy\'}}</span>\n        </li>\n      </ul>\n      <div class=\"section-item-description\" ng-bind=\"project.description\"></div>\n      <a ng-href=\"#/tasks/by/project/{{project._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"dashboard\"></octicon> View tasks\n      </a>\n      <a ng-href=\"#/projects/edit/{{project._id}}\" class=\"btn btn-primary btn-block\">\n        <octicon type=\"pencil\"></octicon> Edit project\n      </a>\n      <a ng-click=\"deleteProject()\" class=\"btn btn-danger btn-block\">\n        <octicon type=\"x\"></octicon> Delete project\n      </a>\n    </div>\n  </article>\n</section>\n");
$templateCache.put("projects.edit.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        Edit project <strong ng-bind=\"project.projectName\"></strong>\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"projectEdited\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"projectEditedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- project name -->\n      <label>\n        <span>Project name</span>\n        <input type=\"text\" id=\"projectname\" ng-model=\"project.projectName\" placeholder=\"Project name\" required>\n      </label>\n<!-- project owner -->\n      <label>\n        <span>Owner</span>\n        <select name=\"owner\" id=\"owner\" required ng-model=\"project.owner\">\n          <option ng-repeat=\"client in clients\" value=\"{{client._id}}\">{{client.clientName}}</option>\n        </select>\n      </label>\n<!-- project project leader -->\n      <label>\n        <span>Project Leader</span>\n        <select name=\"projectleader\" id=\"projectleader\" required ng-model=\"project.projectLeader\">\n          <option ng-repeat=\"user in users\" value=\"{{user._id}}\">{{user.firstName}} {{user.lastName}}</option>\n        </select>\n      </label>\n<!-- project description -->\n      <label>\n        <span>Description</span>\n        <textarea id=\"description\" ng-model=\"project.description\" placeholder=\"Description\" required rows=\"4\"></textarea>\n      </label>\n<!-- project release date -->\n      <label>\n        <span>Release Date</span>\n        <input type=\"text\" id=\"release-date\" ng-model=\"project.releaseDate\" placeholder=\"Release date\" required>\n      </div>\n<!-- project github repository -->\n      <label>\n        <span>Github Repository</span>\n        <input type=\"text\" id=\"github-repo\" ng-model=\"project.githubRepo\" placeholder=\"Github Repository (optional)\">\n      </label>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Edit project\n      </button>\n    </form>\n  </article>\n</section>\n");
$templateCache.put("projects.list.html","<section class=\"row\">\n  <legend class=\"section-title text-center column-12-hand\">\n    Projects\n    <a ng-href=\"#/projects/add/\" class=\"btn btn-primary pull-right\">\n      <octicon type=\"plus\"></octicon> Add project\n    </a>\n  </legend>\n  <article ng-repeat=\"project in projects\" class=\"column-12-hand column-6-lap section-item\">\n    <div class=\"box\">\n      <h2 class=\"section-item-name\" ng-bind=\"project.projectName\"></h2>\n      <a ng-if=\"project.githubRepo !== null\" ng-href=\"{{project.githubRepo}}\" target=\"_blank\" class=\"pull-right\">\n        <octicon type=\"logo-github\"></octicon>\n      </a>\n      <ul class=\"section-item-data\">\n        <li class=\"section-item-data-item\">\n          <octicon type=\"organization\"></octicon>\n          <strong>Project owner: </strong>\n          <a ng-href=\"#/clients/single/{{project.owner._id}}\" ng-bind=\"project.owner.clientName\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"person\"></octicon>\n          <strong>Project Leader: </strong>\n          <a ng-href=\"#/users/single/{{project.projectLeader._id}}\">{{project.projectLeader.firstName}} {{project.projectLeader.lastName}}</a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"rocket\"></octicon>\n          <strong>Release date: </strong>\n          <span>{{project.releaseDate | date:\'dd/MM/yyyy\'}}</span>\n        </li>\n      </ul>\n      <a ng-href=\"#/projects/single/{{project._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"info\"></octicon> View details\n      </a>\n      <a ng-href=\"#/tasks/by/project/{{project._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"dashboard\"></octicon> View tasks\n      </a>\n    </div>\n  </article>\n</section>\n");
$templateCache.put("projects.new.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        New project\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"projectCreated\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"projectCreatedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- project name -->\n      <label>\n        <span>Project name</span>\n        <input type=\"text\" id=\"projectname\" ng-model=\"project.projectName\" placeholder=\"Project name\" required>\n      </label>\n<!-- project owner -->\n      <label>\n        <span>Owner</span>\n        <select name=\"owner\" id=\"owner\" required ng-model=\"project.owner\">\n          <option ng-repeat=\"client in clients\" value=\"{{client._id}}\">{{client.clientName}}</option>\n        </select>\n      </label>\n<!-- project project leader -->\n      <label>\n        <span>Project Leader</span>\n        <select name=\"projectleader\" id=\"projectleader\" required ng-model=\"project.projectLeader\">\n          <option ng-repeat=\"user in users\" value=\"{{user._id}}\">{{user.firstName}} {{user.lastName}}</option>\n        </select>\n      </label>\n<!-- project description -->\n      <label>\n        <span>Description</span>\n        <textarea id=\"description\" ng-model=\"project.description\" placeholder=\"Description\" required rows=\"4\"></textarea>\n      </label>\n<!-- project release date -->\n      <label>\n        <span>Release Date</span>\n        <input type=\"text\" id=\"release-date\" ng-model=\"project.releaseDate\" placeholder=\"Release date\" required>\n      </div>\n<!-- project github repository -->\n      <label>\n        <span>Github Repository</span>\n        <input type=\"text\" id=\"github-repo\" ng-model=\"project.githubRepo\" placeholder=\"Github Repository (optional)\">\n      </label>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Create project\n      </button>\n    </form>\n  </article>\n</section>\n");
$templateCache.put("tasks.detail.html","<section class=\"row\">\n  <article class=\"column-12-hand section-item\">\n    <div class=\"box\">\n      <span class=\"pull-right\" ng-if=\"task.stateName != \'completed\'\n      \">\n        <octicon type=\"issue-opened\"></octicon>\n      </span>\n      <span class=\"pull-right\" ng-if=\"task.stateName == \'completed\'\n      \">\n        <octicon type=\"issue-closed\"></octicon>\n      </span>\n      <h2 class=\"section-item-name\" ng-bind=\"task.taskName\"></h2>\n      <ul class=\"section-item-data\">\n        <li class=\"section-item-data-item\">\n          <octicon type=\"repo\"></octicon>\n          <strong>Project: </strong>\n          <a ng-href=\"#/projects/single/{{task.project}}\" ng-bind=\"task.projectName\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"person\"></octicon>\n          <strong>Assigned to: </strong>\n          <a ng-href=\"#/users/single/{{task.userAssigned}}\" ng-bind=\"task.fullName\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"clock\"></octicon>\n          <strong>Estimated time: </strong>\n          <span ng-bind=\"task.estimatedTime\"></span>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"clock\"></octicon>\n          <strong>Required time: </strong>\n          <span ng-bind=\"task.requiredTime\"></span>\n        </li>\n      </ul>\n      <div class=\"section-item-description\" ng-bind=\"task.description\"></div>\n      <a ng-href=\"#/tasks/edit/{{task._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"pencil\"></octicon> Edit task\n      </a>\n      <a ng-click=\"deleteTask()\" class=\"btn btn-danger btn-block\">\n        <octicon type=\"x\"></octicon> Delete client\n      </a>\n    </div>\n  </article>\n</section>");
$templateCache.put("tasks.edit.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        Edit task <strong ng-bind=\"task.taskName\"></strong>\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"taskEdited\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"taskEditedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- task name -->\n      <label>\n        <span>Name</span>\n        <input type=\"text\" id=\"taskname\" ng-model=\"task.taskName\" placeholder=\"Taskname\" required>\n      </label>\n<!-- task description -->\n      <label>\n        <span>Description</span>\n        <textarea id=\"description\" ng-model=\"task.description\" placeholder=\"Description\" required rows=\"4\"></textarea>\n      </label>\n<!-- task project -->\n      <label>\n        <span>Project</span>\n        <select name=\"project\" id=\"project\" required ng-model=\"task.project\">\n          <option ng-repeat=\"project in projects\" value=\"{{project._id}}\">{{project.projectName}}</option>\n        </select>\n      </label>\n<!-- task user assigned -->\n      <label>\n        <span>User assigned</span>\n        <select name=\"user\" id=\"user\" required ng-model=\"task.userAssigned\">\n          <option ng-repeat=\"user in users\" value=\"{{user._id}}\">{{user.firstName}} {{user.lastName}}</option>\n        </select>\n      </label>\n<!-- task priority -->\n      <label>\n        <span>Priority:</span>\n        <input type=\"number\" id=\"priority\" ng-model=\"task.priority\" placeholder=\"Priority\" required>\n      </label>\n<!-- task estimated time -->\n      <label>\n        <span>Estimated time</span>\n        <select name=\"estimated-time\" id=\"estimated-time\" ng-model=\"task.estimatedTime\" required>\n          <option value=\"1\">1</option>\n          <option value=\"2\">2</option>\n          <option value=\"4\">4</option>\n          <option value=\"6\">6</option>\n          <option value=\"8\">8</option>\n        </select>\n      </label>\n<!-- task required time -->\n      <label>\n        <span>Required time</span>\n        <select name=\"required-time\" id=\"required-time\" ng-model=\"task.requiredTime\" required>\n          <option value=\"1\">1</option>\n          <option value=\"2\">2</option>\n          <option value=\"4\">4</option>\n          <option value=\"6\">6</option>\n          <option value=\"8\">8</option>\n        </select>\n      </label>\n<!-- task status -->\n      <label>\n        <span>Status</span>\n        <select name=\"status\" id=\"status\" ng-model=\"task.stateName\" required>\n          <option value=\"to do\">To do</option>\n          <option value=\"in progress\">In progress</option>\n          <option value=\"in testing\">In testing</option>\n          <option value=\"completed\">Completed</option>\n        </select>\n      </label>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Edit task\n      </button>\n    </form>\n  </article>\n</section>\n");
$templateCache.put("tasks.list.html","<div class=\"row tasks\">\n\n  <!-- tareas pendientes -->\n  <section class=\"column-12-hand column-auto-lap\" data-state=\"1\">\n    <legend class=\"task-state text-center\">\n      To do\n      <a ng-href=\"#/tasks/add/\" class=\"task-state-add\">\n        <octicon type=\"plus\"></octicon> Add task\n      </a>\n    </legend>\n    <article ng-repeat=\"task in tasks | filter: {state: 1}\" class=\"task box\" draggable=\"true\" data-index=\"{{$index}}\">\n      <span title=\"Open\" class=\"octicon octicon-issue-opened pull-right\"></span>\n\n      <h3 ng-bind=\"task.taskName\" class=\"task-title\"></h3>\n\n      <ul class=\"task-data\">\n        <li class=\"task-data-item\">\n          <strong>Project: </strong>\n          <a ng-href=\"#/projects/single/{{task.project._id}}\" ng-bind=\"task.project.projectName\"></a>\n        </li>\n        <li class=\"task-data-item\" ng-if=\"task.userAssigned !== null\">\n          <strong>Assigned to: </strong>\n          <a ng-href=\"#/users/single/{{task.userAssigned._id}}\">{{task.userAssigned.firstName}} {{task.userAssigned.lastName}}</a>\n        </li>\n        <li class=\"task-data-item\">\n          <strong>Estimated time: </strong>\n          <span ng-bind=\"task.estimatedTime\"></span> hours\n        </li>\n      </ul>\n\n      <div class=\"task-actions\">\n        <a ng-href=\"#/tasks/single/{{task._id}}\" class=\"task-issue\">\n          <octicon type=\"info\"></octicon> View details\n        </a>\n      </div>\n    </article>\n  </section>\n\n  <!-- tareas en progreso -->\n  <section class=\"column-12-hand column-auto-lap\" data-state=\"2\">\n    <legend class=\"task-state text-center\">In progress</legend>\n    <article ng-repeat=\"task in tasks | filter: {state: 2}\" class=\"task box\" draggable=\"true\" data-index=\"{{$index}}\">\n      <span title=\"Open\" class=\"octicon octicon-issue-opened pull-right\"></span>\n\n      <h3 ng-bind=\"task.taskName\" class=\"task-title\"></h3>\n\n      <ul class=\"task-data\">\n        <li class=\"task-data-item\">\n          <strong>Project: </strong>\n          <a ng-href=\"#/projects/single/{{task.project._id}}\" ng-bind=\"task.project.projectName\"></a>\n        </li>\n        <li class=\"task-data-item\" ng-if=\"task.userAssigned !== null\">\n          <strong>Doing: </strong>\n          <a ng-href=\"#/users/single/{{task.userAssigned._id}}\">{{task.userAssigned.firstName}} {{task.userAssigned.lastName}}</a>\n        </li>\n        <li class=\"task-data-item\">\n          <strong>Estimated time: </strong>\n          <span ng-bind=\"task.estimatedTime\"></span> hours\n        </li>\n      </ul>\n\n      <div class=\"task-actions\">\n        <a ng-href=\"#/tasks/single/{{task._id}}\" class=\"task-issue\">\n          <octicon type=\"info\"></octicon> View details\n        </a>\n      </div>\n    </article>\n  </section>\n\n  <!-- tareas en pruebas -->\n  <section class=\"column-12-hand column-auto-lap\" data-state=\"3\">\n    <legend class=\"task-state text-center\">In testing</legend>\n    <article ng-repeat=\"task in tasks | filter: {state: 3}\" class=\"task box\" draggable=\"true\" data-index=\"{{$index}}\">\n      <span title=\"Open\" class=\"octicon octicon-issue-opened pull-right\"></span>\n\n      <h3 ng-bind=\"task.taskName\" class=\"task-title\"></h3>\n\n      <ul class=\"task-data\">\n        <li class=\"task-data-item\">\n          <strong>Project: </strong>\n          <a ng-href=\"#/projects/single/{{task.project._id}}\" ng-bind=\"task.project.projectName\"></a>\n        </li>\n        <li class=\"task-data-item\" ng-if=\"task.userAssigned !== null\">\n          <strong>Testing: </strong>\n          <a ng-href=\"#/users/single/{{task.userAssigned._id}}\">{{task.userAssigned.firstName}} {{task.userAssigned.lastName}}</a>\n        </li>\n        <li class=\"task-data-item\">\n          <strong>Estimated time: </strong>\n          <span ng-bind=\"task.estimatedTime\"></span> hours\n        </li>\n      </ul>\n\n      <div class=\"task-actions\">\n        <a ng-href=\"#/tasks/single/{{task._id}}\" class=\"task-issue\">\n          <octicon type=\"info\"></octicon> View details\n        </a>\n      </div>\n    </article>\n  </section>\n\n  <!-- tareas completas -->\n  <section class=\"column-12-hand column-auto-lap\" data-state=\"4\">\n    <legend class=\"task-state text-center\">Completed</legend>\n    <article ng-repeat=\"task in tasks | filter: {state: 4}\" class=\"task box\" draggable=\"true\" data-index=\"{{$index}}\">\n      <span title=\"Closed\" class=\"octicon octicon-issue-closed pull-right\"></span>\n\n      <h3 ng-bind=\"task.taskName\" class=\"task-title\"></h3>\n\n      <ul class=\"task-data\">\n        <li class=\"task-data-item\">\n          <strong>Project: </strong>\n          <a ng-href=\"#/projects/single/{{task.project._id}}\" ng-bind=\"task.project.projectName\"></a>\n        </li>\n        <li class=\"task-data-item\">\n          <strong>Estimated time: </strong>\n          <span ng-bind=\"task.estimatedTime\"></span> hours\n        </li>\n        <li class=\"task-data-item\" ng-if=\"task.requiredTime != NULL\">\n          <strong>Required time: </strong>\n          <span ng-bind=\"task.requiredTime\"></span> hours\n        </li>\n      </ul>\n\n      <div class=\"task-actions\">\n        <a ng-href=\"#/tasks/single/{{task._id}}\" class=\"task-issue\">\n          <octicon type=\"info\"></octicon> View details\n        </a>\n      </div>\n    </article>\n  </section>\n\n</div>\n");
$templateCache.put("tasks.new.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        New task\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"taskCreated\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"taskCreatedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- task name -->\n      <label>\n        <span>Name</span>\n        <input type=\"text\" id=\"taskname\" ng-model=\"task.taskName\" placeholder=\"Taskname\" required>\n      </label>\n<!-- task description -->\n      <label>\n        <span>Description</span>\n        <textarea id=\"description\" ng-model=\"task.description\" placeholder=\"Description\" required rows=\"4\"></textarea>\n      </label>\n<!-- task project -->\n      <label>\n        <span>Project</span>\n        <select name=\"project\" id=\"project\" required ng-model=\"task.project\">\n          <option ng-repeat=\"project in projects\" value=\"{{project._id}}\">{{project.projectName}}</option>\n        </select>\n      </label>\n<!-- task user assigned -->\n      <label>\n        <span>User assigned</span>\n        <select name=\"user\" id=\"user\" required ng-model=\"task.userAssigned\">\n          <option ng-repeat=\"user in users\" value=\"{{user._id}}\">{{user.firstName}} {{user.lastName}}</option>\n        </select>\n      </label>\n<!-- task priority -->\n      <label>\n        <span>Priority:</span>\n        <input type=\"number\" id=\"priority\" ng-model=\"task.priority\" placeholder=\"Priority\" required>\n      </label>\n<!-- task estimated time -->\n      <label>\n        <span>Estimated time</span>\n        <select name=\"estimated-time\" id=\"estimated-time\" ng-model=\"task.estimatedTime\" required>\n          <option value=\"1\">1</option>\n          <option value=\"2\">2</option>\n          <option value=\"4\">4</option>\n          <option value=\"6\">6</option>\n          <option value=\"8\">8</option>\n        </select>\n      </label>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Add task\n      </button>\n    </form>\n  </article>\n</section>\n");
$templateCache.put("users.detail.html","<section class=\"row\">\n  <article class=\"column-12-hand section-item\">\n    <div class=\"box\">\n      <h2 class=\"section-item-name\">{{user.firstName}} {{user.lastName}}</h2>\n      <figure class=\"pull-right\">\n        <img ng-src=\"./img/avatars/{{user.userName}}.jpg\" alt=\"\" class=\"img-rounded circle img-responsive\">\n      </figure>\n      <ul class=\"section-item-data\">\n        <li class=\"section-item-data-item\">\n          <octicon type=\"mail\"></octicon>\n          <strong>Email: </strong>\n          <a ng-href=\"mailto:{{user.email}}\" ng-bind=\"user.email\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"jersey\"></octicon>\n          <strong>Position: </strong>\n          <span ng-bind=\"user.position\"></span>\n        </li>\n      </ul>\n      <a ng-href=\"#/tasks/by/user/{{user._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"dashboard\"></octicon> View tasks\n      </a>\n      <a ng-href=\"#/users/edit/{{user._id}}\" class=\"btn btn-primary btn-block\">\n        <octicon type=\"pencil\"></octicon> Edit user\n      </a>\n      <a ng-click=\"deleteUser()\" class=\"btn btn-danger btn-block\">\n        <octicon type=\"x\"></octicon> Delete user\n      </a>\n    </div>\n  </article>\n</section>");
$templateCache.put("users.edit.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        Edit user <strong>{{user.firstName}} {{user.lastName}}</strong>\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"userEdited\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"userEditedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- user name -->\n      <label>\n        <span>User name</span>\n        <input type=\"text\" id=\"username\" ng-model=\"user.userName\" placeholder=\"User name\" required>\n      </label>\n<!-- user email -->\n      <label>\n        <span>Email</span>\n        <input type=\"text\" id=\"email\" ng-model=\"user.email\" placeholder=\"Email\" required>\n      </label>\n<!-- user first name -->\n      <label>\n        <span>First name</span>\n        <input type=\"text\" id=\"first-name\" ng-model=\"user.firstName\" placeholder=\"First name\" required>\n      </label>\n<!-- user last name -->\n      <label>\n        <span>Last name</span>\n        <input type=\"text\" id=\"last-name\" ng-model=\"user.lastName\" placeholder=\"Last name\" required>\n      </label>\n<!-- user last name -->\n      <label>\n        <span>Position</span>\n        <input type=\"text\" id=\"position\" ng-model=\"user.position\" placeholder=\"Position\" required>\n      </label>\n\n      <legend>Change password</legend>\n<!-- user actual password -->\n      <label>\n        <span>Actual password</span>\n        <input type=\"password\" id=\"password\" ng-model=\"user.actualPass\" placeholder=\"Actual password\" ng-change=\"actualPassCheck()\">\n      </label>\n<!-- actual password wrong alert -->\n      <div ng-if=\"actualPassIncorrect\" class=\"alert alert-warning\">\n          Actual password incorrect!\n      </div>\n<!-- user new password -->\n      <label>\n        <span>New password</span>\n        <input type=\"password\" id=\"new-pass\" ng-model=\"user.newPass\" placeholder=\"New password\" ng-change=\"newPassCheck()\">\n      </label>\n<!-- user new password repeated -->\n      <label>\n        <span>Repeat password</span>\n        <input type=\"password\" id=\"repeat-pass\" ng-model=\"user.repeatPass\" placeholder=\"Repeat password\" ng-change=\"newPassCheck()\">\n      </label>\n<!-- alert new and repeated password don\'t match -->\n      <div ng-if=\"newPassIncorrect\" class=\"alert alert-danger\">\n          The passwords are incorrect!\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Edit user\n      </button>\n    </form>\n  </article>\n</section>");
$templateCache.put("users.list.html","<section class=\"row\">\n  <legend class=\"section-title text-center column-12-hand\">\n    Users\n    <a ng-href=\"#/users/add/\" class=\"btn btn-primary pull-right\">\n      <octicon type=\"plus\"></octicon> Add user\n    </a>\n  </legend>\n  <article ng-repeat=\"user in users\" class=\"column-12-hand column-6-lap section-item\">\n    <div class=\"box\">\n      <h2 class=\"section-item-name\">{{user.firstName}} {{user.lastName}}</h2>\n      <ul class=\"section-item-data\">\n        <li class=\"section-item-data-item\">\n          <octicon type=\"mail\"></octicon>\n          <strong>Email: </strong>\n          <a ng-href=\"mailto:{{user.email}}\" ng-bind=\"user.email\"></a>\n        </li>\n        <li class=\"section-item-data-item\">\n          <octicon type=\"jersey\"></octicon>\n          <strong>Position: </strong>\n          <span ng-bind=\"user.position\"></span>\n        </li>\n      </ul>\n      <a ng-href=\"#/users/single/{{user._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"info\"></octicon> View details\n      </a>\n      <a ng-href=\"#/tasks/by/user/{{user._id}}\" class=\"btn btn-info btn-block\">\n        <octicon type=\"dashboard\"></octicon> View tasks\n      </a>\n    </div>\n  </article>\n</section>");
$templateCache.put("users.new.html","<section class=\"row\">\n  <article class=\"column-12-hand\">\n    <form role=\"form\" ng-submit=\"sendForm()\">\n      <h2 class=\"form-title\">\n        Create new user\n      </h2>\n<!-- success alert -->\n      <div class=\"alert alert-success\" ng-if=\"userEdited\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"userEditedTxt\"></span>\n      </div>\n<!-- error alert -->\n      <div class=\"alert alert-danger\" ng-if=\"errorText\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;</button>\n        <span ng-bind=\"errorText\"></span>\n      </div>\n<!-- user name -->\n      <label>\n        <span>User name</span>\n        <input type=\"text\" id=\"username\" ng-model=\"user.userName\" placeholder=\"User name\" required>\n      </label>\n<!-- user email -->\n      <label>\n        <span>Email</span>\n        <input type=\"text\" id=\"email\" ng-model=\"user.email\" placeholder=\"Email\" required>\n      </label>\n<!-- user first name -->\n      <label>\n        <span>First name</span>\n        <input type=\"text\" id=\"first-name\" ng-model=\"user.firstName\" placeholder=\"First name\" required>\n      </label>\n<!-- user last name -->\n      <label>\n        <span>Last name</span>\n        <input type=\"text\" id=\"last-name\" ng-model=\"user.lastName\" placeholder=\"Last name\" required>\n      </label>\n<!-- user last name -->\n      <label>\n        <span>Position</span>\n        <input type=\"text\" id=\"position\" ng-model=\"user.position\" placeholder=\"Position\" required>\n      </label>\n\n      <legend>Create password</legend>\n<!-- user new password -->\n      <label>\n        <span>Password</span>\n        <input type=\"password\" id=\"new-pass\" ng-model=\"user.newPass\" placeholder=\"New password\" ng-change=\"newPassCheck()\">\n      </label>\n<!-- user new password repeated -->\n      <label>\n        <span>Repeat password</span>\n        <input type=\"password\" id=\"repeat-pass\" ng-model=\"user.repeatPass\" placeholder=\"Repeat password\" ng-change=\"newPassCheck()\">\n      </label>\n<!-- alert new and repeated password don\'t match -->\n      <div ng-if=\"newPassIncorrect\" class=\"alert alert-danger\">\n          The passwords are incorrect!\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Create user\n      </button>\n    </form>\n  </article>\n</section>\n");}]);