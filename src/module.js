'use strict';

import util from 'util';

export function newRadFunction(){
	console.log('this is the new rad function');
}

export const oldRadFunction = util.deprecate(function(){
	newRadFunction.apply(this, arguments);
}, 'module:oldRadFunction - use newRadFunction instead.');
