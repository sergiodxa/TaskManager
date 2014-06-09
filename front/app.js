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
    .when('/users/:id', {
      controller : UserDetailCtrl,
      templateUrl: 'views/users/detail.html'
    })
    .otherwise({ redirectTo: '/users' });

}]);