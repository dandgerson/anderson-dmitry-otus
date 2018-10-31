const expect = require('chai').expect;

const lesson1 = require('./');

describe('#sum()', function() {

  context('when calls without arguments', function() {
    it('should throw an error', function() {
      expect(lesson1.sum()()).to.throw(TypeError, 'Nothing to sum. You have to pass some arguments to sum them.');
    });
  });

  context('with explicit undefined as argument', function() {
    it('should return undefined', function() {
      expect(lesson1.sum(undefined)()).to.equal(undefined);
    });
  });

  context('with number arguments', function() {
    it('should return sum of arguments', function() {
      expect(lesson1.sum(5)(5)()).to.equal(10);
    });

    it('should return argument when only one argument is passed', function() {
      expect(lesson1.sum(5)()).to.equal(5);
    });
  });

  context('with numbers and string as agruments', function() {
    it('should return string with sum of number arguments before string and concatened arguments after string', function() {
      expect(lesson1.sum(1)(1)(2)('')()).to.equal('4');
      expect(lesson1.sum(5)(5)(5)('')(5)(5)()).to.equal('1555');
    });
  });
});

describe('#simpleSum()', function() {
  
  context('when number argumenst', function() {
    it('should return sum of two argumenst', function() {
      expect(lesson1.simpleSum(5, 5)).to.equal(10);
    });
  });
});