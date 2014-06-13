TaskManager.service('tasks', function($http) {
  this.getAll = function () {
    return $http({
      method: 'GET',
      url   : '/api/tasks/get/all'
    });
  };

  this.getSingle = function (id) {
    return $http({
      method: 'GET',
      url   : '/api/tasks/get/single/' + id
    });
  };

  this.getByUser = function (id) {
    return $http({
      method: 'GET',
      url   : '/api/tasks/get/by/user/' + id
    });
  };

  this.getByProject = function (id) {
    return $http({
      method: 'GET',
      url   : '/api/tasks/get/by/project/' + id
    });
  };

  this.edit = function (id, data) {
    return $http({
      method: 'POST',
      url   : '/api/tasks/edit/' + id,
      params: {
        user: data
      }
    });
  };

  this.add = function (data) {
    return $http({
      method: 'POST',
      url   : '/api/tasks/add',
      params: {
        user: data
      }
    });
  };

  this.erase = function (id) {
    return $http({
      method: 'POST',
      url   : '/api/tasks/delete/' + id
    });
  };
});
