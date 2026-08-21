---
hide:
  - navigation
  - toc
---

# 复盘与方法

## 项目复盘

<div class="review-project-list" markdown>

<section class="review-project-item" markdown>

### 从局部检查到验证后发布

Vale 原来只检查一个演示文件，部署也不会等待文档验证。复盘记录怎样把真实文档纳入检查范围，并让发布依赖 Vale 与 MkDocs 的验证结果。

[查看项目复盘](../posts/docs-ci-publishing-gate.md) · [查看最终文档](../01-automation.md)

</section>

<section class="review-project-item" markdown>

### GitHub 英文文档写作复盘

这篇文章从 GitHub、Stripe、Cloudflare、TiDB 和 Microsoft 的文档中整理任务型标题、动作句、验证方式、页面骨架和排错语言，作为以后写英文技术文档时使用的工具箱。

[查看项目复盘](../posts/github-rest-api-english-docs-retrospective.md) · [查看英文文档](../core-projects/english-documentation/index.md)

</section>

<section class="review-project-item" markdown>

### 从官方资料到开发者文档集

这个项目没有实物。我根据共 89 页的 OPT4001 Datasheet 与 EVM User's Guide 核对器件、板卡、GUI 和故障信息，再按首次采集、系统结构、数据读取和排查顺序重组。

[查看项目复盘](../posts/hardware-datasheet-restructure.md) · [查看最终文档](../core-projects/hardware/index.md)

</section>

<section class="review-project-item" markdown>

### 光照测量 API 文档案例

原页面把第一次调用、接口定义和错误处理放在一篇长文里。重写后拆成项目概览、使用指南与 API Reference，并统一 Endpoint、字段、错误码和示例数据。

[查看项目复盘](../03-api/index.md) · [查看最终文档](../03-api/usage-guide.md)

</section>

<section class="review-project-item" markdown>

### 从页面堆叠到文档系统

网站原来把首页、最终作品、项目过程和方法文章放在相近层级。改版重新安排顶部导航和页面分工，保留原有文章 URL，并检查链接、构建与响应式表现。

[查看项目复盘](portfolio-redesign.md) · [查看最终文档](../portfolio.md)

</section>

<section class="review-project-item review-project-item-pending" markdown>

### 从一页说明书到产品文档集 <span class="review-status">整理中</span>

旧版页面同时承担产品介绍、快速开始、日常操作和常见问题。当前内容已经拆成用户指南、产品设计、迭代与计划，完整的原页面问题和前后对比仍待补写。

[查看当前内容](mini-program-doc-set.md)

</section>

</div>

## 写作方法

### 从项目中总结的方法

<ul class="method-index-list">
  <li><a href="../posts/ai-assisted-docs-boundaries/">怎样与 AI 协作写技术文档</a><p>从 GitHub REST API 英文样稿的修改出发，记录 AI 照搬参考结构、写出含糊检查指令和忽略 PowerShell 续行差异以后，作者怎样重新划分页面职责并完成实际验证。</p></li>
  <li><a href="../posts/quick-start-reader-success/">怎样写一篇可执行的 Quickstart</a><p>结合 GitHub REST API 样稿和 Stripe、Cloudflare 的官方页面，整理主任务、最小成功结果、可观察输出和短排错的安排方法。</p></li>
  <li><a href="../posts/troubleshooting-diagnostic-writing/">怎样写一篇能完成诊断的 Troubleshooting</a><p>结合 GitHub 与 Docker 的排错文档，说明怎样从错误文本进入，再把关键检查的不同结果接到对应动作。</p></li>
  <li><a href="../posts/api-onboarding-path/">API 文档如何写清楚接入路径</a><p>结合光照测量 API 案例，说明怎样把 Base URL、Token、Endpoint、响应和错误码连成一次可执行的调用。</p></li>
  <li><a href="../posts/documentation-as-qa/">为什么写文档会提前暴露产品问题</a><p>用微步 ACTION 的数据边界和光照测量 API 的两种 404 结果，说明写文档时暴露出的产品与接口缺口。</p></li>
  <li><a href="../posts/preventing-stale-docs/">文档为什么会过期：我如何给内容留下维护线索</a><p>从当前作品集的构建、链接检查和更新记录出发，整理来源、版本和变更影响的维护线索。</p></li>
  <li><a href="../posts/maintainable-screenshots/">截图型文档怎样避免迅速过期</a><p>结合微步 ACTION、PopDots 和照片换底色文档，说明截图选择、文件命名和移动端检查。</p></li>
  <li><a href="../posts/multiple-reader-paths/">同一份技术资料，为什么需要不同阅读路径</a><p>以作品集的不同读者为例，说明怎样让事实集中存放，再按读者任务组织入口与页面。</p></li>
  <li><a href="../posts/choosing-docs-tools/">选择文档工具前，我会先问哪几个问题</a><p>记录当前作品集选择 Vale、MkDocs 和 GitHub Actions 时考虑的读者任务、评审和维护条件。</p></li>
</ul>

### 优秀文档拆解

<ul class="method-index-list">
  <li><a href="github-rest-api-troubleshooting-breakdown/">GitHub REST API 故障排查：用错误文字组织检索入口</a><p>观察页面怎样用状态码和错误消息组织入口，再按认证方式、请求地址和 HTTP 方法逐层缩小原因。</p></li>
  <li><a href="stripe-checkout-quickstart/">Stripe Checkout Quickstart：把第一次付款串成一条路径</a><p>整理从安装 SDK、创建 Checkout Session 到测试付款的主路径，以及新概念、安全提醒和扩展内容的出现位置。</p></li>
  <li><a href="cloudflare-workers-quick-start-breakdown/">Cloudflare Workers Quick Start：把说明和短排错放在步骤旁</a><p>观察动作、解释、代码、当前结果和短排错怎样在一个步骤中衔接。</p></li>
  <li><a href="docker-daemon-troubleshooting-breakdown/">Docker daemon 故障排查：从症状走到验证</a><p>整理从症状、原因和确认动作走到互斥修复方案与验证结果的排查顺序。</p></li>
</ul>

[查看全部优秀文档拆解](document-breakdowns.md)
