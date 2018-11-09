const expect = require('chai').expect;

const lesson2 = require('./');

const asyncFunctions = [
  function() {
    console.log('fn1');
    return Promise.resolve(1);
  },
  function() {
    return new Promise(resolve => {
      console.log('fn2');
      setTimeout(() => resolve(2), 1000);
    });
  },
];

describe('#promiseReduce()', function() {

  context('with invalid arguments', function() {
    it('shoule throw a TypeError when asyncFunctions invalid', function() {
      expect(function() {
        lesson2.promiseReduce();
      }).to.throw(TypeError);
    });
    it('shoule throw a TypeError when reduce invalid', function() {
      expect(function() {
        lesson2.promiseReduce(asyncFunctions, 'reducer');
      }).to.throw(TypeError);
    });
    it('shoule throw a TypeError when initialValue invalid', function() {
      expect(function() {
        lesson2.promiseReduce(asyncFunctions, (memo,value) => memo * value, 'string');
      }).to.throw(TypeError);
    });
  });

  context('with valid arguments', function() {
    it('should return Promise', function() {
      expect(lesson2.promiseReduce(asyncFunctions, (memo,value) => memo * value) instanceof Promise).to.equal(true);
    });
  });

});