// demoDLL.cpp: 定义 DLL 的初始化例程。
//

#include "pch.h"
#include "framework.h"
#include "demoDLL.h"

#ifdef _DEBUG
#define new DEBUG_NEW
#endif

#include "spdlog/sinks/rotating_file_sink.h"

auto Logger = spdlog::rotating_logger_mt("ffi", "rzffi.log", 1048576 * 5, 3);

//
//TODO:  如果此 DLL 相对于 MFC DLL 是动态链接的，
//		则从此 DLL 导出的任何调入
//		MFC 的函数必须将 AFX_MANAGE_STATE 宏添加到
//		该函数的最前面。
//
//		例如: 
//
//		extern "C" BOOL PASCAL EXPORT ExportedFunction()
//		{
//			AFX_MANAGE_STATE(AfxGetStaticModuleState());
//			// 此处为普通函数体
//		}
//
//		此宏先于任何 MFC 调用
//		出现在每个函数中十分重要。  这意味着
//		它必须作为以下项中的第一个语句:
//		出现，甚至先于所有对象变量声明，
//		这是因为它们的构造函数可能生成 MFC
//		DLL 调用。
//
//		有关其他详细信息，
//		请参阅 MFC 技术说明 33 和 58。
//

// CdemoDLLApp

BEGIN_MESSAGE_MAP(CdemoDLLApp, CWinApp)
END_MESSAGE_MAP()


// CdemoDLLApp 构造

CdemoDLLApp::CdemoDLLApp()
{
	// TODO:  在此处添加构造代码，
	// 将所有重要的初始化放置在 InitInstance 中
}


// 唯一的 CdemoDLLApp 对象

CdemoDLLApp theApp;


// CdemoDLLApp 初始化

BOOL CdemoDLLApp::InitInstance()
{
	CWinApp::InitInstance();

	return TRUE;
}

EXTERN_C int add(int x, int y) {
	return x + y;
}

EXTERN_C const char* getVersion() {
	Logger->info(__FUNCTION__);

	const int SIZE = 100;
	char* buffer = (char*)malloc(SIZE);
	memset(buffer, 0, SIZE);

	sprintf_s(buffer, SIZE, "%d.%d.%d", 1, 0, 1);
	return buffer;
}

EXTERN_C void mallocFree(void* pointer) {
	Logger->info(__FUNCTION__);
	if (pointer != nullptr) {
		free(pointer);
		pointer = nullptr;
	}
}

EXTERN_C void getVersionEx(char* buffer) {
	Logger->info(__FUNCTION__);
	if (buffer == nullptr) {
		Logger->info("pointer is null");
		return;
	}

	strcpy(buffer, "1.0.0.0.0.2");
}

typedef struct {
	char* name;
	int age;
}Student;

EXTERN_C void getStudentInfo(Student* p) {
	Logger->info(__FUNCTION__);

	strcpy(p->name, "IamFFI");
	p->age = 123;
}