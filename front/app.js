/**
* TaskManager Module
*
* WebApp para controlar tareas en proyectos.
*/
var TaskManager = angular.module('TaskManager', ['ngRoute']);

TaskManager.config(['$routeProvider', '$locationProvider', function ($routeProvider) {

  $routeProvider
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
    .when('/tasks', {
      controller : TaskListCtrl,
      templateUrl: 'views/tasks/list.html'
    })
    .when('/tasks/single/:id', {})
    .when('/tasks/by/project/:id', {
      controller : TaskByProjectCtrl,
      templateUrl: 'views/tasks/list.html'
    })
    .when('/tasks/by/user/:id', {
      controller : TaskByUserCtrl,
      templateUrl: 'views/tasks/list.html'
    })
    .when('/tasks/edit/:id', {})
    .when('/tasks/add', {})
    .otherwise({ redirectTo: '/tasks' });

}]);
