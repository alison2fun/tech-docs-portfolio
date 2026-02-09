# Tech Docs Portfolio: Automated Quality Assurance

## 📖 项目简介 (Project Overview)
这是一个基于 **Docs-as-Code (文档即代码)** 理念构建的技术文档自动化质量检查系统。
本项目旨在展示如何通过 **Vale** 和 **GitHub Actions**，将文档的语法检查、风格规范（Style Guide）和持续集成（CI/CD）流程化，确保技术文档的一致性与专业性。

## 🛠️ 技术栈 (Tech Stack)
* **Linter**: [Vale](https://vale.sh/) (命令行版 CLI)
* **CI/CD**: GitHub Actions (自动化流水线)
* **Version Control**: Git
* **Editor**: VS Code

## ✨ 核心功能 (Key Features)
1.  **自动化纠错**：配置了本地 Vale 环境，支持实时检测文档中的格式错误（如中英文空格、标点误用）。
2.  **自定义规则 (Custom Rules)**：编写了正则表达式规则 (`.yml`)，解决了中文技术文档特有的排版痛点。
3.  **大厂规范集成**：集成了 Microsoft 和 Google 的官方风格指南，对齐行业标准。
4.  **云端守门员**：通过 GitHub Actions 配置了 CI 流水线，任何不合规的文档提交都会被自动拦截。

## 🚀 如何运行 (How to Run)

### 1. 本地检查
确保已安装 Vale，在终端运行：
```bash

vale .
```

### 2. 自动化测试
提交代码到 GitHub 后，点击仓库的 Actions 标签页，即可查看自动化检查报告。

### 3. 目录结构 (Structure)
```text
.
├── .github/workflows/  # CI/CD 配置文件
├── styles/             # Vale 规则库 (包含自定义规则与大厂规范)
├── .vale.ini           # Vale 核心配置文件
└── test.md             # 测试文档
```
### 4.  保存 (`Ctrl + S`)。

---
