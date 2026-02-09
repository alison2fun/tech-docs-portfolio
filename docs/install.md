# 快速开始 (Quick Start)

本指南将帮助你在 5 分钟内搭建本地自动化检查环境。

## ✅ 前置条件 (Prerequisites)
* **操作系统**：Windows / macOS / Linux
* **核心工具**：
    * [VS Code](https://code.visualstudio.com/)
    * [Git](https://git-scm.com/)

## 🚀 安装步骤

### 第一步：安装 Vale 客户端
推荐使用包管理器安装：

- **"Windows (Winget)"**
   ```powershell
    winget install Vale.Vale
    ```

    

- **"macOS (Homebrew)"**
    ```bash
    brew install vale
    ```

### 第二步：安装 VS Code 插件
1. 打开 VS Code。
2. 点击左侧扩展图标 (Extensions)。
3. 搜索 **"Vale"** 并安装官方插件。

### 第三步：验证安装
打开终端，输入以下命令检查版本：
```bash
vale -v
```
输出示例: 
`vale version 3.0.7`