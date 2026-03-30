# Coze 智能体集成配置指南

## 概述

本项目已成功集成 Coze 智能体（ID: 7481860697149407270），用户可以通过网站搜索框和浮动聊天组件与您的智能体进行对话。

## 配置步骤

### 1. 获取 Coze API Token

1. 访问 [Coze 开发者平台](https://www.coze.cn/docs/developer_guides/get_token.html)
2. 登录您的 Coze 账号
3. 进入"开发者"或"个人中心"页面
4. 找到"API Token"或"访问令牌"选项
5. 创建新的 API Token，并保存它（**请妥善保管，不要泄露**）

### 2. 配置环境变量

在项目根目录下创建 `.env.local` 文件（如果不存在），并添加以下内容：

```bash
# Coze 智能体配置
NEXT_PUBLIC_COZE_API_TOKEN=你的_coze_api_token_在这里
```

**注意：**
- 将 `你的_coze_api_token_在这里` 替换为您在步骤 1 中获取的实际 API Token
- `.env.local` 文件不会被提交到 Git 仓库，确保 Token 安全
- 如果 `.env.local` 文件已存在，只需添加这一行即可

### 3. 重启开发服务器

配置完成后，需要重启开发服务器以加载新的环境变量：

```bash
# 如果服务器正在运行，先停止（Ctrl+C）
# 然后重新启动
coze dev
```

## 功能说明

### 集成位置

1. **Hero 搜索框**（页面底部）
   - 位置：`src/components/search-box.tsx`
   - 风格：OpenAI 风格，简洁的深色主题
   - 引导语："体验AI能力，和意心之镜聊聊吧"
   - 支持输入内容后点击发送按钮或按 Enter 键

2. **搜索模态框**（全屏对话界面）
   - 位置：`src/components/search-modal.tsx`
   - 功能：与 Coze 智能体进行多轮对话
   - 支持自动滚动、加载状态、错误处理

3. **浮动聊天组件**（右下角）
   - 位置：`src/components/floating-chat-widget.tsx`
   - 行为：滚动时隐藏，鼠标静止 2 秒后显示
   - 可扩展为全屏对话界面

### API 调用逻辑

- **API 文件**：`src/lib/coze-api.ts`
- **智能体 ID**：7481860697149407270
- **支持的功能**：
  - 单次对话调用
  - 多轮对话（带历史记录）
  - 流式响应（可选，已预留接口）

### 消息处理

1. **用户消息**：实时显示在聊天界面
2. **AI 响应**：调用 Coze API 获取智能体回复
3. **错误处理**：API 调用失败时显示友好的错误提示
4. **加载状态**：显示动态加载动画

## 技术细节

### Coze API 请求格式

```typescript
{
  bot_id: "7481860697149407270",
  user_id: "user_xxx_xxx",  // 自动生成唯一用户ID
  query: "用户的问题",
  stream: false,  // 当前使用非流式响应
  chat_history: [...]  // 对话历史（可选）
}
```

### 环境变量访问

```typescript
const token = process.env.NEXT_PUBLIC_COZE_API_TOKEN;
```

**重要：** 环境变量名必须以 `NEXT_PUBLIC_` 开头，才能在客户端代码中访问。

## 测试

配置完成后，测试步骤：

1. 访问网站：`http://localhost:5000`
2. 滚动到页面底部，找到搜索框
3. 输入问题，点击发送按钮或按 Enter
4. 等待 AI 响应（首次调用可能需要 2-3 秒）
5. 继续提问，测试多轮对话功能

### 预期结果

- 用户消息立即显示
- 显示"正在输入..."加载动画
- 2-3 秒后显示 AI 回复
- 可以继续对话，AI 会记住上下文

## 常见问题

### Q1: API 调用失败怎么办？

**A:** 检查以下几点：
1. 确认 `.env.local` 文件中的 Token 是否正确
2. 确认 Token 是否有足够的权限
3. 检查网络连接
4. 查看浏览器控制台的错误日志

### Q2: 为什么 AI 回复很慢？

**A:** 这可能是由于：
1. Coze API 的响应时间（通常 1-3 秒）
2. 网络延迟
3. 智能体配置的复杂度

可以考虑启用流式响应（已预留接口 `callCozeAgentStream`）来改善用户体验。

### Q3: 对话历史会丢失吗？

**A:** 当前实现：
- 单次会话：会话结束（关闭模态框）后历史清空
- 持久化：如需保存对话历史，需要额外实现（如 LocalStorage 或后端数据库）

### Q4: 如何修改智能体配置？

**A:** 
1. 在 Coze 平台修改您的智能体配置
2. 修改 `src/lib/coze-api.ts` 中的 `COZE_BOT_ID`（如需切换智能体）
3. 重启服务器

### Q5: API Token 安全性

**A:**
- Token 已通过环境变量管理，不会暴露在代码中
- `.env.local` 文件不会被提交到 Git
- **注意**：`NEXT_PUBLIC_` 前缀的变量会被打包到客户端 bundle 中，因此不要在前端代码中暴露敏感信息
- 如需更安全的方案，可以创建后端 API Route 作为代理

## 下一步优化建议

1. **启用流式响应**：使用 `callCozeAgentStream` 函数实现打字机效果
2. **对话历史持久化**：将对话保存到 LocalStorage 或数据库
3. **后端 API 代理**：创建 `/api/coze/chat` 路由，隐藏 Token
4. **错误重试机制**：API 失败时自动重试
5. **输入验证**：对用户输入进行过滤和验证

## 相关文件

- `src/lib/coze-api.ts` - Coze API 调用封装
- `src/components/search-box.tsx` - Hero 搜索框
- `src/components/search-modal.tsx` - 搜索模态框
- `src/components/floating-chat-widget.tsx` - 浮动聊天组件
- `.env.local` - 环境变量配置（需手动创建）

## 技术支持

如有问题，请联系开发团队或查阅 [Coze 官方文档](https://www.coze.cn/docs/)。
