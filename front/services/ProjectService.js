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
        project: data
      }
    });
  };

  this.add = function (data) {
    return $http({
      method: 'POST',
      url   : '/api/projects/add',
      params: {
        project: data
      }
    });
  };

  this.erase = function (id) {
    return $http({
      method: 'POST',
      url   : '/api/projects/delete/' + id
    });
  };

  this.getByClient = function (id) {
    return $http({
      method: 'GET',
      url   : '/api/projects/by/client/' + id
    });
  };

  this.getOnlyScrumMasters = function () {
    return $http({
      method: 'GET',
      url   : '/api/users/only/scrummasters'
    });
  };
});
