---
hide:
  - navigation
  - toc
---

# 作品总览

这页优先展示四个核心项目。它们分别对应四条求职证据链：读懂复杂技术资料、围绕用户任务设计文档、让文档可以持续检查和发布，以及使用英文组织完整的技术文档项目。模拟项目和个人产品会继续明确标注。

## 四个核心项目

<div class="warm-portal">

    <div class="bento-grid portfolio-grid">

        <div class="solid-card card-wide">
            <div class="portfolio-card-layout">
                <img src="../assets/thumb-hardware-doc.svg" alt="OPT4001YMNEVM 开发者文档集缩略图" class="portfolio-thumb">
                <div>
                    <div class="card-header">
                        <span class="serif-num">01</span>
                        <span class="card-label">技术理解 · Hardware Docs</span>
                    </div>
                    <h3 class="card-title">OPT4001YMNEVM 开发者文档重构</h3>
                    <p class="card-desc">基于 TI OPT4001 Datasheet 和 EVM User's Guide，将分散的板卡结构、首次采集、I²C、结果寄存器和故障信息，重组为一套面向开发者的 Web 文档。</p>
                    <div class="portfolio-context">
                        <span><strong>解决的问题：</strong>两份官方资料按照不同逻辑组织，开发者需要来回查找板卡连接、操作步骤和器件配置。</span>
                        <span><strong>主要交付物：</strong>项目概览、Quick Start、评估系统说明、配置与数据读取、故障排查。</span>
                        <span><strong>能证明的能力：</strong>跨文档事实核对、硬件资料理解、图表与代码说明、开发者任务组织。</span>
                        <span><strong>项目边界：</strong>技术事实来自 TI 官方资料；尚未使用真实硬件完成独立验证。</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../core-projects/hardware/" class="action-link action-link-primary">进入项目 &rarr;</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="solid-card card-wide">
            <div class="portfolio-card-layout">
                <img src="../assets/thumb-mini-programs.png" alt="小程序产品文档集组合缩略图" class="portfolio-thumb">
                <div>
                    <div class="card-header">
                        <span class="serif-num">02</span>
                        <span class="card-label">用户路径 · Product Docs</span>
                    </div>
                    <h3 class="card-title">小程序产品文档集</h3>
                    <p class="card-desc">以微步 ACTION 为主案例，把一个个人小程序组织成面向用户、产品判断和技术维护的文档集。</p>
                    <div class="portfolio-context">
                        <span><strong>解决的问题：</strong>让用户知道怎样开始和推进任务，也让协作者找到产品范围、流程和数据边界。</span>
                        <span><strong>主要交付物：</strong>用户指南、PRD、系统流程、云函数调用说明、隐私边界和迭代记录。</span>
                        <span><strong>能证明的能力：</strong>读者区分、任务导向写作、产品信息架构、代码与文档核对。</span>
                        <span><strong>项目边界：</strong>微步 ACTION 为主案例，PopDots 和照片换底色为同组补充样本。</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../mini-programs/" class="action-link action-link-primary">进入项目 &rarr;</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="solid-card card-wide">
            <div class="portfolio-card-layout">
                <img src="../assets/thumb-docs-as-code.svg" alt="Docs-as-Code 工作流缩略图" class="portfolio-thumb">
                <div>
                    <div class="card-header">
                        <span class="serif-num">03</span>
                        <span class="card-label">文档工程 · Docs-as-Code</span>
                    </div>
                    <h3 class="card-title">文档质量自动化流水线</h3>
                    <p class="card-desc">用 Vale、MkDocs 和 GitHub Actions 把写作检查、严格构建、验证和发布接进同一条工作流。</p>
                    <div class="portfolio-context">
                        <span><strong>解决的问题：</strong>让真实文档进入检查范围，并让部署明确等待验证结果。</span>
                        <span><strong>主要交付物：</strong>项目概览、Quick Start、Style Guide、Workflow、验证结果、Troubleshooting 和 Changelog。</span>
                        <span><strong>能证明的能力：</strong>Docs-as-Code、CI/CD、质量门禁、故障排查和证据核对。</span>
                        <span><strong>项目性质：</strong>真实运行并持续维护的个人公开文档项目。</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../01-automation/" class="action-link action-link-primary">进入项目 &rarr;</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="solid-card card-wide">
            <div class="portfolio-card-layout">
                <img src="../assets/thumb-docs-as-code.svg" alt="Documentation Quality Pipeline workflow thumbnail" class="portfolio-thumb">
                <div>
                    <div class="card-header">
                        <span class="serif-num">04</span>
                        <span class="card-label">English Documentation · Docs-as-Code</span>
                    </div>
                    <h3 class="card-title">Documentation Quality Pipeline</h3>
                    <p class="card-desc">A task-based English documentation project for running Vale locally, configuring repository rules, and automating documentation checks with GitHub Actions.</p>
                    <p>
                        <span class="doc-badge">English Technical Writing</span>
                        <span class="doc-badge">Docs-as-Code</span>
                        <span class="doc-badge">Vale</span>
                        <span class="doc-badge">GitHub Actions</span>
                    </p>
                    <div class="portfolio-context">
                        <span><strong>Reader task:</strong> Run a local documentation check and understand how the repository repeats it in CI.</span>
                        <span><strong>Current deliverable:</strong> Project Overview, local Vale Quick Start, configuration guide, GitHub Actions guide, and troubleshooting guide.</span>
                        <span><strong>Evidence boundary:</strong> All five pages pass the current local Vale check and strict MkDocs build. The published Actions run predates these pages, and the controlled CI failure test remains pending.</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../core-projects/english-documentation/" class="action-link action-link-primary">View project &rarr;</a>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

## 更多样本

<div class="grid cards evidence-map" markdown>

- **IoT 接口集成指南**

    模拟一次 RESTful API 接入路径，覆盖认证、请求、响应、错误处理和调试建议。

    [查看样稿](03-api.md)

- **OpenClaw Quick Start**

    根据官方资料核验安装、首次配置、Gateway 和 Control UI 路径；未虚构本机端到端结果。

    [查看样稿](04-openclaw-quickstart.md)

</div>

想按文档任务查看单篇样稿，可以继续打开[写作样稿索引](writing-samples/index.md)。

<div class="bottom-pager">
    <a href="../" class="pager-link">返回首页</a>
    <a href="../case-studies/" class="pager-link pager-link-primary">下一步：案例复盘</a>
</div>
