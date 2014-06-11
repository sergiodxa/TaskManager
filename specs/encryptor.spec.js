var encryptor = require('../modules/encryptor');

describe('modulo encriptador', function() {
  it('encriptar string "hola"', function() {
    expect(encryptor('hola')).toEqual('4d186321c1a7f0f354b297e8914ab240');
  });
});
