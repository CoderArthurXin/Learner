const { ffiType } = require('ffi-napi');
const ffi = require('ffi-napi');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ref = require('ref-napi');

const DLL_NAME = 'demoDLL.dll';
// console.log(process.env);
const DLL_PATH = path.join(__dirname, '..', 'demoDLL', 'x64', 'Release', DLL_NAME);

console.log('dll path: ', DLL_PATH);

if (!fs.existsSync(DLL_PATH)) {
  console.log('DLL NOT EXIST');
  process.exit(0);
}

let ptr = ref.refType('void');

let _handle = ffi.Library(DLL_PATH, {
  add: ['int', ['int', 'int']],
  mallocFree: ['void', ['pointer']],
  getVersion: ['pointer', []],
  getVersionEx: ['void', ['pointer', 'int']],
  getVersionEy: ['void', [ptr]],
});

//////////////////////////////////////////////////////////////////
console.log('sum: ', _handle.add(10, 20));

//////////////////////////////////////////////////////////////////
let version = _handle.getVersion(); // 有返回内存需要释放
if (Buffer.isBuffer(version)) {
  console.log('version:', version.readCString());
  _handle.mallocFree(version); // 释放内存
}

//////////////////////////////////////////////////////////////////
try {
  const BUFFER_SIZE = 10; // 如果BUFFER太小，DEBUG模式下会报错
  let versionBuf = Buffer.alloc(BUFFER_SIZE);
  _handle.getVersionEx(versionBuf, BUFFER_SIZE);
  console.log('version ex:', versionBuf.readCString());
} catch(e) {
  console.log(e);
}

//////////////////////////////////////////////////////////////////

