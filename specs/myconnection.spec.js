var myconnection = require('../modules/myconnection');

describe('myconnection', function () {
  it('conexion exitosa', function () {
    myconnection(function (pool) {
      expect(pool).not.toBeFalse();
    });
  });
});
