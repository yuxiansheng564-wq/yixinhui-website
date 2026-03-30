import { NextRequest } from 'next/server';

const COZE_API_BASE = 'https://api.coze.cn/v3';
// 从环境变量获取 Bot ID，优先使用环境变量中的值
const BOT_ID_XIAOYI = process.env.BOT_ID_XIAOYI || '7609975775357321251';
const BOT_ID_YIXIN = process.env.BOT_ID_YIXIN || '7481860697149407270';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId, userId, botId } = await request.json();

    // 使用传入的 botId，如果没有则默认使用小意
    const currentBotId = botId || BOT_ID_XIAOYI;

    console.log('=== 服务器端调用 Coze Bot (v3流式) ===');
    console.log('Bot ID:', currentBotId);
    console.log('Bot名称:', currentBotId === BOT_ID_XIAOYI ? '小意' : currentBotId === BOT_ID_YIXIN ? '意心之镜' : '自定义');
    console.log('Query:', typeof message === 'string' ? message : message.text || JSON.stringify(message));
    console.log('Conversation ID:', conversationId);

    // 构建v3 API请求体
    const requestBody: any = {
      bot_id: currentBotId,
      user_id: userId || `user_${Date.now()}`,
      stream: true,
      auto_save_history: true,
      additional_messages: [
        {
          role: 'user',
          content: message.text || message,
          content_type: 'text',
        },
      ],
    };

    // v3 API使用conversation_id保持多轮对话
    if (conversationId) {
      requestBody.conversation_id = conversationId;
      // 如果有conversation_id，不需要additional_messages
      delete requestBody.additional_messages;
      // 需要用不同的方式传递用户消息
      requestBody.additional_messages = [
        {
          role: 'user',
          content: message.text || message,
          content_type: 'text',
        },
      ];
    }

    const response = await fetch(`${COZE_API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BOT_API_TOKEN}`,
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Coze API Error:', response.status, errorText);
      return new Response(JSON.stringify({
        success: false,
        error: `API 请求失败: ${response.status}`,
        answer: '抱歉，服务暂时不可用，请稍后再试。',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 创建流式响应
    const encoder = new TextEncoder();
    const reader = response.body?.getReader();

    if (!reader) {
      return new Response(JSON.stringify({
        success: false,
        error: '无法读取响应流',
        answer: '抱歉，服务出现错误，请稍后再试。',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 创建可读流
    const stream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        let buffer = '';
        let isClosed = false;
        let currentEvent = ''; // 当前事件类型

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              if (!isClosed) {
                isClosed = true;
                controller.close();
              }
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            
            // 解析 SSE 事件
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // 保留最后一个不完整的行

            for (const line of lines) {
              // v3 API格式: event:xxx \n data:{...}
              if (line.startsWith('event:')) {
                currentEvent = line.slice(6).trim();
                continue;
              }
              
              if (line.startsWith('data:')) {
                const dataStr = line.slice(5).trim();
                if (!dataStr || dataStr === '[DONE]') continue;

                try {
                  const data = JSON.parse(dataStr);
                  
                  // 只处理增量消息（conversation.message.delta）
                  // 跳过完成消息（conversation.message.completed），因为它是完整内容
                  if (currentEvent === 'conversation.message.completed') {
                    continue;
                  }
                  
                  // 处理思维内容（reasoning_content）
                  if (data.reasoning_content) {
                    const reasoningData = JSON.stringify({
                      type: 'reasoning',
                      content: data.reasoning_content,
                    });
                    controller.enqueue(encoder.encode(`data: ${reasoningData}\n\n`));
                  }
                  // 处理最终回答内容（content）
                  if (data.content && data.content.trim()) {
                    const answerData = JSON.stringify({
                      type: 'answer',
                      content: data.content,
                    });
                    controller.enqueue(encoder.encode(`data: ${answerData}\n\n`));
                  }
                  
                  // 处理完成事件
                  if (data.status === 'completed') {
                    const doneData = JSON.stringify({
                      type: 'done',
                      conversationId: data.conversation_id || conversationId || '',
                    });
                    controller.enqueue(encoder.encode(`data: ${doneData}\n\n`));
                  }
                } catch (e) {
                  console.log('SSE 解析跳过:', dataStr.substring(0, 100));
                }
              }
            }
          }
        } catch (error) {
          console.error('流式读取错误:', error);
          if (!isClosed) {
            isClosed = true;
            controller.error(error);
          }
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      answer: '抱歉，服务出现错误，请稍后再试。',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
