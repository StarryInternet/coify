'use strict';

const assert = require('chai').assert;
const rewire = require('rewire');
const path   = '../../lib/coify';

function delay( n ) {
  return new Promise( ( resolve, reject ) => {
    setTimeout( () => resolve( n ), n );
  });
}

describe( 'coify', () => {

  it( 'should co-ify generator methods', done => {
    let coify = rewire( path );

    let obj = {
      *foo() {
        let d = yield delay( 10 );
        return d;
      }
    };

    coify( obj );

    obj.foo()
    .then( result => {
      assert.equal( result, 10 );
      done();
    })
    .catch( done );
  });

  it( 'should return the passed object', () => {
    let coify = rewire( path );

    let obj = {
      *foo() {
        let d = yield delay( 10 );
        return d;
      }
    };

    let result = coify( obj );

    assert.equal( obj, result );
  });

  it( 'should invoke methods with the correct context', done => {
    let coify = rewire( path );

    let obj = {
      *foo() {
        let d = yield delay( 10 );
        return this;
      }
    };

    coify( obj );

    obj.foo()
    .then( result => {
      assert.equal( result, obj );
      done();
    })
    .catch( done );
  });

  it( 'should pass arguments', done => {
    let coify = rewire( path );

    let obj = {
      *foo( a, b, c ) {
        let d = yield delay( 10 );
        return [ a, b, c ];
      }
    };

    coify( obj );

    obj.foo( 1, 2, 3 )
    .then( result => {
      assert.deepEqual( result, [ 1, 2, 3 ] );
      done();
    })
    .catch( done );
  });

  it( 'should co-ify prototype methods when passed a function', done => {
    let coify = rewire( path );

    let proto = {
      *foo() {
        let d = yield delay( 10 );
        return d;
      }
    };

    function Foo() {};
    Foo.prototype = proto;

    let obj = new Foo();

    coify( Foo );

    obj.foo()
    .then( result => {
      assert.equal( result, 10 );
      done();
    })
    .catch( done );
  });

});
