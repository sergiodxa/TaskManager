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

  this.edit = function (id, data) {
    return $http({
      method: 'POST',
      url   : '/api/users/edit/' + id,
      params: {
        user: data
      }
    });
  };

  this.add = function (data) {
    return $http({
      method: 'POST',
      url   : '/api/users/add',
      params: {
        user: data
      }
    });
  };

  this.erase = function (id) {
    return $http({
      method: 'POST',
      url   : '/api/users/delete/' + id
    });
  };

  this.getOnlyScrumMasters = function () {
    return $http({
      method: 'GET',
      url   : '/api/users/only/scrummasters'
    })
  }
});
