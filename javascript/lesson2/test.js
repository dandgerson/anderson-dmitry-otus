const expect = require('chai').expect;

const lesson2 = require('./');

describe('#promiseReduce', function() {

  context('when calls without arguments', function() {
    it('should throw error', function() {
      expect(function() {
        lesson1.sum()();
      }).to.throw(TypeError, 'Nothing to sum. You have to pass some arguments to sum them.');
    });
  });

});