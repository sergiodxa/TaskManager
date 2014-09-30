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
