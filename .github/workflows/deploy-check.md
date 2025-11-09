# GitHub Pages 部署检查清单

在部署之前，请确保完成以下步骤：

## 1. 准备工作

- [ ] 代码已推送到 GitHub 仓库
- [ ] 仓库是公开的（GitHub Pages 免费版需要公开仓库）
- [ ] Node.js 版本 ≥ 20
- [ ] 所有依赖已正确安装

## 2. GitHub Pages 设置

- [ ] 进入仓库的 `Settings` -> `Pages`
- [ ] 在 `Source` 中选择 `GitHub Actions`
- [ ] 保存设置

## 3. 环境变量配置（如果需要）

如果项目需要环境变量（如 `VITE_APP_ID`）：

- [ ] 进入仓库的 `Settings` -> `Secrets and variables` -> `Actions`
- [ ] 点击 `New repository secret`
- [ ] 添加所需的环境变量（如 `VITE_APP_ID`）
- [ ] 在 `.github/workflows/deploy.yml` 中取消注释环境变量配置

## 4. 触发部署

- [ ] 推送代码到 `main` 或 `master` 分支
- [ ] 或者手动触发工作流：`Actions` -> `Deploy to GitHub Pages` -> `Run workflow`

## 5. 检查部署状态

- [ ] 进入 `Actions` 标签页
- [ ] 查看部署工作流的状态
- [ ] 如果失败，查看日志并修复错误

## 6. 访问网站

- [ ] 部署完成后，访问：`https://<你的用户名>.github.io/<仓库名>/`
- [ ] 检查网站是否正常加载
- [ ] 测试路由是否正常工作
- [ ] 检查静态资源是否正常加载

## 常见问题

### 部署失败

1. 检查 Node.js 版本是否正确
2. 检查依赖是否正确安装
3. 查看 GitHub Actions 日志了解具体错误

### 页面无法访问

1. 检查 GitHub Pages 设置是否正确
2. 检查 base path 配置是否正确
3. 等待几分钟后重试（部署可能需要一些时间）

### 路由不工作

1. 检查 `vite.config.prod.ts` 中的 `base` 配置
2. 检查 `src/App.tsx` 中的 `basename` 配置
3. 确保路由路径正确

### 静态资源加载失败

1. 检查资源路径是否正确
2. 检查 base path 配置
3. 检查资源文件是否存在

## 需要帮助？

如果遇到问题，请查看：
- [DEPLOY.md](./DEPLOY.md) - 详细的部署指南
- [README.md](./README.md) - 项目说明文档
- GitHub Actions 日志 - 查看具体错误信息

