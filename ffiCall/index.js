const { ffiType } = require('ffi-napi');
const ffi = require('ffi-napi');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ref = require('ref-napi');

const { test_basic } = require('./basic');
const { test_ptr } = require('./ptr');

const DLL_NAME = 'demoDLL.dll';
// console.log(process.env);
const DLL_PATH = path.join(__dirname, '..', 'demoDLL', 'x64', 'Debug', DLL_NAME);

console.log('dll path: ', DLL_PATH);

if (!fs.existsSync(DLL_PATH)) {
  console.log('DLL NOT EXIST');
  process.exit(0);
}

let _handle = ffi.Library(DLL_PATH, {
  add: ['int', ['int', 'int']],
  mallocFree: ['void', ['pointer']],
  getVersion: ['pointer', []],
  getVersionEx: ['void', [charPtr]],
  testPtrPtr: ['void', [charPtrPtr]],
});


test_basic();
test_ptr();