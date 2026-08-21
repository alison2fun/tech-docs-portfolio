---
hide:
  - toc
---

# 写作样稿

<div class="sample-entry-page">
  <p class="sample-entry-intro">这里整理了为硬件设备、开发者工具和小程序编写的技术文档样稿。内容涵盖快速开始、开发者指南、接口文档、故障排查和项目复盘，记录了我怎样理解陌生技术、整理分散信息，并把它们写成读者可以执行的内容。</p>
  <p class="sample-entry-intro">如果你第一次来到这里，建议先看下面三篇。它们分别展示我在硬件任务设计、接口文档和英文文档工程方面的能力；其余样稿可以继续按任务查找。</p>

  <section class="sample-entry-section" aria-labelledby="featured-samples">
    <h2 id="featured-samples">如果只看三篇</h2>
    <div class="sample-feature-list">
      <article class="sample-feature-item">
        <h3><a href="../02-hardware/">采集第一组环境光数据</a></h3>
        <p>从主板识别走到 lux 数据读取，展示硬件 Quick Start 的任务设计。</p>
      </article>
      <article class="sample-feature-item">
        <h3><a href="../03-api/usage-guide/">获取设备最新光照数据</a></h3>
        <p>展示准备信息、发送请求、检查结果和处理错误的完整调用路径。</p>
      </article>
      <article class="sample-feature-item">
        <h3><a href="../core-projects/english-documentation/github-rest-api/quickstart/">Get repository details with the GitHub REST API</a></h3>
        <p>英文 Quickstart，展示命令、平台差异、可观察结果和验证边界怎样组成一次完整请求。</p>
      </article>
    </div>
  </section>

  <section class="sample-entry-section" aria-labelledby="task-entries">
    <h2 id="task-entries">按任务查看</h2>
    <nav class="sample-task-nav" aria-label="按读者任务查找样稿">
      <details class="sample-task-group">
        <summary>
          <span class="sample-task-summary">
            <strong>完成一次操作</strong>
            <span>安装、首次采集和故障恢复</span>
          </span>
        </summary>
        <ol class="sample-task-items">
          <li><a href="../02-hardware/">采集第一组环境光数据</a></li>
          <li><a href="../mini-programs/action/user-guide/quick-start/">微步 ACTION 原型快速体验</a></li>
          <li><a href="../install/">搭建本地文档质量检查环境</a></li>
          <li><a href="../core-projects/english-documentation/quick-start/">Set up local documentation checks with Vale</a></li>
          <li><a href="../04-openclaw-quickstart/">OpenClaw 快速安装</a></li>
        </ol>
      </details>

      <details class="sample-task-group">
        <summary>
          <span class="sample-task-summary">
            <strong>维护与发布</strong>
            <span>写作规范、自动检查和版本更新</span>
          </span>
        </summary>
        <ol class="sample-task-items">
          <li><a href="../01-automation/">文档质量检查自动化流水线</a></li>
          <li><a href="../style-guide/">技术文档写作风格指南</a></li>
          <li><a href="../github-actions-workflow/">GitHub Actions 文档检查流程</a></li>
          <li><a href="../core-projects/docs-engineering/validation-results/">文档质量检查验证结果</a></li>
          <li><a href="../troubleshooting/">文档质量流水线故障排查</a></li>
          <li><a href="../changelog/">文档项目更新记录</a></li>
          <li><a href="../core-projects/english-documentation/documentation-quality-pipeline/">Documentation Quality Pipeline</a></li>
          <li><a href="../core-projects/english-documentation/configure-vale/">Configure Vale for a documentation repository</a></li>
          <li><a href="../core-projects/english-documentation/github-actions/">Run Vale in GitHub Actions</a></li>
          <li><a href="../core-projects/english-documentation/troubleshooting/">Troubleshoot Vale and CI checks</a></li>
        </ol>
      </details>

      <details class="sample-task-group">
        <summary>
          <span class="sample-task-summary">
            <strong>集成与调用</strong>
            <span>硬件配置、接口请求和返回结果</span>
          </span>
        </summary>
        <ol class="sample-task-items">
          <li><a href="../core-projects/hardware/">OPT4001YMNEVM 开发者文档重构</a></li>
          <li><a href="../core-projects/hardware/information-architecture/">评估系统与光学硬件结构</a></li>
          <li><a href="../core-projects/hardware/configure-and-read-lux/">配置与数据读取</a></li>
          <li><a href="../core-projects/hardware/troubleshooting/">OPT4001YMNEVM 故障排查</a></li>
          <li><a href="../03-api/">光照测量 API 文档案例</a></li>
          <li><a href="../03-api/usage-guide/">获取设备最新光照数据</a></li>
          <li><a href="../03-api/api-reference/">光照测量 API Reference</a></li>
          <li><a href="../mini-programs/action/product/task-decomposition-interface-draft/">微步 ACTION 任务拆解云函数调用说明</a></li>
        </ol>
      </details>

      <details class="sample-task-group">
        <summary>
          <span class="sample-task-summary">
            <strong>使用与协作</strong>
            <span>产品概览、用户任务、隐私和交付材料</span>
          </span>
        </summary>
        <ol class="sample-task-items">
          <li><a href="../mini-programs/">三个小程序产品总览</a></li>
          <li><a href="../mini-programs/action/">微步 ACTION 产品概览</a></li>
          <li><a href="../mini-programs/action/user-guide/create-task/">创建与拆解任务</a></li>
          <li><a href="../mini-programs/action/user-guide/manage-progress/">管理任务与进度</a></li>
          <li><a href="../mini-programs/action/user-guide/faq/">微步 ACTION 常见问题</a></li>
          <li><a href="../mini-programs/action/user-guide/privacy/">输入内容安全提醒</a></li>
          <li><a href="../mini-programs/action/product/prd/">微步 ACTION 产品需求文档</a></li>
          <li><a href="../mini-programs/action/product/system-flow-design/">微步 ACTION 系统流程设计</a></li>
          <li><a href="../mini-programs/action/product/data-privacy-boundaries/">微步 ACTION 数据与隐私边界</a></li>
          <li><a href="../mini-programs/action/releases/prototype-iteration-record/">微步 ACTION 原型迭代记录</a></li>
          <li><a href="../mini-programs/action/releases/roadmap/">微步 ACTION 产品路线图</a></li>
          <li><a href="../dot-collage/">PopDots 波点拼贴帮助</a></li>
          <li><a href="../photo-background/">照片换底色小程序帮助</a></li>
        </ol>
      </details>
    </nav>
  </section>

  <p class="sample-all-link"><a href="all/">查看全部样稿</a></p>
</div>
