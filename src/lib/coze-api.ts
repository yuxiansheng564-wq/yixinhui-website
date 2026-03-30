// Coze API 配置
const COZE_API_BASE = 'https://api.coze.cn/open_api/v2';

// 两个智能体的 Bot ID
export const BOT_ID_XIAOYI = process.env.BOT_ID_XIAOYI || '7609975775357321251'; // 小意（客服）
export const BOT_ID_YIXIN = process.env.BOT_ID_YIXIN || '7481860697149407270'; // 意心之镜

interface CozeMessage {
  role: 'user' | 'assistant';
  content: string;
  content_type?: 'text' | 'object_string' | 'thinking';
  type?: 'answer' | 'thinking' | 'follow_up' | 'verbose';
}

interface CozeChatResponse {
  code: number;
  msg: string;
  data: {
    messages: CozeMessage[];
    answer?: string;
    conversation_id: string;
    msg_id: string;
    status: string;
  };
}

export interface CozeResponse {
  answer: string;
  thinking?: string;
  conversationId: string;
  msgId: string;
}

// 流式响应回调类型
export interface StreamCallbacks {
  onThinking?: (content: string) => void;
  onAnswer?: (content: string) => void;
  onDone?: (conversationId: string) => void;
  onError?: (error: Error) => void;
}

/**
 * 调用 Coze LLM SDK (思维模型)
 * 使用 doubao-seed-1-6-thinking-250715 模型，支持显示思维过程
 * @param botId 智能体ID，默认使用小意
 */
export async function callLLMAgent(
  query: string,
  userId: string,
  conversationId?: string,
  chatHistory?: Array<{ role: 'user' | 'assistant'; content: string }>,
  botId?: string
): Promise<CozeResponse> {
  try {
    console.log('=== 调用 LLM SDK (思维模型) ===');
    console.log('用户问题:', query);
    console.log('用户ID:', userId);
    console.log('对话ID:', conversationId);
    console.log('消息历史:', chatHistory);
    console.log('Bot ID:', botId || BOT_ID_XIAOYI);

    const response = await fetch('/api/llm-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          text: query,
          history: chatHistory || [],
        },
        userId,
        conversationId,
        botId: botId || BOT_ID_XIAOYI,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LLM API Error:', response.status, errorText);
      throw new Error(`LLM API 请求失败: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('LLM AI 响应成功:', data);

    return {
      answer: data.answer || '抱歉，我没有收到回复。',
      thinking: data.thinking || undefined,
      conversationId: data.conversationId,
      msgId: '',
    };
  } catch (error) {
    console.error('调用 LLM 智能体失败:', error);
    throw error;
  }
}

/**
 * 流式调用 LLM SDK
 * 使用 SSE 协议，支持打字机效果和思维过程显示
 * @param botId 智能体ID，默认使用意心之镜
 */
export async function streamLLMAgent(
  query: string,
  userId: string,
  conversationId: string | undefined,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> | undefined,
  callbacks: StreamCallbacks,
  botId?: string
): Promise<void> {
  try {
    console.log('=== 流式调用 LLM SDK ===');
    console.log('用户问题:', query);
    console.log('用户ID:', userId);
    console.log('对话ID:', conversationId);
    console.log('Bot ID:', botId || BOT_ID_YIXIN);

    const response = await fetch('/api/llm-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          text: query,
          history: chatHistory || [],
        },
        userId,
        conversationId,
        botId: botId || BOT_ID_YIXIN,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LLM API Error:', response.status, errorText);
      callbacks.onError?.(new Error(`LLM API 请求失败: ${response.status}`));
      return;
    }

    // 检查是否是流式响应
    const contentType = response.headers.get('Content-Type') || '';
    if (!contentType.includes('text/event-stream')) {
      // 非流式响应，直接解析JSON
      const data = await response.json();
      if (data.thinking) {
        callbacks.onThinking?.(data.thinking);
      }
      callbacks.onAnswer?.(data.answer || '抱歉，我没有收到回复。');
      callbacks.onDone?.(data.conversationId || '');
      return;
    }

    // 流式响应处理
    const reader = response.body?.getReader();
    if (!reader) {
      callbacks.onError?.(new Error('无法读取响应流'));
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      // 解析 SSE 事件
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const dataStr = line.slice(5).trim();
          if (!dataStr || dataStr === '[DONE]') continue;

          try {
            const data = JSON.parse(dataStr);

            // 处理思维内容（reasoning 类型）
            if (data.type === 'reasoning' && data.content) {
              callbacks.onThinking?.(data.content);
            } 
            // 处理最终回答（answer 类型）
            else if (data.type === 'answer' && data.content) {
              callbacks.onAnswer?.(data.content);
            } 
            // 处理完成事件
            else if (data.type === 'done') {
              callbacks.onDone?.(data.conversationId || '');
            }
          } catch (e) {
            console.log('SSE 解析跳过:', dataStr.substring(0, 100));
          }
        }
      }
    }

    // 如果没有收到 done 事件，手动触发
    callbacks.onDone?.(conversationId || '');

  } catch (error) {
    console.error('流式调用 LLM 智能体失败:', error);
    callbacks.onError?.(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * 获取智能体的欢迎消息和引导问题
 * @param botId 智能体ID，默认使用意心之镜
 * @returns 欢迎消息和引导问题列表
 */
export async function getBotWelcomeMessage(botId?: string): Promise<{
  welcomeMessage: string;
  suggestedQuestions: string[];
}> {
  try {
    console.log('=== 通过服务器端API获取 Bot 信息 ===');
    console.log('Bot ID:', botId || BOT_ID_YIXIN);

    // 调用服务器端API路由
    const response = await fetch('/api/coze-bot-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        botId: botId || BOT_ID_YIXIN,
      }),
    });

    if (!response.ok) {
      console.error('API请求失败:', response.status);
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('服务器端API响应:', data);

    if (data.success) {
      return {
        welcomeMessage: data.welcomeMessage || '体验 AI 能力，和意心之境聊聊吧',
        suggestedQuestions: data.suggestedQuestions || [],
      };
    } else {
      console.error('API返回错误:', data.error);
      throw new Error(data.error || '未知错误');
    }
  } catch (error) {
    console.error('获取欢迎消息失败:', error);
    // 返回默认值
    return {
      welcomeMessage: '体验 AI 能力，和意心之境聊聊吧',
      suggestedQuestions: [],
    };
  }
}

/**
 * 调用 Coze 智能体 API
 * @param query 用户输入的问题
 * @param userId 用户唯一标识
 * @param conversationId 对话ID（可选，用于多轮对话）
 * @param chatHistory 历史消息（可选）
 * @param botId 智能体ID（可选，默认使用小意）
 * @returns AI 响应内容（包含思维过程）
 */
export async function callCozeAgent(
  query: string,
  userId: string,
  conversationId?: string,
  chatHistory?: CozeMessage[],
  botId?: string
): Promise<CozeResponse> {
  const currentBotId = botId || BOT_ID_XIAOYI;

  try {
    // 构建 Coze API 请求
    const requestBody: any = {
      bot_id: String(currentBotId),
      user: userId,
      query: query,
      stream: false,
      include_thought: true,  // 包含思维过程
    };

    // 只使用 conversation_id 来保持对话上下文
    // 不发送 chat_history，避免与 conversation_id 冲突
    if (conversationId) {
      requestBody.conversation_id = conversationId;
    }

    console.log('=== Coze API 请求 ===');
    console.log('Bot ID:', currentBotId);
    console.log('Bot名称:', currentBotId === BOT_ID_XIAOYI ? '小意' : currentBotId === BOT_ID_YIXIN ? '意心之镜' : '自定义');
    console.log('User:', userId);
    console.log('Query:', query);
    console.log('Conversation ID:', conversationId);
    console.log('Chat History (已忽略，只使用 conversation_id):', JSON.stringify(chatHistory, null, 2));
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));
    console.log('===================');

    const response = await fetch(`${COZE_API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BOT_API_TOKEN || ''}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('=== Coze API 响应 Headers ===');
    response.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Coze API Error:', response.status, errorText);
      throw new Error(`Coze API 请求失败: ${response.status} - ${errorText}`);
    }

    const rawData = await response.text();

    console.log('=== Coze API 原始响应（完整） ===');
    console.log('原始数据类型:', typeof rawData);
    console.log('原始数据长度:', rawData.length);
    console.log('原始数据内容:');
    console.log(rawData);
    console.log('================================');

    if (!rawData || rawData.trim() === '') {
      throw new Error('Coze API 返回空数据');
    }

    try {
      const data = JSON.parse(rawData);

      console.log('=== Coze API 原始响应 ===');
      console.log(rawData);
      console.log('解析后的完整数据:', JSON.stringify(data, null, 2));
      console.log('===================');

      // 提取响应内容
      let answer = '';
      let thinking = '';
      let convId = '';
      let msgId = '';

      // 提取对话ID和消息ID
      if (data.data) {
        convId = data.data.conversation_id || data.data.conversationId || '';
        msgId = data.data.msg_id || data.data.msgId || '';
        console.log('从 data.data 提取 conversationId:', convId, 'msgId:', msgId);
      }

      // 如果 data.data 中没有，尝试从根级别提取
      if (!convId) {
        convId = data.conversation_id || data.conversationId || '';
        msgId = data.msg_id || data.msgId || '';
        console.log('从根级别提取 conversationId:', convId, 'msgId:', msgId);
      }

      // 首先尝试从 data.data.answer 获取答案（这是最可靠的）
      if (data.data && data.data.answer) {
        answer = data.data.answer;
        console.log('✓ 从 data.data.answer 获取答案:', answer);
      } else if (data.answer) {
        answer = data.answer;
        console.log('✓ 从 data.answer 获取答案:', answer);
      } else {
        console.log('⚠ answer 字段不存在，从 messages 数组中提取');
        let messages: CozeMessage[] = [];
        if (data.messages && Array.isArray(data.messages)) {
          messages = data.messages;
        } else if (data.code === 0 && data.data && data.data.messages && Array.isArray(data.data.messages)) {
          messages = data.data.messages;
        }
        console.log('提取的 messages:', JSON.stringify(messages, null, 2));
        // 优先查找 type: 'answer' 的消息
        for (const msg of messages) {
          console.log('处理消息:', JSON.stringify(msg, null, 2));

          // 优先查找思维过程
          if (msg.type === 'thinking' || msg.content_type === 'thinking') {
            thinking = msg.content;
            console.log('→ 找到 thinking:', thinking);
          }

          // 优先查找 type: 'answer' 的消息
          if (msg.type === 'answer') {
            answer = msg.content;
            console.log('✓✓✓ 找到 type=answer 的消息:', answer);
            // 找到 answer 后立即停止遍历，避免被其他消息覆盖
            break;
          }

          // 如果没有找到 type: 'answer'，才考虑 role: 'assistant'
          if (!answer && msg.role === 'assistant' && msg.type !== 'verbose' && msg.type !== 'follow_up') {
            answer = msg.content;
            console.log('→ 从 messages 找到 answer:', answer);
          }
        }
      }

      console.log('最终返回:', {
        answer,
        thinking,
        conversationId: convId,
        msgId
      });

      return {
        answer: answer || '抱歉，我没有收到回复。',
        thinking: thinking || undefined,
        conversationId: convId,
        msgId: msgId,
      };
    } catch (parseError) {
      console.error('解析 Coze API 响应失败:', parseError);
      throw new Error(`Coze API 响应解析失败`);
    }
  } catch (error) {
    console.error('调用 Coze 智能体失败:', error);
    throw error;
  }
}
