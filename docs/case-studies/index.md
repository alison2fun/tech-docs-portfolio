---
hide:
  - navigation
  - toc
---

# 案例复盘

有些文档，我会点进去找一个具体答案。也有些文档会让我多停留一会儿，看看它怎样安排入口、解释概念，又怎样把读者送到下一步。

这一页记录的是第二种阅读。第一篇回到我自己的作品集，看看几次改版到底改了什么。后面九篇来自公开可访问的优秀文档，我只讨论页面结构、读者任务和写作取舍，不把这些分析写成自己的项目经历。

## 我自己的改版过程

<div class="listing-grid">

    <article class="listing-card">
        <div class="listing-kicker">作品集改版</div>
        <h2><a href="portfolio-redesign/">我如何把零散页面整理成一个小型文档系统</a></h2>
        <p>复盘原首页信息过载、导航层级不清和项目入口分散等问题，以及我怎样重新安排入口、阅读路径和页面分工。</p>
        <div class="listing-tags">
            <span>信息架构</span>
            <span>阅读路径</span>
            <span>求职作品集</span>
        </div>
    </article>

</div>

## 优秀文档案例复盘

### 01 第一次成功路径

这组文档都在处理同一件事：读者刚接触一个产品时，怎样尽快做成第一件事，又不被陌生概念和环境配置拦住。

<div class="listing-grid">

    <article class="listing-card listing-card-featured">
        <div class="listing-kicker">GitHub Docs · Quick Start</div>
        <h2><a href="github-hello-world/">GitHub Hello World 如何带零基础读者走完一次 Pull Request</a></h2>
        <p>分析它怎样定义完成结果、按动作引入概念、使用截图定位控件，并在结尾确认成果与下一步。</p>
        <div class="listing-tags"><span>入门文档</span><span>渐进式披露</span><span>读者路径</span></div>
    </article>

    <article class="listing-card listing-card-featured">
        <div class="listing-kicker">Stripe Docs · API Onboarding</div>
        <h2><a href="stripe-checkout-quickstart/">Stripe Checkout Quickstart 如何压缩一条复杂集成路径</a></h2>
        <p>观察它怎样围绕可运行结果组织多语言示例，把安全提醒放在敏感操作旁，并用测试数据验证成功与失败。</p>
        <div class="listing-tags"><span>API 文档</span><span>代码示例</span><span>测试路径</span></div>
    </article>

    <article class="listing-card listing-card-featured">
        <div class="listing-kicker">ESP-IDF · Hardware Onboarding</div>
        <h2><a href="esp-idf-get-started/">ESP-IDF 快速入门如何处理硬件、工具链与多操作系统</a></h2>
        <p>分析版本提示、硬件与软件前置条件、流程概览，以及按操作系统、IDE 和命令行拆分路径的方式。</p>
        <div class="listing-tags"><span>硬件文档</span><span>版本管理</span><span>环境分支</span></div>
    </article>

</div>

### 02 学习路径与概念解释

教程不能只把知识点排成目录。读者需要练习、反馈和阶段目标，也需要知道自己什么时候该从教程转向更完整的参考资料。

<div class="listing-grid">

    <article class="listing-card">
        <div class="listing-kicker">Vue.js · Interactive Tutorial</div>
        <h2><a href="vuejs-interactive-tutorial/">Vue 互动教程如何让概念在操作中出现</a></h2>
        <p>从可编辑代码、即时预览、答案提示和两种 API 风格切换，观察一条学习路径怎样同时照顾初学者与有经验的开发者。</p>
        <div class="listing-tags"><span>互动教程</span><span>即时反馈</span><span>学习分支</span></div>
    </article>

    <article class="listing-card">
        <div class="listing-kicker">MDN · Learning Path</div>
        <h2><a href="mdn-first-website/">MDN「你的第一个网站」如何把一个大目标拆成五步</a></h2>
        <p>观察它怎样先划定前置条件，再把规划、HTML、CSS、JavaScript 和发布串成一条可以走完的学习路径。</p>
        <div class="listing-tags"><span>新手教程</span><span>任务拆分</span><span>完成标准</span></div>
    </article>

    <article class="listing-card">
        <div class="listing-kicker">Apple Developer · SwiftUI</div>
        <h2><a href="apple-swiftui-tutorials/">SwiftUI 教程如何用同一个应用承接四个学习阶段</a></h2>
        <p>分析章节时长、连续样例和资源分层，看看教程怎样让读者从视图组合逐步走到动画、复杂布局与框架集成。</p>
        <div class="listing-tags"><span>连续样例</span><span>章节节奏</span><span>资源分层</span></div>
    </article>

</div>

### 03 大型文档系统

当产品足够复杂，首页已经不可能解释所有内容。更重要的判断是：不同角色能不能找到入口，版本和内容类型能不能长期共存。

<div class="listing-grid">

    <article class="listing-card">
        <div class="listing-kicker">PingCAP · TiDB Docs</div>
        <h2><a href="tidb-docs-information-architecture/">TiDB 文档中心如何同时服务开发、部署与运维</a></h2>
        <p>分析它怎样用角色任务组织首页，用版本入口管理长期维护内容，并把教程、工具、故障诊断和参考资料放进同一套系统。</p>
        <div class="listing-tags"><span>中文技术文档</span><span>任务导航</span><span>版本体系</span></div>
    </article>

    <article class="listing-card">
        <div class="listing-kicker">Docker Docs · Workshop</div>
        <h2><a href="docker-workshop/">Docker Workshop 如何把概念说明接到可运行结果</a></h2>
        <p>观察 45 分钟工作坊怎样先建立容器与镜像的最低认知，再用连续任务把读者带到多容器应用和 Docker Compose。</p>
        <div class="listing-tags"><span>工作坊</span><span>连续任务</span><span>下一步链接</span></div>
    </article>

    <article class="listing-card">
        <div class="listing-kicker">Kubernetes Docs · Basics</div>
        <h2><a href="kubernetes-basics/">Kubernetes Basics 如何把系统概念放进六个操作模块</a></h2>
        <p>分析它怎样围绕部署、查看、公开、扩缩容和更新组织模块，让背景知识紧贴当前任务，也给后续学习留下入口。</p>
        <div class="listing-tags"><span>模块化教程</span><span>操作链路</span><span>开源文档</span></div>
    </article>

</div>

## 推荐继续阅读

如果你想看我已经完成的文档，可以进入 [作品总览](../portfolio.md)。如果你想看我怎样总结自己的写作判断，可以进入 [思考与经验](../posts/index.md)。

<div class="bottom-pager">
    <a href="../portfolio/" class="pager-link">返回作品总览</a>
    <a href="github-hello-world/" class="pager-link pager-link-primary">下一篇：GitHub Hello World</a>
</div>
