var assignstatename = require('../modules/assignstatename');

describe('módulo para asignar un nombre de estado a una tarea', function () {
  it('recibe 1 y devuelve "to do"', function () {
    expect(assignstatename({'state':1})).toEqual({'state':1, 'stateName': 'to do'});
  });

  it('recibe 2 y devuelve "in progress"', function () {
    expect(assignstatename({'state':2})).toEqual({'state':2, 'stateName': 'in progress'});
  });

  it('recibe 3 y devuelve "in testing"', function () {
    expect(assignstatename({'state':3})).toEqual({'state':3, 'stateName': 'in testing'});
  });

  it('recibe 4 y devuelve "completed"', function () {
    expect(assignstatename({'state':4})).toEqual({'state':4, 'stateName': 'completed'});
  });
});

