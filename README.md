coify
========

[![Build Status](https://travis-ci.org/StarryInternet/coify.svg?branch=master)](https://travis-ci.org/StarryInternet/coify)

Transform generator methods into [co](https://github.com/tj/co)-wrapped functions.

### Installing

```
npm install --save coify
```

### Examples

##### Plain JavaScript objects

```js
const coify = require('coify');

function delay( n ) {
  return new Promise(function( resolve, reject ) {
    setTimeout( resolve, n );
  });
}

let obj = {
  *asyncStuff() {
    yield delay( 500 );
    return true;
  }
};

module.exports = coify( obj );

// ...

obj.asyncStuff().then( console.log ); // `true`
```

##### Classes/Constructors

```js
const coify = require('coify');

function delay( n ) {
  return new Promise(function( resolve, reject ) {
    setTimeout( resolve, n );
  });
}

class Thing {
  *asyncStuff() {
    yield delay( 500 );
    return true;
  }
}

module.exports = coify( Thing );

// ...

const thing = new Thing();
thing.asyncStuff().then( console.log ); // `true`
```
