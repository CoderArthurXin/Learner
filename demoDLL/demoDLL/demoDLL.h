// demoDLL.h: demoDLL DLL 的主标头文件
//

#pragma once

#ifndef __AFXWIN_H__
	#error "include 'pch.h' before including this file for PCH"
#endif

#include "resource.h"		// 主符号


// CdemoDLLApp
// 有关此类实现的信息，请参阅 demoDLL.cpp
//

class CdemoDLLApp : public CWinApp
{
public:
	CdemoDLLApp();

// 重写
public:
	virtual BOOL InitInstance();

	DECLARE_MESSAGE_MAP()
};
