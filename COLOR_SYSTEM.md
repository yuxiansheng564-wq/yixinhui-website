# 完整配色体系规范

## 一、文字层级（从高到低，5级）

| 层级 | 颜色 | 用途 | 示例 |
|------|------|------|------|
| **L1** | `text-white` | 主标题、核心信息 | 板块大标题、产品名称、CTA按钮文字 |
| **L2** | `text-gray-200` | 次级标题 | 卡片标题、功能名称、展开项标题 |
| **L3** | `text-gray-400` | 正文描述 | 功能说明、正文内容、主要描述 |
| **L4** | `text-gray-500` | 辅助信息、标签 | 副标题、分类标签、提示文字 |
| **L5** | `text-gray-600` | 次要信息 | 占位符、禁用状态、最弱信息 |

### 使用规则
- **标题 → 描述 → 标签 → 提示**：白 → 灰400 → 灰500 → 灰600
- 同一卡片内，标题比描述亮两个层级
- 副标题用L4（灰500），不要和正文（灰400）混在一起

---

## 二、背景层级（从深到浅，5级）

| 层级 | 颜色 | 用途 |
|------|------|------|
| **L1** | `bg-black` | 页面主背景 |
| **L2** | `bg-[#0a0a0a]` / `bg-gray-950` | 板块容器背景 |
| **L3** | `bg-[#111]` / `bg-gray-900` | 卡片背景 |
| **L4** | `bg-[#1a1a1a]` / `bg-gray-800` | 卡片内嵌区块、hover背景 |
| **L5** | `bg-[#222]` / `bg-gray-700` | 按钮hover、输入框背景 |

### 使用规则
- **页面 → 板块 → 卡片 → 内嵌 → hover**：从深到浅
- 板块容器比页面浅一层
- 卡片比板块浅一层
- 逐级加深，形成层次感

---

## 三、边框层级（5级）

| 层级 | 颜色 | 用途 |
|------|------|------|
| **L1** | `border-gray-800` | 默认边框（几乎不可见） |
| **L2** | `border-gray-700` | 可见边框 |
| **L3** | `border-gray-600` | 强调边框 |
| **L4** | `border-purple-500/30` | 品牌色边框（hover/active） |
| **L5** | `border-purple-500` | 最强强调 |

---

## 四、高亮色使用规则

### 紫色（品牌主色）- 用于核心关注点
- 板块标题左侧图标
- 主CTA按钮
- 品牌关键词高亮
- 优势侧/选中状态
- 品牌核心产品线（意心·学院）

### 蓝色（辅助层级）- 用于次级区分
- 第二产品线（意心·智造）
- 辅助图标
- 层级区分（如流程终点）

### 渐变使用场景
| 场景 | 渐变方向 | 示例 |
|------|---------|------|
| **递进流程** | 浅紫 → 深紫 → 蓝 | 服务流程 01→02→03 |
| **嵌套层级** | 内深紫 → 外浅蓝 | 三层内核 |
| **CTA按钮** | 紫色渐变 | `from-purple-500 to-purple-600` |
| **品牌高亮** | 紫色渐变文字 | `from-purple-400 to-purple-300` |

---

## 五、对比关系配色

| 位置 | 文字 | 背景 | 边框 | 指示条 |
|------|------|------|------|--------|
| **优势侧** | 白色/紫高亮 | 紫色光晕 | 紫色边框 | 紫色渐变 |
| **劣势侧** | 灰色系 | 无光晕 | 灰色边框 | 灰色 |

---

## 六、完整代码示例

### 标准卡片结构
```tsx
<div className="bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-purple-500/30 transition-all">
  {/* 标题 - L2 */}
  <h3 className="text-lg font-semibold text-gray-200">卡片标题</h3>
  
  {/* 副标题/标签 - L4 */}
  <p className="text-sm text-gray-500 mb-2">副标题或标签</p>
  
  {/* 正文描述 - L3 */}
  <p className="text-gray-400 leading-relaxed">正文描述内容...</p>
  
  {/* 辅助信息 - L5 */}
  <span className="text-xs text-gray-600">提示信息</span>
</div>
```

### 递进流程卡片
```tsx
{/* Step 01 - 浅紫（起点） */}
<div className="relative bg-[#111] rounded-xl p-5">
  <div className="absolute left-0 top-5 bottom-5 w-1 bg-gradient-to-b from-purple-400 to-purple-500 rounded-r" />
  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
    <span className="text-white font-bold">01</span>
  </div>
  <h3 className="text-gray-200 font-semibold">标题</h3>
  <p className="text-gray-400 text-sm">描述</p>
</div>

{/* Step 02 - 紫蓝（过渡） */}
<div className="absolute left-0 top-5 bottom-5 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r" />
<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
  <span className="text-white font-bold">02</span>
</div>

{/* Step 03 - 深蓝（终点） */}
<div className="absolute left-0 top-5 bottom-5 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r" />
<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
  <span className="text-white font-bold">03</span>
</div>
```

### 对比卡片
```tsx
{/* 劣势侧 - 全灰色系 */}
<div className="bg-gray-900/50 border-2 border-gray-800 rounded-xl p-6 relative">
  <div className="absolute left-0 top-6 bottom-6 w-1 bg-gray-700 rounded-r" />
  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
    <X className="w-5 h-5 text-gray-500" />
  </div>
  <h3 className="text-gray-400 font-semibold">劣势标题</h3>
  <p className="text-gray-600 text-sm">劣势描述</p>
</div>

{/* 优势侧 - 紫色高亮 */}
<div className="bg-purple-900/10 border-2 border-purple-500/40 rounded-xl p-6 relative">
  <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-purple-400 to-purple-600 rounded-r" />
  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
    <Check className="w-5 h-5 text-white" />
  </div>
  <h3 className="text-white font-semibold">优势标题</h3>
  <p className="text-gray-300 text-sm">优势描述</p>
</div>
```

---

## 七、常见错误

❌ **错误做法**
- 副标题用 `text-gray-400`（应该用 `text-gray-500`）
- 标题和描述用同一个灰色
- 所有边框都用 `border-gray-700`
- 没有层级过渡，直接黑白对比

✅ **正确做法**
- 标题比描述亮2个层级
- 副标题/标签用灰500，和正文灰400区分
- 递进流程用渐变色体现推进感
- 对比关系用左指示条+色系差异
