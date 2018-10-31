const expect = require('chai').expect;

const lesson2 = require('./');

describe('#promiseReduce', function() {

  context('when asyncFunctions is not array of asynchronouse functions', function() {
    it('should throw error', function() {
      expect(function() {
        lesson2.promiseReduce();
      }).to.throw(TypeError, 'Nothing to sum. You have to pass some arguments to sum them.');
    });
  });

});