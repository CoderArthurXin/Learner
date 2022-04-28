
function test_basic(_handle) {
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
  }
  
  module.exports = {
      test_basic
  }