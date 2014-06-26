TaskManager.service('github', function ($http){

  var api_url = "https://api.github.com";

  this.getReadme = function (owner, repo) {
    return $http({
      method : 'GET',
      url    : api_url + '/repos/' + owner + '/' + repo + '/readme',
      headers: {
        'Accept' : 'application/vnd.github.VERSION.raw'
      }
    });
  };

  this.getUserData = function (userName) {
    return $http({
      method: 'GET',
      url   : api_url + '/users/' + userName
    });
  };

  this.getUserByOrg = function (orgName) {
    return $http({
      method: 'GET',
      url   : api_url + '/orgs/' + orgName + 'members'
    });
  };

  this.checkMembership = function (orgName, userName) {
    return $http({
      method: 'GET',
      url   : api_url + '/orgs/' + orgName + 'members/' + userName
    });
  };

  this.getRepositoriesByOrg = function (orgName) {
    return $http({
      method: 'GET',
      url   : api_url + '/orgs/' + orgName + '/repos'
    });
  };

  this.getRepositorie = function (ownerName, repoName) {
    return $http({
      method: 'GET',
      url   : api_url + '/repos/' + ownerName + '/' + repoName
    });
  };
});
