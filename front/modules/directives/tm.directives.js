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
