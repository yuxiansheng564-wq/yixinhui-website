# 超简单视频配置指南

## 🎯 核心理念

只需要填写 **3 个字段**：
- 位置：数字（1, 2, 3...）
- 标题：视频标题
- 视频链接：B站链接或嵌入代码

---

## 📋 配置文件

编辑文件：`videos-simple.json`

```json
{
  "每周AI-tips": [
    {
      "位置": 1,
      "标题": "狼哥数字人演示",
      "视频链接": "/videos/狼哥数字人.mp4"
    },
    {
      "位置": 2,
      "标题": "AI销售管理如何做？",
      "视频链接": "在这里填写B站链接"
    }
  ]
}
```

---

## 🔗 B站链接怎么获取？

### 方法一：获取嵌入代码（推荐）✅

**步骤：**

1. 打开B站视频页面
2. 点击"分享" → "嵌入"
3. 复制嵌入代码中的 **src 属性**

**示例：**
```
原始嵌入代码：
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=123&bvid=BV1xx&cid=123&p=1"></iframe>

复制的内容：
//player.bilibili.com/player.html?isOutside=true&aid=123&bvid=BV1xx&cid=123&p=1
```

**填写到配置文件：**
```json
{
  "位置": 2,
  "标题": "AI销售管理",
  "视频链接": "//player.bilibili.com/player.html?isOutside=true&aid=123&bvid=BV1xx&cid=123&p=1"
}
```

---

### 方法二：使用B站视频链接

**步骤：**

1. 打开B站视频页面
2. 复制浏览器地址栏的链接

**示例：**
```
https://www.bilibili.com/video/BV1xx411c7mD
```

**填写到配置文件：**
```json
{
  "位置": 2,
  "标题": "AI销售管理",
  "视频链接": "https://www.bilibili.com/video/BV1xx411c7mD"
}
```

**然后告诉我：** "解析B站链接"，我会帮您转换成嵌入代码

---

## 📍 位置说明

**位置编号决定了视频在页面上的显示顺序：**

- 位置 1 → 第一个显示
- 位置 2 → 第二个显示
- 位置 3 → 第三个显示
- ...

**注意：**
- 位置可以跳过（例如：1, 3, 5）
- 位置可以重复（会按配置顺序显示）
- 建议使用连续的数字：1, 2, 3, 4, 5...

---

## 📝 使用步骤

### 添加一个新视频

**步骤：**

1. 打开文件 `videos-simple.json`
2. 在数组中添加：
   ```json
   {
     "位置": 6,
     "标题": "您的视频标题",
     "视频链接": "//player.bilibili.com/player.html?..."
   }
   ```
3. 保存文件
4. 告诉我：**"更新视频"**
5. ✅ 完成！

---

### 批量添加视频

**一次性添加多个：**

```json
[
  {
    "位置": 6,
    "标题": "视频1",
    "视频链接": "//player.bilibili.com/..."
  },
  {
    "位置": 7,
    "标题": "视频2",
    "视频链接": "//player.bilibili.com/..."
  },
  {
    "位置": 8,
    "标题": "视频3",
    "视频链接": "//player.bilibili.com/..."
  }
]
```

---

## 🎯 完整示例

假设您有3个B站视频要添加：

**步骤1：获取嵌入代码**

视频1：`//player.bilibili.com/player.html?isOutside=true&aid=111&bvid=BV111&cid=111&p=1`
视频2：`//player.bilibili.com/player.html?isOutside=true&aid=222&bvid=BV222&cid=222&p=1`
视频3：`//player.bilibili.com/player.html?isOutside=true&aid=333&bvid=BV333&cid=333&p=1`

**步骤2：编辑配置文件**

```json
{
  "每周AI-tips": [
    {
      "位置": 1,
      "标题": "狼哥数字人演示",
      "视频链接": "/videos/狼哥数字人.mp4"
    },
    {
      "位置": 2,
      "标题": "AI销售管理如何做？",
      "视频链接": "//player.bilibili.com/player.html?isOutside=true&aid=116020874382329&bvid=BV14JFqzNESv&cid=35850619539&p=1"
    },
    {
      "位置": 3,
      "标题": "视频1标题",
      "视频链接": "//player.bilibili.com/player.html?isOutside=true&aid=111&bvid=BV111&cid=111&p=1"
    },
    {
      "位置": 4,
      "标题": "视频2标题",
      "视频链接": "//player.bilibili.com/player.html?isOutside=true&aid=222&bvid=BV222&cid=222&p=1"
    },
    {
      "位置": 5,
      "标题": "视频3标题",
      "视频链接": "//player.bilibili.com/player.html?isOutside=true&aid=333&bvid=BV333&cid=333&p=1"
    }
  ]
}
```

**步骤3：保存文件**

**步骤4：告诉我：** "更新视频"

**步骤5：✅ 完成！**

---

## 💡 支持的视频链接类型

### 1. 本地视频（< 50MB）
```json
{
  "视频链接": "/videos/xxx.mp4"
}
```

### 2. B站嵌入代码（推荐）
```json
{
  "视频链接": "//player.bilibili.com/player.html?isOutside=true&aid=xxx&bvid=xxx&cid=xxx&p=1"
}
```

### 3. B站视频页面链接（需要我解析）
```json
{
  "视频链接": "https://www.bilibili.com/video/BV1xx411c7mD"
}
```
然后告诉我："解析B站链接"

---

## ⚠️ 注意事项

1. **链接格式**
   - B站嵌入代码：去掉 `https:`（例如 `//player.bilibili.com/...`）
   - B站视频链接：完整链接（例如 `https://www.bilibili.com/video/BV1xx...`）
   - 本地视频：以 `/videos/` 开头

2. **位置编号**
   - 建议使用连续数字：1, 2, 3, 4, 5...
   - 不要重复相同的位置编号

3. **标题**
   - 不要使用引号（"）在标题中
   - 如果必须有，使用中文引号（""）

---

## 🆘 快速命令

- **"更新视频"** - 同步配置到网站
- **"解析B站链接"** - 把B站视频页面链接转换成嵌入代码
- **"查看视频列表"** - 查看当前所有视频
- **"删除位置 X"** - 删除指定位置的视频
- **"检查配置"** - 检查配置文件格式

---

## ✅ 总结

**超简单三步：**

```
1. 打开 videos-simple.json
2. 填写：位置 + 标题 + 视频链接
3. 告诉我："更新视频"
```

**就这么简单！** 🎉
