# 视频管理指南

## 📝 如何添加新视频

### 方法一：直接编辑配置文件（推荐）

1. 打开 `videos-config.json` 文件
2. 在对应的分类下添加视频信息
3. 保存文件
4. 告诉我"更新视频"，我会帮您同步到网站

---

## 📋 配置文件格式

### 本地视频（< 50MB）

```json
{
  "id": "tip-6",
  "title": "视频标题",
  "description": "视频描述",
  "duration": "3:00",
  "thumbnail": "/thumbnails/xxx.jpg",
  "type": "local",
  "videoUrl": "/videos/xxx.mp4"
}
```

### B站视频

```json
{
  "id": "tip-7",
  "title": "视频标题",
  "description": "视频描述",
  "duration": "5:00",
  "type": "bilibili",
  "embedCode": "//player.bilibili.com/player.html?..."
}
```

### 其他平台（腾讯视频、优酷等）

```json
{
  "id": "tip-8",
  "title": "视频标题",
  "description": "视频描述",
  "duration": "4:00",
  "type": "iframe",
  "embedCode": "iframe src 的完整地址"
}
```

---

## 🔧 获取嵌入代码的方法

### B站
1. 打开视频页面
2. 点击"分享"
3. 选择"嵌入"
4. 复制 iframe 中的 `src` 属性（去掉 `https:`）

### 腾讯视频
1. 打开视频页面
2. 点击"分享"
3. 选择"嵌入代码"
4. 复制 iframe 中的 `src` 属性

### 优酷
1. 打开视频页面
2. 点击"分享"
3. 选择"复制代码"
4. 复制 iframe 中的 `src` 属性

---

## 📂 视频分类

目前支持的分类：

### weekly-tips（本周AI-tips）
适合：本周更新的 AI 技巧、演示视频

---

## 💡 快速添加模板

复制下面的模板，填写内容：

### 添加 B站视频：
```json
{
  "id": "tip-新编号",
  "title": "在此填写标题",
  "description": "在此填写描述",
  "duration": "X:XX",
  "type": "bilibili",
  "embedCode": "在此粘贴嵌入代码"
}
```

### 添加本地视频：
```json
{
  "id": "tip-新编号",
  "title": "在此填写标题",
  "description": "在此填写描述",
  "duration": "X:XX",
  "thumbnail": "/thumbnails/xxx.jpg",
  "type": "local",
  "videoUrl": "/videos/xxx.mp4"
}
```

---

## 🎯 工作流程

1. **准备视频**
   - 上传到 B站 或 本地（< 50MB）
   - 获取嵌入代码

2. **编辑配置文件**
   - 打开 `videos-config.json`
   - 在对应分类下添加视频信息
   - 保存文件

3. **同步到网站**
   - 告诉我："更新视频"
   - 我会自动同步到网站

---

## 📊 示例

### 您想添加一个 B站视频：

1. 打开 `videos-config.json`
2. 找到 `"weekly-tips"` 数组
3. 在合适位置添加：

```json
{
  "id": "tip-9",
  "title": "AI客服实战",
  "description": "演示AI客服如何处理复杂用户咨询",
  "duration": "6:30",
  "type": "bilibili",
  "embedCode": "//player.bilibili.com/player.html?isOutside=true&aid=123456&bvid=BV1xx&cid=123456&p=1"
}
```

4. 保存文件
5. 告诉我："更新视频"
6. 我帮您同步到网站

---

## ⚠️ 注意事项

1. **id 必须唯一**：每个视频的 id 不能重复
2. **duration 格式**：使用 "分:秒" 格式，例如 "5:30"
3. **B站嵌入代码**：只复制 `src` 属性，去掉 `https:`
4. **本地视频**：确保文件已上传到 `/public/videos/` 目录
5. **缩略图**：可选，如果没有会使用默认占位图

---

## 🆘 需要帮助？

如果遇到问题，直接告诉我：
- "我想添加视频，帮我看看配置对不对"
- "更新视频"（我会帮您同步到网站）
- "删除视频"
- "调整视频顺序"
