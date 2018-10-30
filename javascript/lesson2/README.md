# JavaScript Block

## Lesson 2

### Task Description

#### Write a function ```promiseReduce```

Write a function ```promiseReduce```, which are passed:

- array of asynchronous functions ```asyncFunctions```, returns 'Promise'
- the ```reduce``` function
- initial value ```initialValue```

```promiseReduce``` alternately calls passed asynchronous functions and to calls ```reduce``` immidiatly after getting result before next call of the asynchronous function.

```reduce``` must execute like [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), i.e. memorize the result of the previous iteratjion.

```javascript
var fn1 = () => {
  console.log('fn1')
  return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
  console.log('fn2')
  setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) { 
  /**
  * Here your code
  */
}

promiseReduce(
  [fn1, fn2],
  function (memo, value) {
    console.log('reduce')
    return memo * value
  },
  1
)
.then(console.log)
```