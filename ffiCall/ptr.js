function test_ptr(_handle) {

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

        let bufPtr = ref.alloc(charPtr);
        let bufPtrPtr = ref.alloc(charPtrPtr);

        console.log(bufPtr); // <Buffer@0x0000014BD5021C70 00 00 00 00 00 00 00 00, type: { indirection: 2, name: 'char*' }>
        console.log(bufPtrPtr); // <Buffer@0x0000014BD5021CD0 00 00 00 00 00 00 00 00, type: { indirection: 3, name: 'char**' }>

        let bufPtrDf = bufPtr.deref();
        let bufPtrPtrDf = bufPtrPtr.deref();
        // <Buffer@0x0000000000000000 type: { alignment: 1, name: 'char', ffi_type: <Buffer@0x00007FFCA51DB7C0 name: 'char'> }>
        console.log(bufPtrDf);
        // <Buffer@0x0000000000000000 type: { indirection: 2, name: 'char*' }>
        console.log(bufPtrPtrDf);

        console.log('intPtr: ', intPtr); // { indirection: 2, name: 'int*' }
        console.log('stringPtr: ', stringPtr); // { indirection: 2, name: 'CString*' }
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
        } catch (e) {
            console.log(e);
        }
    }

    // 测试指针的指针
    {
        let _ptr = ref.alloc(charPtr);
        let _ptrptr = ref.alloc(charPtrPtr, _ptr);

        _handle.testPtrPtr(_ptrptr);

        // bufffer 存的就是 _ptr 的地址 f0 7d 87 d8 be 01
        console.log('*', _ptrptr); // * <Buffer@0x000001BED8877BF0 f0 7d 87 d8 be 01 00 00, type: { indirection: 3, name: 'char**' }>
        console.log('$', _ptr); // $ <Buffer@0x000001BED8877DF0 21 21 73 75 63 63 65 73, type: { indirection: 2, name: 'char*' }>
        console.log('&', _ptr.readCString()); // !!success

        let ddd = _ptrptr.deref();
        // ddd 和 _ptr 是同一个指针，可以从其buffer地址看出
        console.log('~', ddd); // ~ <Buffer@0x000001BED8877DF0 21 21 73 75 63 63 65 73, type: { indirection: 2, name: 'char*' }>
        console.log('#', ddd.readCString()); // # !!success
    }
}

module.exports = {
    test_ptr
}