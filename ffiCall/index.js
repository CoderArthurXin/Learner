const { ffiType } = require('ffi-napi');
const ffi = require('ffi-napi');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ref = require('ref-napi');

const DLL_NAME = 'demoDLL.dll';
// console.log(process.env);
const DLL_PATH = path.join(__dirname, '..', 'demoDLL', 'x64', 'Debug', DLL_NAME);

console.log('dll path: ', DLL_PATH);

if (!fs.existsSync(DLL_PATH)) {
  console.log('DLL NOT EXIST');
  process.exit(0);
}

let voidPtr = ref.refType('void');
let voidPtrPtr = ref.refType(voidPtr);

let charPtr = ref.refType('char');
let charPtrPtr = ref.refType(charPtr);

let intPtr = ref.refType('int');
let stringPtr = ref.refType('string');
{
  console.log('voidPtr: ', voidPtr); // { indirection: 2, name: 'void*' }
  console.log('voidPtrPtr: ', voidPtrPtr); //  { indirection: 3, name: 'void**' }

  console.log('charPtr: ', charPtr); //  { indirection: 2, name: 'char*' }
  console.log('charPtrPtr: ', charPtrPtr); //  { indirection: 3, name: 'char**' }

  console.log('intPtr: ', intPtr); // { indirection: 2, name: 'int*' }
  console.log('stringPtr: ', stringPtr); // { indirection: 2, name: 'CString*' }
}

let _handle = ffi.Library(DLL_PATH, {
  add: ['int', ['int', 'int']],
  mallocFree: ['void', ['pointer']],
  getVersion: ['pointer', []],
  getVersionEx: ['void', [charPtr]],
});

//////////////////////////////////////////////////////////////////
{
  console.log('sum: ', _handle.add(10, 20));
}


//////////////////////////////////////////////////////////////////
{
  let version = _handle.getVersion(); // 有返回内存需要释放
  if (Buffer.isBuffer(version)) {
    console.log('version:', version.readCString());
    _handle.mallocFree(version); // 释放内存
  }  
}

//////////////////////////////////////////////////////////////////
{
  
  try {
    // 直接用 Buffer 分配内存
    const BUFFER_SIZE = 100; // buffer 要能够装下 output
    let versionBuf = Buffer.alloc(BUFFER_SIZE);
    // <Buffer@0x00000237B0248280 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
    // 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 50 more bytes>
    console.log('buffer:', versionBuf);

    _handle.getVersionEx(versionBuf);

    // version ex: 1.0.0.0.0.2.3
    console.log('version ex:', versionBuf.readCString());


    // 里面还是使用Buffer分配内存？
    let v2_2 = ref.alloc(charPtr);
    
    // ..v2_2: <Buffer@0x00000237A67A1160 00 00 00 00 00 00 00 00, type: { indirection: 2, name: 'char*' }>
    console.log('...v2_2:', v2_2);

    // 为空，无输出
    console.log('...v2_2:', v2_2.readCString());

    _handle.getVersionEx(v2_2);

    // ...v2_2: 1.0.0.0.0.2.3
    // 如果返回的字符串比较长，而这里没指定alloc的长度，那么也会失败
    console.log('...v2_2:', v2_2.readCString());  
  } catch(e) {
    console.log(e);
  }
}
