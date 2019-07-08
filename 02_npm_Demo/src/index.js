import _  from 'underscore';

// this is a core module

const result = _.contains([1,2,3], 2);
console.log('test with underscore', result);

const rEs6 = [1,2,3].includes(2);
console.log('test with es6', rEs6);