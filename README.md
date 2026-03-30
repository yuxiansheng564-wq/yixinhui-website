# projects

---

## AI 助手工作规则（必须遵守）

### 核心原则
1. **理解 ≠ 执行**：只有明确指令才动手（"去改"、"执行"、"做吧"）
2. **动手前必须确认**：告知改什么文件、改什么内容，等待确认
3. **改动范围控制**：说改样式只改样式，说改某组件只改那个组件

### 公司业务线

**业务架构**
- AI 能力建设
  - AI 变现破框课（线下课程）
- 数字员工
  - AI 获客：内容炼金术士、IP内容复刻大师、爆款战术小队、AI全域同城榜
  - AI 销售：销售大宗师、商务谈判大师
  - 专业服务 AI 化：AI 课程助教、咨询专家助手

**动态分类**
- AI 获客：AI 获客产品相关动态
- AI 销售：AI 销售产品相关动态
- 客户：客户案例、客户故事
- 公司：公司新闻、活动、公告
- AI 能力建设：企业 AI 能力建设相关（包含课程和案例）

### 设计偏好（参考 OpenAI 官网）

**整体风格**
- 极简主义，黑白灰为主色调
- 大量留白，视觉呼吸感强
- 专业克制，没有多余装饰

**布局结构**
- 清晰的板块划分
- 垂直列表式排列，不是网格
- 板块标题区：左侧标题 + 右侧"查看更多"

**卡片设计**
- 左侧图片（横向比例约 16:9）+ 右侧文字
- 标题：白色，font-medium，hover 变蓝
- 标签 + 时间：灰色小字，同行排列，无背景框
- 卡片之间用底部分割线分隔，不用卡片背景

**图片处理**
- 渐变色背景（紫蓝、蓝绿、橙黄等）
- 图片上有简洁文字说明
- 统一圆角处理

**字体层级**
- 板块标题：白色，text-xl，font-semibold
- 卡片标题：白色，text-base/lg，font-medium
- 标签：灰色，text-xs，无背景框
- 时间：灰色，text-xs

**容器宽度**
- PC 端：`max-w-7xl`（1280px）居中
- 移动端：`max-w-full` 占满屏幕
- 内边距：`px-4 sm:px-6 lg:px-8`

**响应式断点（Tailwind 默认）**
| 断点 | 最小宽度 | 典型设备 |
|------|---------|---------|
| 默认 | 0px | 手机竖屏 |
| sm | 640px | 手机横屏/小平板 |
| md | 768px | 平板竖屏 |
| lg | 1024px | 平板横屏/笔记本 |
| xl | 1280px | 桌面显示器 |
| 2xl | 1536px | 大屏显示器 |

**自适应控制规则**

*容器*
```
PC端：max-w-7xl mx-auto px-8
移动端：px-4
```

*板块标题区*
```
PC端：flex justify-between items-center
移动端：flex justify-between items-center（保持，字体调小）
```

*卡片布局*
```
PC端：flex items-center gap-5
移动端：flex items-center gap-3
```

*图片尺寸*
```
PC端：w-[180px] h-[100px]
移动端：w-[100px] h-[56px]
```

*字体大小*
```
板块标题：text-lg sm:text-xl
卡片标题：text-sm sm:text-base
标签/时间：text-xs（不变）
```

*间距*
```
卡片间距：py-4 border-b（PC和移动端一致）
板块间距：py-10 sm:py-16 lg:py-20
```

**图片设计风格**

*渐变背景*
- 主色调渐变：紫蓝渐变、蓝绿渐变、橙黄渐变、粉紫渐变
- 方向：对角线渐变（135deg）或水平渐变
- 风格：柔和过渡，不要生硬分界

*图文叠加*
- 图片上可叠加简洁白色文字说明
- 文字位置：左下角或居中
- 文字大小：text-sm 或 text-xs
- 必要时加半透明遮罩确保可读性

*圆角处理*
- 统一使用 `rounded-lg`（8px）或 `rounded-xl`（12px）
- 同一页面内保持一致

*图标/插图风格*
- 线性图标为主，stroke-width 细
- 单色或双色，配合品牌色
- 插图采用扁平化、极简风格
- 避免过于复杂的插画

*图片比例*
- 首页卡片缩略图：16:9 横向（180x100px）
- 文章内配图：16:9 或 4:3
- 头像/Logo：1:1 正方形

**二级页面设计风格**

*页面结构*
```
┌─────────────────────────────────────┐
│          顶部导航（复用）              │
├─────────────────────────────────────┤
│  面包屑导航（可选）                    │
│  页面标题区                           │
├─────────────────────────────────────┤
│                                     │
│          内容主体区                    │
│         max-w-4xl 居中               │
│                                     │
├─────────────────────────────────────┤
│          底部（复用）                  │
└─────────────────────────────────────┘
```

*面包屑导航*
- 位置：页面顶部，标题上方
- 样式：灰色小字 text-sm，分隔符用 `/`
- 示例：`首页 / 产品 / AI客服`

*页面标题区*
- 标题：白色，text-2xl sm:text-3xl，font-semibold
- 描述：灰色，text-base，mt-2
- 底部留白：mb-8

*内容主体区*
- 容器：`max-w-4xl`（文章页）或 `max-w-7xl`（列表页）
- 段落：text-base leading-relaxed
- 小标题：text-lg font-medium mt-8 mb-4
- 图片：居中，rounded-lg，有阴影或边框

*返回按钮*
- 位置：页面左上角或面包屑旁
- 样式：ghost 按钮，hover 有背景
- 图标：左箭头 + 文字"返回"

*侧边栏（可选）*
- 位置：右侧，内容区并列
- 宽度：w-64 固定
- 内容：目录导航、相关链接、标签列表
- 响应式：移动端隐藏或折叠

*列表页卡片*
- 布局：横向排列，左图右文
- 图片：w-[200px] h-[112px]（16:9）
- 标题：text-lg font-medium
- 摘要：text-sm 灰色，最多两行截断

**交互**
- 标题 hover 变蓝
- 整卡可点击
- 过渡动画流畅简洁

### 沟通偏好
- 不要表情符号
- 不要过度解释，直接说重点
- 总结简洁
- **每次修改必须先告知用户改什么文件、改什么内容，等待确认后再执行**

### API配置
- Coze Bot ID: `7481860697149407270`
- API版本: v2，Token环境变量: `NEXT_PUBLIC_COZE_API_TOKEN`

---

这是一个基于 [Next.js 16](https://nextjs.org) + [shadcn/ui](https://ui.shadcn.com) 的全栈应用项目，由扣子编程 CLI 创建。

## 快速开始

### 启动开发服务器

```bash
coze dev
```

启动后，在浏览器中打开 [http://localhost:5000](http://localhost:5000) 查看应用。

开发服务器支持热更新，修改代码后页面会自动刷新。

### 构建生产版本

```bash
coze build
```

### 启动生产服务器

```bash
coze start
```

## 项目结构

```
src/
├── app/                      # Next.js App Router 目录
│   ├── layout.tsx           # 根布局组件
│   ├── page.tsx             # 首页
│   ├── globals.css          # 全局样式（包含 shadcn 主题变量）
│   └── [route]/             # 其他路由页面
├── components/              # React 组件目录
│   └── ui/                  # shadcn/ui 基础组件（优先使用）
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/                     # 工具函数库
│   └── utils.ts            # cn() 等工具函数
└── hooks/                   # 自定义 React Hooks（可选）
```

## 核心开发规范

### 1. 组件开发

**优先使用 shadcn/ui 基础组件**

本项目已预装完整的 shadcn/ui 组件库，位于 `src/components/ui/` 目录。开发时应优先使用这些组件作为基础：

```tsx
// ✅ 推荐：使用 shadcn 基础组件
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>标题</CardHeader>
      <CardContent>
        <Input placeholder="输入内容" />
        <Button>提交</Button>
      </CardContent>
    </Card>
  );
}
```

**可用的 shadcn 组件清单**

- 表单：`button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`
- 布局：`card`, `separator`, `tabs`, `accordion`, `collapsible`, `scroll-area`
- 反馈：`alert`, `alert-dialog`, `dialog`, `toast`, `sonner`, `progress`
- 导航：`dropdown-menu`, `menubar`, `navigation-menu`, `context-menu`
- 数据展示：`table`, `avatar`, `badge`, `hover-card`, `tooltip`, `popover`
- 其他：`calendar`, `command`, `carousel`, `resizable`, `sidebar`

详见 `src/components/ui/` 目录下的具体组件实现。

### 2. 路由开发

Next.js 使用文件系统路由，在 `src/app/` 目录下创建文件夹即可添加路由：

```bash
# 创建新路由 /about
src/app/about/page.tsx

# 创建动态路由 /posts/[id]
src/app/posts/[id]/page.tsx

# 创建路由组（不影响 URL）
src/app/(marketing)/about/page.tsx

# 创建 API 路由
src/app/api/users/route.ts
```

**页面组件示例**

```tsx
// src/app/about/page.tsx
import { Button } from '@/components/ui/button';

export const metadata = {
  title: '关于我们',
  description: '关于页面描述',
};

export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
      <Button>了解更多</Button>
    </div>
  );
}
```

**动态路由示例**

```tsx
// src/app/posts/[id]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>文章 ID: {id}</div>;
}
```

**API 路由示例**

```tsx
// src/app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

### 3. 依赖管理

**必须使用 pnpm 管理依赖**

```bash
# ✅ 安装依赖
pnpm install

# ✅ 添加新依赖
pnpm add package-name

# ✅ 添加开发依赖
pnpm add -D package-name

# ❌ 禁止使用 npm 或 yarn
# npm install  # 错误！
# yarn add     # 错误！
```

项目已配置 `preinstall` 脚本，使用其他包管理器会报错。

### 4. 样式开发

**使用 Tailwind CSS v4**

本项目使用 Tailwind CSS v4 进行样式开发，并已配置 shadcn 主题变量。

```tsx
// 使用 Tailwind 类名
<div className="flex items-center gap-4 p-4 rounded-lg bg-background">
  <Button className="bg-primary text-primary-foreground">
    主要按钮
  </Button>
</div>

// 使用 cn() 工具函数合并类名
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)}>
  内容
</div>
