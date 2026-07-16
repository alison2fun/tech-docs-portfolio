---
hide:
  - navigation
---

# 关于我

我在整理这份作品集时，反复遇到一个很现实的问题：招聘方不认识我，也没有义务替我从几十个页面里拼出答案。

所以这页只回答三件事：我在找什么岗位，我处理过哪些类型的资料，以及你可以从哪里开始看。

我是梁卓雯 / Zhuowen Liang，正在求职技术文档工程师、资料开发工程师和开发者文档相关岗位。我的专业背景是电子信息。硕士阶段，我阅读并分析过 120+ 篇英文论文；在硬件工程实习中，我接触过驱动 IC 规格书、竞品参数和测试数据。后来做内容创作和课程资料整理时，我逐渐形成了一套稳定的工作顺序：先弄清读者要解决什么问题，再拆结构、查资料、写初稿、改表达，最后检查交付是否完整。

现在，这些经历都收束到了技术文档方向。下面的页面记录了我怎样处理硬件规格书、API 接口、产品流程和英文技术资料，也保留了我在组织信息和安排阅读路径时做过的取舍。

## 我目前重点展示的能力

<div class="grid cards evidence-map" markdown>

- **Docs-as-Code 与文档工程化**

    我用 Markdown、Vale、GitHub Actions 和 MkDocs 维护这个公开作品集，并整理了完整的[文档质量自动化流水线](01-automation.md)和[快速开始](install.md)。

- **开发者与 API 文档**

    [IoT 接口集成指南](03-api.md)覆盖认证流程、Endpoint、请求参数、响应字段、错误码、`curl` 示例和调试建议。

- **硬件资料重构**

    [硬件数据手册重构](02-hardware.md)把 SPI 时序、寄存器字段和 C 初始化代码整理成更方便开发者查找和复用的 Web 文档。

- **产品文档与用户路径**

    [小程序产品文档集](mini-programs.md)包含用户手册、PRD、API 参考、版本日志和截图型帮助文档。

</div>

## 如果你只有 5 分钟

五分钟不长，足够看清一条完整路径。我建议按这个顺序打开：

1. [文档质量自动化流水线](01-automation.md)：看我如何组织文档写作、检查、发布和维护；
2. [快速开始](install.md)：看任务型文档能否让读者完成第一次操作；
3. [IoT 接口集成指南](03-api.md)：看开发者文档结构和可复用示例；
4. [硬件数据手册重构](02-hardware.md)：看复杂资料提取与重组；
5. [作品集改版复盘](case-studies/portfolio-redesign.md)：看我如何发现信息架构问题并验证调整结果。

如果你需要先核对教育、经历和工具，可以直接看[在线简历](简历.md)。按文档类型查看样稿，可以进入[写作样稿](writing-samples/index.md)。

## 我做一项文档任务的顺序

我通常先确认读者是谁，以及读者要完成什么任务。然后把原始资料拆成概念、步骤、参数、示例、错误处理和下一步，用表格、代码块、流程图或截图承载最适合结构化的信息。

我比较在意两个细节：读者做完一步以后应该看到什么，以及读者看完这一页以后应该去哪里。很多文档已经包含足够多的信息，阅读体验仍会卡在完成标准和下一步不够清楚。

工具在这个过程中承担具体工作：Markdown 保持结构可维护，MkDocs Material 统一导航与搜索，Vale 检查术语和格式，GitHub Actions 记录检查与发布过程，Mermaid 让流程图可以跟随文档一起修改。

## 中英文技术资料

这个作品集目前以中文为主，服务国内技术文档和资料开发岗位。我的英文能力有两类现有证据：CET-6 612，以及硕士阶段对 120+ 篇英文论文的阅读和分析经历。

英文 Quick Start 和英文项目概览仍在计划中，因此暂时不把它们列为已完成样稿。

## 简历概览

<div class="resume-overview">
    <div class="resume-overview-grid">
        <div class="resume-overview-item">
            <strong>目标岗位</strong>
            <span>技术文档工程师 / 资料开发工程师 / 开发者文档</span>
        </div>
        <div class="resume-overview-item">
            <strong>专业背景</strong>
            <span>电子信息硕士 / 硬件资料阅读 / 英文技术资料分析</span>
        </div>
        <div class="resume-overview-item">
            <strong>核心工具</strong>
            <span>Markdown、MkDocs、GitHub Actions、Vale、Mermaid</span>
        </div>
    </div>
    <div class="action-link-group">
        <a href="../简历/" class="action-link action-link-primary">查看在线简历 &rarr;</a>
        <a href="../assets/resume-zhuowen-liang.pdf" class="action-link" download="梁卓雯-技术文档工程师-深圳.pdf" type="application/pdf" target="_blank" rel="noopener" data-download-pdf data-md-ignore>下载 PDF 简历 &rarr;</a>
        <a href="../site-changelog/" class="action-link">查看 Changelog &rarr;</a>
    </div>
</div>

<div class="bottom-pager">
    <a href="../" class="pager-link">返回首页</a>
    <a href="../portfolio/" class="pager-link pager-link-primary">下一篇：文档作品</a>
</div>
