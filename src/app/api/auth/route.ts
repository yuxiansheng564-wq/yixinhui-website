import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, email, phone, password, name, code } = body;

    if (mode === 'register') {
      // 注册逻辑
      if (!email || !phone || !password || !name) {
        return NextResponse.json(
          { error: '请填写所有必填字段' },
          { status: 400 }
        );
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: '请输入有效的邮箱地址' },
          { status: 400 }
        );
      }

      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: '请输入有效的手机号码' },
          { status: 400 }
        );
      }

      // 验证密码强度
      if (password.length < 6) {
        return NextResponse.json(
          { error: '密码至少需要6位字符' },
          { status: 400 }
        );
      }

      // 这里可以添加实际的注册逻辑，比如：
      // 1. 检查邮箱/手机号是否已注册
      // 2. 保存用户信息到数据库
      // 3. 发送欢迎邮件

      console.log('用户注册:', {
        name,
        email,
        phone,
        registeredAt: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          success: true,
          message: '注册成功！'
        },
        { status: 200 }
      );

    } else {
      // 登录逻辑
      const loginMethod = body.loginMethod || 'email';

      if (loginMethod === 'email') {
        // 邮箱+密码登录
        if (!email || !password) {
          return NextResponse.json(
            { error: '请输入邮箱和密码' },
            { status: 400 }
          );
        }

        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json(
            { error: '请输入有效的邮箱地址' },
            { status: 400 }
          );
        }

        // 这里可以添加实际的登录逻辑，比如：
        // 1. 查询用户信息
        // 2. 验证密码
        // 3. 生成JWT token

        console.log('用户登录（邮箱）:', {
          email,
          loggedInAt: new Date().toISOString(),
        });

        return NextResponse.json(
          {
            success: true,
            message: '登录成功！'
          },
          { status: 200 }
        );

      } else {
        // 手机号+验证码登录
        if (!phone || !code) {
          return NextResponse.json(
            { error: '请输入手机号和验证码' },
            { status: 400 }
          );
        }

        // 验证手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
          return NextResponse.json(
            { error: '请输入有效的手机号码' },
            { status: 400 }
          );
        }

        // 验证验证码（这里应该验证发送的验证码）
        if (code.length !== 6) {
          return NextResponse.json(
            { error: '请输入6位验证码' },
            { status: 400 }
          );
        }

        // 这里可以添加实际的登录逻辑

        console.log('用户登录（手机号）:', {
          phone,
          loggedInAt: new Date().toISOString(),
        });

        return NextResponse.json(
          {
            success: true,
            message: '登录成功！'
          },
          { status: 200 }
        );
      }
    }

  } catch (error) {
    console.error('认证错误:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
}
