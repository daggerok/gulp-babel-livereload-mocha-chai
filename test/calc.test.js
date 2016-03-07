const assert = require('chai').assert,
calc = require('../src/calc')

describe('calc', function () {
  it('1 plus 2 equals 3', function (done) {
    assert.equal(calc.plus(1, 2), 3, "wrong calc plus");
    done()
  })
})
