---
hide:
  - navigation
  - toc
---
<!-- 隐藏默认的页面标题 -->
<style>.md-typeset h1 { display: none; }</style>

<div class="home-portal">

    <img src="assets/profile-photo.png" alt="梁卓雯头像" class="identity-photo">

    <h1 class="home-title"><span>梁卓雯</span><span>Zhuowen Liang</span></h1>

    <p class="home-tagline"><span>技术文档工程师</span><span>资料开发工程师</span><span>开发者文档方向</span></p>

    <p class="home-summary">电子信息硕士，正在转向技术文档与资料开发。这里放的是我动手整理过的硬件开发者文档、产品文档集、Docs-as-Code 项目和英文技术文档。</p>

    <div class="home-meta" aria-label="核心证据与联系方式">
        <a href="core-projects/hardware/">硬件资料重构</a>
        <a href="mini-programs/">产品文档集</a>
        <a href="01-automation/">Docs-as-Code</a>
        <a href="core-projects/english-documentation/">English Documentation</a>
        <a href="mailto:lzwof@foxmail.com">lzwof@foxmail.com</a>
    </div>

    <nav class="home-actions" aria-label="作品集主要入口">
        <a href="portfolio/" class="home-action home-action-primary">查看核心作品</a>
        <a href="assets/resume-zhuowen-liang.pdf" class="home-action" download="梁卓雯-技术文档工程师-深圳.pdf" type="application/pdf" target="_blank" rel="noopener" data-download-pdf data-md-ignore>下载简历</a>
    </nav>

    <p class="home-secondary-links"><a href="case-studies/">案例复盘</a> · <a href="posts/">写作与方法</a> · <a href="about/">关于</a></p>

    <p class="home-tech-stack"><span>Powered by MkDocs Material</span><span>GitHub Actions</span><span>Vale</span><span>Mermaid.js</span><a href="site-changelog/">v2.2.0</a></p>

</div>

## 四个核心项目

<div class="grid cards evidence-map" markdown>

- **01 技术理解｜OPT4001YMNEVM 开发者文档**

    基于 TI OPT4001 Datasheet 和 EVM User's Guide，将分散的板卡结构、首次采集、I²C、结果寄存器和故障信息，重组为一套面向开发者的 Web 文档。

    <span class="doc-badge">Hardware Documentation</span>
    <span class="doc-badge">Quick Start</span>
    <span class="doc-badge">I²C</span>
    <span class="doc-badge">Troubleshooting</span>

    [进入项目](core-projects/hardware/index.md)

- **02 用户路径｜小程序产品文档集**

    围绕微步 ACTION 原型，组织用户指南、PRD、系统流程、云函数调用和数据隐私说明。

    <span class="doc-badge">Product Documentation</span>
    <span class="doc-badge">User Guide</span>
    <span class="doc-badge">PRD</span>
    <span class="doc-badge">WeChat Mini Program</span>

    [进入项目](mini-programs.md)

- **03 文档工程｜文档质量自动化流水线**

    用 Vale、MkDocs 和 GitHub Actions 把检查、构建、验证和发布接进同一条 Docs-as-Code 流程。

    <span class="doc-badge">Docs-as-Code</span>
    <span class="doc-badge">Vale</span>
    <span class="doc-badge">MkDocs</span>
    <span class="doc-badge">GitHub Actions</span>

    [进入项目](01-automation.md)

- **04 English Documentation｜Documentation Quality Pipeline**

    A task-based English documentation project for running Vale locally, configuring repository rules, and automating documentation checks with GitHub Actions.

    <span class="doc-badge">English Technical Writing</span>
    <span class="doc-badge">Docs-as-Code</span>
    <span class="doc-badge">Vale</span>
    <span class="doc-badge">GitHub Actions</span>

    [View project](core-projects/english-documentation/index.md)

</div>

## 按岗位选择阅读路径

- **技术文档 / 资料开发**：从[OPT4001YMNEVM 开发者文档](core-projects/hardware/index.md)开始；
- **用户帮助 / 产品文档**：从[小程序产品文档集](mini-programs.md)开始；
- **Docs-as-Code / 文档工程**：从[文档质量自动化流水线](01-automation.md)开始。
- **English technical writing / Docs-as-Code**: Start with [Documentation Quality Pipeline](core-projects/english-documentation/index.md).

## 最近案例与文章

- [从局部检查到验证后发布](posts/docs-ci-publishing-gate.md)
- [从官方资料到开发者文档集](posts/hardware-datasheet-restructure.md)
- [如何写一篇让读者真正跑通的 Quick Start](posts/quick-start-reader-success.md)

## 简历与联系

查看[在线简历](简历.md)，或发送邮件至 [lzwof@foxmail.com](mailto:lzwof@foxmail.com)。
