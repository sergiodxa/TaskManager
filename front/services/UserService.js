TaskManager.service('users', function($http) {
  this.getAll = function () {
    return $http({
      method: 'GET',
      url   : '/api/users/get/all'
    });
  };

  this.getSingle = function (id) {
    return $http({
      method: 'GET',
      url   : '/api/users/get/single/' + id
    });
  };
});