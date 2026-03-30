import { NextRequest, NextResponse } from 'next/server';

// TODO: 智能体API接口 - 等待智能体开发完成后接入
//
// 这个API路由用于处理与智能体的通信请求
// 当智能体开发完成后，请按照以下接口规范对接：
//
// 请求格式：
// POST /api/agent/chat
// {
//   "query": "用户的问题",
//   "conversationId": "会话ID（可选）",
//   "context": {
//     "previousMessages": [...]
//   }
// }
//
// 响应格式：
// {
//   "success": true,
//   "response": "AI的回复",
//   "conversationId": "会话ID",
//   "metadata": {
//     "model": "模型名称",
//     "tokensUsed": 123
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, conversationId, context } = body;

    // TODO: 替换为实际的智能体API调用
    // 示例代码（等待智能体开发完成后删除）：
    // const agentResponse = await callYourAgentAPI(query, context);
    // return NextResponse.json({
    //   success: true,
    //   response: agentResponse,
    //   conversationId: conversationId || generateConversationId(),
    //   metadata: {
    //     model: 'your-model-name',
    //     tokensUsed: 0
    //   }
    // });

    // 当前返回模拟响应
    const mockResponses: Record<string, string> = {
      '如何为企业定制AI应用':
        '意心智造提供专业的ASOP应用定制服务，流程如下：\n\n1️⃣ **确定商业目标** - 明确您的应用目标和需求\n2️⃣ **定制AI能力** - 根据需求定制答案质量、智能程度\n3️⃣ **设计交互体验** - 打造符合品牌调性的UI/UX\n4️⃣ **选择部署方式** - 云端部署、独立域名或API接入\n\n我们的专家团队会全程陪伴，确保交付符合您预期的AI应用！',
      '意心智造的服务流程是什么':
        '意心智造的服务流程分为四个简单步骤：\n\n**第一步**：选择您的AI应用商业目标\n- 提高工作效率、降低运营成本、提升用户体验\n\n**第二步**：定制您的AI能力\n- 答案质量、智能程度等个性化设置\n\n**第三步**：定制您的交互体验\n- 交互逻辑、UI设计、功能定制\n\n**第四步**：选择部署方式和品牌\n- 云端部署、独立域名、API接入\n\n整个过程预计 4-8 周，具体根据需求复杂度而定。',
      'ASOP应用能解决什么问题':
        'ASOP应用相比通用大模型，能解决以下核心问题：\n\n✅ **专业性** - 每次都是专家，不是新手\n✅ **效率** - 流程固定，效率翻倍\n✅ **知识沉淀** - 完整封存专家经验\n✅ **商业化** - 可直接商业化，支持定制\n\n💡 举个例子：用通用大模型写文案，每次都需要重复提示；用ASOP应用，只需输入主题，就能得到符合您品牌风格的高质量内容。',
      '意心学院有哪些课程':
        '意心学院提供系统化的AI应用开发课程：\n\n📚 **初级课程**（4周）\n- AI应用开发入门\n- Prompt Engineering基础\n\n📚 **中级课程**（8周）\n- ASOP应用进阶实战\n- 复杂业务场景处理\n\n📚 **高级课程**（12周）\n- AI商业化实战\n- 企业级项目开发\n\n🎓 每门课程都包含实战项目和导师一对一指导，完成课程可获得专业证书！',
    };

    const response = mockResponses[query] ||
      `感谢您的提问！关于"${query}"，意心会的专家团队会为您提供专业的AI解决方案。\n\n我们的服务包括：\n• 意心智造 - ASOP应用定制\n• 意心学院 - AI教育培训\n\n您想了解哪个方面的详细信息呢？`;

    return NextResponse.json({
      success: true,
      response,
      conversationId: conversationId || `conv_${Date.now()}`,
      metadata: {
        model: 'mock-ai-agent',
        tokensUsed: 0,
      },
    });

  } catch (error) {
    console.error('Agent API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// TODO: 实现实际的智能体API调用函数
// async function callYourAgentAPI(query: string, context?: any): Promise<string> {
//   // 在这里实现与您的智能体的通信
//   // 可以使用 fetch、axios 或其他HTTP客户端
//
//   // 示例：
//   // const response = await fetch('YOUR_AGENT_ENDPOINT', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     'Authorization': `Bearer ${process.env.AGENT_API_KEY}`
//   //   },
//   //   body: JSON.stringify({ query, context })
//   // });
//   // const data = await response.json();
//   // return data.response;
// }
