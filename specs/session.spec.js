var session = require('../modules/session');

describe('session module', function () {
  it('login exitoso', function () {
    session.login('sergio', '1234', function (response) {
      expect(response).not.toBeFalse();
    });
  });

  it('autenticación exitosa', function () {
    session.login('sergio', '673e7dae9c4e689e7561396438df33a9', function (response) {
      expect(response).toBeTrue();
    });
  });

  it('logout exitoso', function () {
    session.logout('sergio', '673e7dae9c4e689e7561396438df33a9', function (response) {
      expect(response).toBeTrue();
    });
  });
});
