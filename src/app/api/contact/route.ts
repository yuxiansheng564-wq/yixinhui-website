import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证必填字段
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    // 验证手机号格式（中国大陆手机号）
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: '请输入有效的手机号码' },
        { status: 400 }
      );
    }

    // 这里可以添加实际的保存逻辑，比如：
    // 1. 保存到数据库
    // 2. 发送邮件通知
    // 3. 调用CRM系统

    // 模拟保存到数据库
    console.log('预约表单提交:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company || '',
      service: body.service || '',
      message: body.message,
      submittedAt: new Date().toISOString(),
    });

    // 模拟异步处理
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: '预约提交成功，我们的顾问将在24小时内与您联系！'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('预约表单提交错误:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}
