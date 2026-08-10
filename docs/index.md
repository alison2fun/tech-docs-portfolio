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

    <p class="home-summary">电子信息硕士，目前在找技术文档和资料开发相关工作。我把散落在规格书、产品流程和代码仓库里的信息，整理成读者能照着做、也能继续核对的文档。下面四个项目能看到我怎样查资料、安排阅读顺序和写步骤。</p>

    <div class="home-meta" aria-label="核心证据与联系方式">
        <a href="core-projects/hardware/">硬件开发者文档</a>
        <a href="mini-programs/">小程序产品文档</a>
        <a href="01-automation/">文档工程</a>
        <a href="core-projects/english-documentation/">English docs</a>
        <a href="mailto:lzwof@foxmail.com">lzwof@foxmail.com</a>
    </div>

    <nav class="home-actions" aria-label="作品集主要入口">
        <a href="portfolio/" class="home-action home-action-primary">查看核心作品</a>
        <a href="assets/resume-zhuowen-liang.pdf" class="home-action" download="梁卓雯-技术文档工程师-深圳.pdf" type="application/pdf" target="_blank" rel="noopener" data-download-pdf data-md-ignore>下载简历</a>
    </nav>

    <p class="home-secondary-links"><a href="case-studies/">案例复盘</a> · <a href="posts/">写作与方法</a> · <a href="about/">关于</a></p>

    <p class="home-tech-stack"><span>Powered by MkDocs Material</span><span>GitHub Actions</span><span>Vale</span><span>Mermaid.js</span><a href="site-changelog/">v2.3.0</a></p>

</div>

## 四个核心项目

<div class="grid cards evidence-map" markdown>

- **01 技术理解｜OPT4001YMNEVM 开发者文档**

    从 89 页 TI 官方资料里找出首次采集、系统结构、I²C 读取和故障排查需要的信息，再按开发者实际要完成的事重组为四篇 Web 文档。

    <span class="doc-badge">Hardware Documentation</span>
    <span class="doc-badge">Quick Start</span>
    <span class="doc-badge">I²C</span>

    [进入项目](core-projects/hardware/index.md)

- **02 用户路径｜小程序产品文档集**

    三个微信小程序在没有宣传的情况下积累了 300+ 用户。以微步 ACTION 为主案例，补充用户指南、PRD、系统流程、云函数调用和隐私说明。

    <span class="doc-badge">Product Documentation</span>
    <span class="doc-badge">User Guide</span>
    <span class="doc-badge">PRD</span>

    [进入项目](mini-programs.md)

- **03 文档工程｜文档质量自动化流水线**

    Vale、MkDocs 和 GitHub Actions 接入同一条发布路径。内容提交以后，仓库自动检查写作规则和构建结果，全部通过后再继续部署。

    <span class="doc-badge">Docs-as-Code</span>
    <span class="doc-badge">Vale</span>
    <span class="doc-badge">GitHub Actions</span>

    [进入项目](01-automation.md)

- **04 English Documentation｜Documentation Quality Pipeline**

    This five-page English documentation set explains how to run Vale locally, configure repository rules, add the check to GitHub Actions, and troubleshoot failures.

    <span class="doc-badge">English Technical Writing</span>
    <span class="doc-badge">Task-based Docs</span>
    <span class="doc-badge">Vale</span>

    [View project](core-projects/english-documentation/index.md)

</div>

## 你可以从哪里开始

- **想看我怎样读硬件资料**，从 [OPT4001YMNEVM 开发者文档](core-projects/hardware/index.md)开始
- **想看我怎样围绕用户任务写文档**，从[小程序产品文档集](mini-programs.md)开始
- **想看文档怎样进入检查和发布流程**，从[文档质量自动化流水线](01-automation.md)开始
- **想看英文技术写作**，从 [Documentation Quality Pipeline](core-projects/english-documentation/index.md)开始

## 项目做完以后

核心作品保留最终交付，下面三篇记录我怎样发现问题、改变原来的做法，再回头核对结果。

- [从局部检查到验证后发布](posts/docs-ci-publishing-gate.md)
- [从官方资料到开发者文档集](posts/hardware-datasheet-restructure.md)
- [如何写一篇让读者真正跑通的 Quick Start](posts/quick-start-reader-success.md)

## 如果你想继续了解我

你可以查看[在线简历](简历.md)，也可以写信到 [lzwof@foxmail.com](mailto:lzwof@foxmail.com)。
