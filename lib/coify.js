'use strict';

const co  = require('co');

const toString = Object.prototype.toString;
const genTag   = '[object GeneratorFunction]';

function instrument( obj ) {
  Reflect.ownKeys( obj ).forEach( key => {
    const fn = obj[ key ];
    const str = toString.call( fn );
    if ( str === genTag ) {
      obj[ key ] = co.wrap( fn );
    }
  });
}

module.exports = function coify( obj ) {
  instrument( obj );
  if ( typeof obj === 'function' ) {
    instrument( obj.prototype );
  }
  return obj;
};
