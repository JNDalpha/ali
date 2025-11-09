# 快速部署指南

## 解决 "remote origin already exists" 错误

如果遇到 `error: remote origin already exists.` 错误，请按照以下步骤操作：

### 方法 1：使用现有仓库（推荐）

如果你已经有一个 GitHub 仓库，直接使用它：

```bash
# 1. 添加所有文件
git add .

# 2. 提交更改
git commit -m "Add deployment configuration"

# 3. 推送到现有仓库
git push -u origin main
# 或者如果分支是 master
git push -u origin master
```

### 方法 2：更新 remote URL

如果你想更换为新的仓库：

```bash
# 1. 更新 remote URL
git remote set-url origin https://github.com/你的用户名/你的新仓库名.git

# 2. 验证 remote URL
git remote -v

# 3. 添加并提交文件
git add .
git commit -m "Initial commit"

# 4. 推送到新仓库
git push -u origin main
```

### 方法 3：删除后重新添加

如果你想完全重新设置 remote：

```bash
# 1. 删除现有 remote
git remote remove origin

# 2. 添加新的 remote
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 3. 验证 remote
git remote -v

# 4. 添加并提交文件
git add .
git commit -m "Initial commit"

# 5. 推送到仓库
git push -u origin main
```

## 完整部署流程

### 步骤 1：检查当前状态

```bash
# 检查 remote 配置
git remote -v

# 检查当前分支
git branch

# 检查文件状态
git status
```

### 步骤 2：准备代码

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Add deployment configuration"
```

### 步骤 3：推送到 GitHub

```bash
# 推送到远程仓库
git push -u origin main
# 或
git push -u origin master
```

### 步骤 4：启用 GitHub Pages

1. 访问你的 GitHub 仓库页面
2. 点击 `Settings` 标签
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 下拉菜单中选择 `GitHub Actions`
5. 点击 `Save` 保存设置

### 步骤 5：等待部署完成

1. 点击仓库顶部的 `Actions` 标签
2. 查看部署工作流的状态
3. 等待部署完成（通常需要 2-5 分钟）

### 步骤 6：访问网站

部署完成后，访问：
```
https://<你的用户名>.github.io/<仓库名>/
```

例如，如果用户名是 `JNDalpha`，仓库名是 `ali`，则访问：
```
https://JNDalpha.github.io/ali/
```

## 常见问题

### Q: 如何查看当前的 remote 配置？

```bash
git remote -v
```

### Q: 如何查看当前分支？

```bash
git branch
```

### Q: 如何切换分支？

```bash
# 切换到 main 分支
git checkout main

# 或创建并切换到新分支
git checkout -b main
```

### Q: 部署失败怎么办？

1. 检查 GitHub Actions 日志
2. 确保代码已正确提交
3. 检查 GitHub Pages 设置
4. 查看 [DEPLOY.md](./DEPLOY.md) 获取详细故障排除指南

### Q: 如何配置环境变量？

1. 进入仓库的 `Settings` -> `Secrets and variables` -> `Actions`
2. 点击 `New repository secret`
3. 添加环境变量（如 `VITE_APP_ID`）
4. 在 `.github/workflows/deploy.yml` 中取消注释环境变量配置

## 需要更多帮助？

- 查看 [DEPLOY.md](./DEPLOY.md) 获取详细部署指南
- 查看 [README.md](./README.md) 获取项目说明
- 查看 GitHub Actions 日志了解具体错误

