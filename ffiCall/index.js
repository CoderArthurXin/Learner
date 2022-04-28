const ffi = require('ffi-napi');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ref = require('ref-napi');

const { test_basic } = require('./basic');
const { test_ptr } = require('./ptr');

const DLL_NAME = 'demoDLL.dll';
// console.log(process.env);
const DLL_PATH = path.join(__dirname, '..', 'demoDLL', 'Debug', DLL_NAME);

console.log('dll path: ', DLL_PATH);

if (!fs.existsSync(DLL_PATH)) {
  console.error('DLL NOT EXIST');
  process.exit(0);
}

let voidPtr = ref.refType('void');
let voidPtrPtr = ref.refType(voidPtr);

let charPtr = ref.refType('char');
let charPtrPtr = ref.refType(charPtr);

let intPtr = ref.refType('int');
let doublePtr = ref.refType('double');
let floatPtr = ref.refType('float');
let stringPtr = ref.refType('string'); 

let _handle = ffi.Library(DLL_PATH, {
  add: ['int', ['int', 'int']],
  mallocFree: ['void', ['pointer']],
  getVersion: ['pointer', []],
  getVersionEx: ['void', [charPtr]],
  testPtrPtr: ['void', [charPtrPtr]],
  testOutput: ['void', [intPtr, doublePtr, floatPtr]],
});


test_basic(_handle);
test_ptr(_handle);