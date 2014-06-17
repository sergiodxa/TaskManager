/**
* TaskManager Module
*
* WebApp para controlar tareas en proyectos.
*/
var TaskManager = angular.module('TaskManager', ['ngRoute']);

TaskManager.config(['$routeProvider', '$locationProvider', function ($routeProvider) {

  $routeProvider
    /*.when('/clients', {
      controller : ClientListCtrl,
      templateUrl: 'views/clients/list.html'
    })
    .when('/clients/single/:id', {
      controller : ClientDetailCtrl,
      templateUrl: 'views/clients/detail.html'
    })
    .when('/clients/edit/:id', {
      controller : ClientEditCtrl,
      templateUrl: 'views/clients/edit.html'
    })
    .when('/clients/add', {
      controller : ClientNewCtrl,
      templateUrl: 'views/clients/new.html'
    })*/
    .when('/projects', {
      controller : ProjectListCtrl,
      templateUrl: 'views/projects/list.html'
    })
    .when('/projects/single/:id', {
      controller : ProjectDetailCtrl,
      templateUrl: 'views/projects/detail.html'
    })
    .when('/projects/edit/:id', {
      controller : ProjectEditCtrl,
      templateUrl: 'views/projects/edit.html'
    })
    .when('/projects/add', {
      controller : ProjectNewCtrl,
      templateUrl: 'views/users/new.html'
    })
    .when('/tasks', {
      controller : TaskListCtrl,
      templateUrl: 'views/tasks/list.html'
    })
    .when('/tasks/single/:id', {
      controller : TaskDetailCtrl,
      templateUrl: 'views/tasks/detail.html'
    })
    .when('/tasks/by/project/:id', {
      controller : TaskByProjectCtrl,
      templateUrl: 'views/tasks/list.html'
    })
    .when('/tasks/by/user/:id', {
      controller : TaskByUserCtrl,
      templateUrl: 'views/tasks/list.html'
    })
    .when('/tasks/edit/:id', {
      controller : TaskEditCtrl,
      templateUrl: 'views/tasks/edit.html'
    })
    .when('/tasks/add', {
      controller : TaskNewCtrl,
      templateUrl: 'views/tasks/new.html'
    })
    .when('/users', {
      controller : UserListCtrl,
      templateUrl: 'views/users/list.html'
    })
    .when('/users/single/:id', {
      controller : UserDetailCtrl,
      templateUrl: 'views/users/detail.html'
    })
    .when('/users/edit/:id', {
      controller : UserEditCtrl,
      templateUrl: 'views/users/edit.html'
    })
    .when('/users/add', {
      controller : UserNewCtrl,
      templateUrl: 'views/users/new.html'
    })
    .otherwise({ redirectTo: '/tasks' });

}]);
