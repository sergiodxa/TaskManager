/**
* ScrumManager Module
*
* WebApp para controlar proyectos en base a Scrum.
*/
var ScrumManager = angular.module('ScrumManager', ['ngRoute']);

ScrumManager.config(['$routeProvider', '$locationProvider', function ($routeProvider) {

  $routeProvider
    .when('/miembros', {
      controller : MiembrosListaCtrl,
      templateUrl: 'views/miembros/lista.html'
    })
    .when('/miembros/:id', {
      controller : MiembroDetalleCtrl,
      templateUrl: 'views/miembros/detalle.html'
    })

}]);