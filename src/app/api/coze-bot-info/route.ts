import { NextRequest, NextResponse } from 'next/server';

const COZE_API_BASE = 'https://api.coze.cn/open_api/v2';
// 从环境变量获取 Bot ID
const BOT_ID_XIAOYI = process.env.BOT_ID_XIAOYI || '7609975775357321251';
const BOT_ID_YIXIN = process.env.BOT_ID_YIXIN || '7481860697149407270';

export async function POST(request: NextRequest) {
  try {
    // 获取请求体中的 botId，如果没有则默认使用意心之镜
    const body = await request.json().catch(() => ({}));
    const currentBotId = body.botId || BOT_ID_YIXIN;

    console.log('=== 服务器端获取 Bot 信息 ===');
    console.log('Bot ID:', currentBotId);
    console.log('Bot名称:', currentBotId === BOT_ID_XIAOYI ? '小意' : currentBotId === BOT_ID_YIXIN ? '意心之镜' : '自定义');

    // 方法1：尝试获取Bot信息端点
    const botInfoUrl = `${COZE_API_BASE}/bot/get_online_info`;

    const botInfoResponse = await fetch(botInfoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BOT_API_TOKEN || ''}`,
      },
      body: JSON.stringify({
        bot_id: String(currentBotId),
      }),
    });

    if (botInfoResponse.ok) {
      const botInfoData = await botInfoResponse.json();
      console.log('Bot信息响应:', botInfoData);

      // 尝试从响应中提取开场白和预制问题
      if (botInfoData.data) {
        const data = botInfoData.data;
        const welcomeMessage = data.bot_desc || data.welcome_message || '';
        const suggestedQuestions = data.suggested_questions || [];

        if (welcomeMessage || suggestedQuestions.length > 0) {
          return NextResponse.json({
            success: true,
            welcomeMessage,
            suggestedQuestions,
          });
        }
      }
    }

    console.log('Bot信息端点未返回有效数据，尝试chat端点');

    // 方法2：通过chat端点获取
    const requestBody = {
      bot_id: String(currentBotId),
      user: 'welcome_user_' + Date.now(),
      query: '开场白',
      stream: false,
    };

    const response = await fetch(`${COZE_API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BOT_API_TOKEN || ''}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('Chat API 请求失败:', response.status);
      return NextResponse.json({
        success: false,
        error: `API 请求失败: ${response.status}`,
        welcomeMessage: '体验 AI 能力，和意心之境聊聊吧',
        suggestedQuestions: [],
      });
    }

    const rawData = await response.text();
    console.log('Chat API 响应:', rawData);

    if (!rawData || rawData.trim() === '') {
      return NextResponse.json({
        success: false,
        error: '空响应',
        welcomeMessage: '体验 AI 能力，和意心之境聊聊吧',
        suggestedQuestions: [],
      });
    }

    const data = JSON.parse(rawData);
    console.log('解析后的数据:', data);

    // 尝试从响应中提取开场白和预制问题
    let welcomeMessage = '体验 AI 能力，和意心之境聊聊吧';
    let suggestedQuestions: string[] = [];

    // 检查是否有直接的预制问题字段
    if (data.suggested_questions && Array.isArray(data.suggested_questions)) {
      suggestedQuestions = data.suggested_questions;
    }

    // 检查data中是否有预制问题
    if (data.data && data.data.suggested_questions && Array.isArray(data.data.suggested_questions)) {
      suggestedQuestions = data.data.suggested_questions;
    }

    // 从消息中提取
    let messages = [];
    if (data.messages && Array.isArray(data.messages)) {
      messages = data.messages;
    } else if (data.data && data.data.messages && Array.isArray(data.data.messages)) {
      messages = data.data.messages;
    }

    const assistantMessage = messages.find((msg: any) => msg.role === 'assistant');
    if (assistantMessage && assistantMessage.content) {
      welcomeMessage = assistantMessage.content;

      // 如果还没有预制问题，尝试从内容中提取
      if (suggestedQuestions.length === 0) {
        const patterns = [
          /建议问题[:：]\s*((?:[^\n]+\n?)+)/i,
          /推荐问题[:：]\s*((?:[^\n]+\n?)+)/i,
          /你可以问[:：]\s*((?:[^\n]+\n?)+)/i,
          /试试问[:：]\s*((?:[^\n]+\n?)+)/i,
        ];

        for (const pattern of patterns) {
          const match = welcomeMessage.match(pattern);
          if (match && match[1]) {
            suggestedQuestions = match[1]
              .split(/[-•●○1.2.3.]\s*/)
              .map((q: string) => q.trim())
              .filter((q: string) => q.length > 0);
            if (suggestedQuestions.length > 0) break;
          }
        }
      }
    }

    console.log('最终提取结果:', { welcomeMessage, suggestedQuestions });

    return NextResponse.json({
      success: true,
      welcomeMessage,
      suggestedQuestions: suggestedQuestions.length > 0 ? suggestedQuestions : [],
    });

  } catch (error) {
    console.error('获取Bot信息失败:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
      welcomeMessage: '体验 AI 能力，和意心之境聊聊吧',
      suggestedQuestions: [],
    });
  }
}
