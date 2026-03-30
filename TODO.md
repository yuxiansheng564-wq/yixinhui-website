# 意心会官网部署 TODO

## 部署信息
- **服务器**：腾讯云轻量 Ubuntu 24.04，4核16G 180GB，IP 101.43.116.191
- **域名**：www.yiching.cn（已备案，SSL 已配置）
- **项目**：Next.js 16 + pnpm，端口 5000
- **项目路径**：/opt/yixinhui-web
- **PM2 进程名**：yixinhui-home
- **SSH**：`ssh -i "密钥路径/Yiclaw_腾讯云SSH密钥.pem" ubuntu@101.43.116.191`

## 部署步骤

### 1. 服务器环境准备
- [x] SSH 连接服务器，确认系统版本（Ubuntu 24.04）
- [x] Node.js 20.20.1 ✓
- [x] pnpm 10.32.1 ✓
- [x] Nginx 1.24.0 ✓
- [x] PM2 6.0.14 ✓

### 2. 项目部署
- [x] 创建项目目录 /opt/yixinhui-web
- [x] rsync 上传代码
- [x] 配置 .env 文件（BOT_API_TOKEN 已配置）
- [x] pnpm install && next build 成功
- [x] localhost:5000 返回 200

### 3. Nginx 配置
- [x] 配置 www.yiching.cn 反向代理到 localhost:5000
- [x] SSL 证书配置（复用已有 www.yiching.cn 证书）
- [x] HTTP → HTTPS 301 自动跳转

### 4. 进程管理
- [x] PM2 启动 yixinhui-home 进程
- [x] PM2 开机自启已配置（pm2 save + pm2 startup）

### 5. DNS 解析
- [x] www.yiching.cn A 记录已指向 101.43.116.191

### 6. 验证上线
- [x] HTTPS 200 验证通过
- [x] 浏览器无痕窗口访问 https://www.yiching.cn 确认正常
- [ ] 检查各页面功能
- [ ] （可选）配置 Coze BOT_API_TOKEN 启用 AI 对话功能

## 清理项（非必须）
- [ ] 移除未使用的依赖：drizzle-orm、drizzle-kit、drizzle-zod、pg、@types/pg、coze-coding-dev-sdk
