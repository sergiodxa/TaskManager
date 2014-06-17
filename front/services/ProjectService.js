TaskManager.service('projects', function($http) {
  this.getAll = function () {
    return $http({
      method: 'GET',
      url   : '/api/projects/get/all'
    });
  };

  this.getSingle = function (id) {
    return $http({
      method: 'GET',
      url   : '/api/projects/get/single/' + id
    });
  };

  this.edit = function (id, data) {
    return $http({
      method: 'POST',
      url   : '/api/projects/edit/' + id,
      params: {
        user: data
      }
    });
  };

  this.add = function (data) {
    return $http({
      method: 'POST',
      url   : '/api/projects/add',
      params: {
        user: data
      }
    });
  };

  this.erase = function (id) {
    return $http({
      method: 'POST',
      url   : '/api/projects/delete/' + id
    });
  };
});