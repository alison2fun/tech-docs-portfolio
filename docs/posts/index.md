# 思考与经验 / Reflections & Experience

这个栏目不再作为“练习清单”，而是用来解释我做技术文档时的判断依据：为什么这样组织内容，为什么选择这套工具链，以及如何把求职作品集做成一个可维护的文档产品。

## 为什么选择 Docs-as-Code

我选择 Markdown、MkDocs、GitHub Actions、Vale 和 Mermaid，不是为了堆工具名，而是因为它们对应了技术文档工作中的几个真实问题：

* **结构可维护**：Markdown 适合把标题、表格、代码块和提示块保持在同一套文本结构里；
* **发布可重复**：MkDocs Material 能把文档站点、导航和搜索统一起来，避免作品散落在多个页面；
* **质量可检查**：Vale 可以把“中英文空格、术语一致性、语气和格式”从人工提醒变成可重复检查；
* **流程可追踪**：GitHub Actions 把检查和发布接入提交流程，让文档变更留下记录；
* **图表可迭代**：Mermaid 让流程图和时序图保持在代码里，后续更新成本比截图更低。

## 为什么作品集也需要信息架构

作品集不是把页面堆上去。招聘方进入网站时，真正要判断的是：

* 候选人能不能理解复杂技术资料；
* 能不能把资料拆成读者能使用的结构；
* 能不能输出可维护、可复用、可交付的文档；
* 能不能解释自己的取舍和工作方法。

因此，我把网站拆成三类入口：`作品` 负责展示交付物，`案例` 负责记录过程，`思考与经验` 负责解释方法论。这样做可以避免所有内容都挤在简历里，也能让面试官按时间成本选择阅读路径。

## 我如何判断一篇文档是否有效

我会优先检查四件事：

1. **读者是否明确**：页面是写给开发者、维护者、用户，还是面试官；
2. **任务是否清楚**：读者看完后要完成什么动作或理解什么概念；
3. **证据是否可见**：有没有表格、代码、流程图、截图或示例支撑判断；
4. **下一步是否明确**：读者看完后是否知道继续去哪里。

这也是这次 v2.0.0 优化的重点：减少泛泛而谈，增加 Context、缩略图、PDF 简历和底部导航，让每个页面更像一个可交付的文档节点。

## 已发布文章

<div class="listing-grid">

    <article class="listing-card listing-card-featured">
        <div class="listing-kicker">信息架构 · 2026-07</div>
        <h2>技术文档作品集为什么需要信息架构</h2>
        <p><strong>核心问题：</strong>作品集不能只堆页面，而要先设计入口、阅读路径和证据链。</p>
        <p><strong>文章重点：</strong>把作品集当成一份技术文档来处理，用“5 分钟标准”验证招聘方是否能快速获得岗位、能力、作品和下一步路径。</p>
        <div class="listing-tags">
            <span>信息架构</span>
            <span>求职作品集</span>
            <span>文档产品</span>
        </div>
        <a href="portfolio-information-architecture/" class="action-link">阅读全文 &rarr;</a>
    </article>

</div>

## 计划补充的具体文章

下面这些文章会优先围绕“技术文档如何被判断有效”来写。它们不是练习题，而是后续可以继续扩展成独立文章的主题，每篇都对应一个真实写作判断。

<div class="listing-grid">

    <article class="listing-card">
        <div class="listing-kicker">任务型文档</div>
        <h2>如何写一篇让读者真正跑通的 Quick Start</h2>
        <p><strong>核心问题：</strong>Quick Start 的目标不是“介绍功能”，而是让读者完成第一次成功操作。</p>
        <p><strong>会写什么：</strong>用前置条件、最短路径、预期结果、错误处理和下一步链接来拆解任务型文档。</p>
        <div class="listing-tags">
            <span>Quick Start</span>
            <span>读者路径</span>
            <span>验证结果</span>
        </div>
    </article>

    <article class="listing-card">
        <div class="listing-kicker">AI 写作</div>
        <h2>AI 辅助技术文档的边界在哪里</h2>
        <p><strong>核心问题：</strong>AI 可以提高起稿速度，但不能替代技术理解、读者判断和结果验证。</p>
        <p><strong>会写什么：</strong>区分 AI 适合做的结构整理、术语一致性检查，以及仍必须由作者负责的技术判断。</p>
        <div class="listing-tags">
            <span>AI 辅助</span>
            <span>Docs-as-Code</span>
            <span>工作流</span>
        </div>
    </article>

    <article class="listing-card">
        <div class="listing-kicker">硬件资料</div>
        <h2>从硬件 PDF 到开发者文档：我会如何重构数据手册</h2>
        <p><strong>核心问题：</strong>硬件数据手册信息密度高，但开发者真正需要的是可查找、可复用、可验证的实现路径。</p>
        <p><strong>会写什么：</strong>以 SPI 时序、寄存器表和 C 初始化示例为线索，说明如何把静态资料改写成任务型 Web 文档。</p>
        <div class="listing-tags">
            <span>硬件文档</span>
            <span>Datasheet</span>
            <span>寄存器表</span>
        </div>
    </article>

    <article class="listing-card">
        <div class="listing-kicker">API 文档</div>
        <h2>API 文档不是字段表：如何写清楚接入路径</h2>
        <p><strong>核心问题：</strong>只列 Endpoint 和字段，无法帮助开发者完成一次真实接入。</p>
        <p><strong>会写什么：</strong>从认证、请求、响应、错误码、curl 示例和排错建议六个部分，整理一篇可执行的 API 接入指南。</p>
        <div class="listing-tags">
            <span>API Docs</span>
            <span>接入指南</span>
            <span>错误处理</span>
        </div>
    </article>

</div>

<div class="bottom-pager">
    <a href="../" class="pager-link">返回首页</a>
    <a href="../portfolio/" class="pager-link pager-link-primary">下一篇：文档作品</a>
</div>
