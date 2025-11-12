## To JUMPSTARTER ZPIRE Team
Dear JUMPSTARTER ZPIRE Team:
The chat.md file is in the code page of this repository, and the front-end landing page can be visit here: https://jndalpha.github.io/ali/
The our landing page is mobile-friendly too, you can visit it by mobile phone.
We are looking forward to your comments!
Your Sincerely,
Group SyncU.

## 介绍

项目介绍

## 目录结构

```
├── README.md # 说明文档
├── components.json # 组件库配置
├── eslint.config.js # eslint 配置
├── index.html # 入口文件
├── package.json # 包管理
├── postcss.config.js # postcss 配置
├── public # 静态资源目录
│   ├── favicon.png # 图标
│   └── images # 图片资源
├── src # 源码目录
│   ├── App.tsx # 入口文件
│   ├── components # 组件目录
│   ├── context # 上下文目录
│   ├── db # 数据库配置目录
│   ├── hooks # 通用钩子函数目录
│   ├── index.css # 全局样式
│   ├── layout # 布局目录
│   ├── lib # 工具库目录
│   ├── main.tsx # 入口文件
│   ├── routes.tsx # 路由配置
│   ├── pages # 页面目录
│   ├── services  # 数据库交互目录
│   ├── types   # 类型定义目录
├── tsconfig.app.json  # ts 前端配置文件
├── tsconfig.json # ts 配置文件
├── tsconfig.node.json # ts node端配置文件
└── vite.config.ts # vite 配置文件
```

## 技术栈

Vite、TypeScript、React、Supabase

## 本地开发

### 如何在本地编辑代码？

您可以选择 [VSCode](https://code.visualstudio.com/Download) 或者您常用的任何 IDE 编辑器，唯一的要求是安装 Node.js 和 npm.

### 环境要求

```
# Node.js ≥ 20
# npm ≥ 10
例如：
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

具体安装步骤如下：

### 在 Windows 上安装 Node.js

```
# Step 1: 访问Node.js官网：https://nodejs.org/，点击下载后，会根据你的系统自动选择合适的版本（32位或64位）。
# Step 2: 运行安装程序：下载完成后，双击运行安装程序。
# Step 3: 完成安装：按照安装向导完成安装过程。
# Step 4: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 在 macOS 上安装 Node.js

```
# Step 1: 使用Homebrew安装（推荐方法）：打开终端。输入命令brew install node并回车。如果尚未安装Homebrew，需要先安装Homebrew，
可以通过在终端中运行如下命令来安装：
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
或者使用官网安装程序：访问Node.js官网。下载macOS的.pkg安装包。打开下载的.pkg文件，按照提示完成安装。
# Step 2: 验证安装：在命令提示符（cmd）或IDE终端（terminal）中输入 node -v 和 npm -v 来检查 Node.js 和 npm 是否正确安装。
```

### 安装完后按照如下步骤操作：

```
# Step 1: 下载代码包
# Step 2: 解压代码包
# Step 3: 用IDE打开代码包，进入代码目录
# Step 4: IDE终端输入命令行，安装依赖：npm i
# Step 5: IDE终端输入命令行，启动开发服务器：npm run dev -- --host 127.0.0.1
```

### 如何开发后端服务？

配置环境变量，安装相关依赖
如需使用数据库，请使用 supabase 官方版本或自行部署开源版本的 Supabase

### 如何配置应用中的三方 API？

具体三方 API 调用方法，请参考帮助文档：[源码导出](https://cloud.baidu.com/doc/MIAODA/s/Xmewgmsq7)，了解更多详细内容。

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions 自动部署（推荐）

1. **准备 GitHub 仓库**
   
   检查是否已有 remote：
   ```bash
   git remote -v
   ```
   
   **如果已有 remote，想使用现有仓库：**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push -u origin main  # 或 master
   ```
   
   **如果已有 remote，想更换为新仓库：**
   ```bash
   git remote set-url origin https://github.com/你的用户名/你的仓库名.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
   
   **如果没有 remote：**
   ```bash
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
   - 在 `.github/workflows/deploy.yml` 中取消注释并配置

4. **触发部署**
   - 推送代码到 `main` 或 `master` 分支
   - GitHub Actions 会自动构建并部署
   - 部署完成后，访问：`https://<你的用户名>.github.io/<仓库名>/`

### 方法二：手动部署

1. **构建项目**
   ```bash
   npm run build:prod
   ```

2. **部署到 GitHub Pages**
   - 如果部署到子路径（`username.github.io/repository-name`）：
     ```bash
     VITE_BASE_PATH=/repository-name/ npm run build:prod
     ```
   - 如果部署到根路径（`username.github.io`）：
     ```bash
     npm run build:prod
     ```

3. **上传 dist 目录**
   - 将 `dist` 目录的内容推送到 `gh-pages` 分支
   - 或在 GitHub 仓库设置中配置 Pages 源

### 其他部署平台

#### Vercel
1. 访问 [Vercel](https://vercel.com)
2. 导入 GitHub 仓库
3. 构建命令：`npm run build:prod`
4. 输出目录：`dist`
5. 自动部署完成

#### Netlify
1. 访问 [Netlify](https://netlify.com)
2. 导入 GitHub 仓库
3. 构建命令：`npm run build:prod`
4. 发布目录：`dist`
5. 自动部署完成

### 注意事项

- 如果项目需要环境变量（如 `VITE_APP_ID`），需要在部署平台的设置中配置
- GitHub Pages 部署到子路径时，会自动设置正确的 base path
- 路由使用 BrowserRouter，部署后刷新页面可能会 404，需要配置服务器重定向规则
- GitHub Pages 会自动处理 SPA 路由，无需额外配置

## 了解更多

您也可以查看帮助文档：[源码导出](https://cloud.baidu.com/doc/MIAODA/s/Xmewgmsq7)，了解更多详细内容。
