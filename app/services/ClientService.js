TaskManager.service('clients', function($http) {
  this.getAll = function () {
    return $http({
      method: 'GET',
      url   : '/api/clients/get/all'
    });
  };

  this.getSingle = function (id) {
    return $http({
      method: 'GET',
      url   : '/api/clients/get/single/' + id
    });
  };

  this.edit = function (id, data) {
    return $http({
      method: 'POST',
      url   : '/api/clients/edit/' + id,
      params: {
        user: data
      }
    });
  };

  this.add = function (data) {
    return $http({
      method: 'POST',
      url   : '/api/clients/add',
      params: {
        user: data
      }
    });
  };

  this.erase = function (id) {
    return $http({
      method: 'POST',
      url   : '/api/clients/delete/' + id
    });
  };
});
