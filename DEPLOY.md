# 部署指南

本文档说明如何将前端项目部署到 GitHub Pages 或其他静态托管平台。

## 快速开始

### 1. 部署到 GitHub Pages（推荐）

#### 使用 GitHub Actions 自动部署

1. **准备 GitHub 仓库**
   
   检查是否已有 remote：
   ```bash
   git remote -v
   ```
   
   **情况 A：如果已有 remote，想使用现有仓库**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   # 或者如果分支是 master
   git push -u origin master
   ```
   
   **情况 B：如果已有 remote，想更换为新仓库**
   ```bash
   # 更新 remote URL
   git remote set-url origin https://github.com/你的用户名/你的仓库名.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
   
   **情况 C：如果没有 remote，创建新的**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```
   
   **情况 D：如果 remote 已存在但想重新添加**
   ```bash
   # 删除现有 remote
   git remote remove origin
   # 添加新的 remote
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库的 `Settings` -> `Pages`
   - 在 `Source` 中选择 `GitHub Actions`
   - 保存设置

3. **配置环境变量（如果需要）**
   - 进入仓库的 `Settings` -> `Secrets and variables` -> `Actions`
   - 如果需要 `VITE_APP_ID` 等环境变量，添加对应的 Secrets
   - 编辑 `.github/workflows/deploy.yml`，取消注释环境变量配置：
     ```yaml
     env:
       VITE_APP_ID: ${{ secrets.VITE_APP_ID }}
       VITE_BASE_PATH: /${{ steps.repo.outputs.name }}/
     ```

4. **触发部署**
   - 推送代码到 `main` 或 `master` 分支
   - GitHub Actions 会自动构建并部署
   - 部署完成后，访问：`https://<你的用户名>.github.io/<仓库名>/`

#### 手动部署

1. **构建项目**
   ```bash
   # 部署到子路径
   VITE_BASE_PATH=/repository-name/ npm run build:prod
   
   # 或部署到根路径
   npm run build:prod
   ```

2. **部署到 GitHub Pages**
   - 安装 `gh-pages` 包：
     ```bash
     npm install --save-dev gh-pages
     ```
   - 在 `package.json` 中添加部署脚本：
     ```json
     {
       "scripts": {
         "deploy": "gh-pages -d dist"
       }
     }
     ```
   - 运行部署：
     ```bash
     npm run deploy
     ```

### 2. 部署到 Vercel

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 配置构建设置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build:prod`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. 配置环境变量（如果需要）：
   - 在项目设置中添加 `VITE_APP_ID` 等环境变量
7. 点击 "Deploy"
8. 部署完成后，Vercel 会提供一个 URL

### 3. 部署到 Netlify

1. 访问 [Netlify](https://netlify.com)
2. 使用 GitHub 账号登录
3. 点击 "Add new site" -> "Import an existing project"
4. 选择你的 GitHub 仓库
5. 配置构建设置：
   - **Build command**: `npm run build:prod`
   - **Publish directory**: `dist`
6. 配置环境变量（如果需要）：
   - 在 "Site settings" -> "Environment variables" 中添加环境变量
7. 点击 "Deploy site"
8. 部署完成后，Netlify 会提供一个 URL

## 环境变量配置

如果项目需要环境变量，需要在部署平台配置：

### GitHub Pages (GitHub Actions)

在 `.github/workflows/deploy.yml` 中配置：
```yaml
env:
  VITE_APP_ID: ${{ secrets.VITE_APP_ID }}
```

在 GitHub 仓库设置中添加 Secrets：
- `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`

### Vercel

在项目设置中配置：
- `Settings` -> `Environment Variables`

### Netlify

在站点设置中配置：
- `Site settings` -> `Environment variables`

## 构建配置

### 本地构建测试

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build:prod

# 预览构建结果
npm run preview
```

### 构建输出

构建后的文件在 `dist` 目录中：
- `index.html` - 入口文件
- `assets/` - 静态资源（JS、CSS、图片等）

## 路由配置

项目使用 React Router 的 BrowserRouter，部署后需要确保服务器支持 SPA 路由：

### GitHub Pages
- GitHub Pages 自动支持 SPA 路由，无需额外配置

### Vercel
- Vercel 自动支持 SPA 路由，无需额外配置

### Netlify
- 创建 `public/_redirects` 文件：
  ```
  /*    /index.html   200
  ```

## 故障排除

### 1. 页面刷新后 404

**问题**: 刷新页面后出现 404 错误

**解决方案**:
- GitHub Pages: 已自动处理
- Vercel: 已自动处理
- Netlify: 需要创建 `public/_redirects` 文件

### 2. 静态资源加载失败

**问题**: 图片、CSS、JS 文件加载失败

**解决方案**:
- 检查 `vite.config.prod.ts` 中的 `base` 配置
- 确保 base path 与部署路径匹配
- 检查资源路径是否正确

### 3. 环境变量未生效

**问题**: 环境变量在部署后未生效

**解决方案**:
- 检查环境变量名称是否正确（必须以 `VITE_` 开头）
- 检查部署平台的环境变量配置
- 重新构建和部署

### 4. 构建失败

**问题**: GitHub Actions 构建失败

**解决方案**:
- 检查 Node.js 版本（需要 ≥ 20）
- 检查依赖是否正确安装
- 查看 GitHub Actions 日志了解具体错误

## 自定义域名

### GitHub Pages

1. 在仓库设置中添加自定义域名
2. 配置 DNS 记录
3. 启用 HTTPS

### Vercel

1. 在项目设置中添加自定义域名
2. 配置 DNS 记录
3. 自动启用 HTTPS

### Netlify

1. 在站点设置中添加自定义域名
2. 配置 DNS 记录
3. 自动启用 HTTPS

## 持续部署

配置完成后，每次推送到主分支都会自动触发部署：

- **GitHub Pages**: 通过 GitHub Actions 自动部署
- **Vercel**: 自动检测推送并部署
- **Netlify**: 自动检测推送并部署

## 更多信息

- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com/)

