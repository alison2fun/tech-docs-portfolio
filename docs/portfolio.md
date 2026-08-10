---
hide:
  - navigation
  - toc
---

# 作品总览

这里展示四个核心项目，分别是硬件资料重构、产品文档、文档工程以及英文技术写作。每个项目都可以直接进入成品页面，如果你对文档从原始材料到最后结果的过程感兴趣，可以参考[案例复盘](case-studies/index.md)。

其中，硬件项目基于德州仪器（TI）的真实产品资料；微信小程序来自我对用户需求的观察，并使用 AI 辅助制作；文档流水线工程运行在 GitHub 的当前仓库中。

按文档任务类型查看样稿，请打开[写作样稿索引](writing-samples/index.md)。

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
                    <h3 class="card-title card-title--single-line">OPT4001YMNEVM 开发者文档重构</h3>
                    <div class="portfolio-skill-tags" aria-label="能证明的能力">
                        <span class="doc-badge">跨文档事实核对</span>
                        <span class="doc-badge">硬件资料理解</span>
                        <span class="doc-badge">图表与代码说明</span>
                        <span class="doc-badge">开发者任务组织</span>
                    </div>
                    <p class="card-desc">基于 TI 总共 89 页的 OPT4001 Datasheet 和 EVM User's Guide，这个项目将分散的板卡结构、首次采集、I²C 读取、结果寄存器和故障信息，重组为一套面向开发者的 Web 文档。</p>
                    <div class="portfolio-context">
                        <span><strong>解决的问题：</strong>解决开发者需要来回查找板卡连接、操作步骤和器件配置的问题。</span>
                        <span><strong>当前交付：</strong>项目概览、Quick Start、评估系统说明、配置与数据读取、故障排查。</span>
                        <span><strong>项目边界：</strong>技术事实来自 TI 官方资料；尚未使用真实硬件完成独立验证。</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../02-hardware/" class="action-link action-link-primary">查看 Quick Start &rarr;</a>
                        <a href="../core-projects/hardware/configure-and-read-lux/" class="action-link">查看配置与数据读取 &rarr;</a>
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
                    <div class="portfolio-skill-tags" aria-label="能证明的能力">
                        <span class="doc-badge">目标读者分析</span>
                        <span class="doc-badge">任务导向写作</span>
                        <span class="doc-badge">产品信息架构</span>
                        <span class="doc-badge">代码与文档核对</span>
                    </div>
                    <p class="card-desc">我做了三个小程序：抗拖延小程序“微步 ACTION”、图片波点拼贴小程序“PopDots”，以及证件照换底色小程序“换换底色”。文档集以微步 ACTION 为主案例，交付面向用户、产品和技术维护的文档。</p>
                    <div class="portfolio-context">
                        <span><strong>主要交付物：</strong>用户指南、PRD、系统流程、云函数调用说明、隐私边界和迭代记录。</span>
                        <span><strong>项目边界：</strong>微步 ACTION 为完整主案例，PopDots 和换换底色为同组补充样本。</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../mini-programs/action/" class="action-link action-link-primary">查看产品概览 &rarr;</a>
                        <a href="../mini-programs/action/user-guide/quick-start/" class="action-link">查看原型快速体验 &rarr;</a>
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
                    <h3 class="card-title">文档质量检查自动化流水线</h3>
                    <div class="portfolio-skill-tags" aria-label="能证明的能力">
                        <span class="doc-badge">文档工程化</span>
                        <span class="doc-badge">Docs-as-Code</span>
                        <span class="doc-badge">CI/CD</span>
                        <span class="doc-badge">质量门禁</span>
                        <span class="doc-badge">故障排查</span>
                        <span class="doc-badge">证据核对</span>
                    </div>
                    <p class="card-desc">真实运行并持续维护的个人公开文档质量门禁项目。用 Vale、MkDocs 和 GitHub Actions 搭建了一条写作检查、严格构建、验证和发布的工作流。</p>
                    <div class="portfolio-context">
                        <span><strong>解决的问题：</strong>让作者只需要专注写作内容，后续语言一致性、格式规范等工作搭建成 SOP 自动检查并发布。</span>
                        <span><strong>主要交付物：</strong>项目概览、Quick Start、Style Guide、Workflow、验证结果、Troubleshooting 和 Changelog。</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../01-automation/" class="action-link action-link-primary">查看项目概览 &rarr;</a>
                        <a href="../core-projects/docs-engineering/validation-results/" class="action-link">查看验证结果 &rarr;</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="solid-card card-wide">
            <div class="portfolio-card-layout">
                <img src="../assets/thumb-english-documentation.svg" alt="Documentation Quality Pipeline English document set thumbnail" class="portfolio-thumb portfolio-thumb--fill">
                <div>
                    <div class="card-header">
                        <span class="serif-num">04</span>
                        <span class="card-label">English Documentation · Docs-as-Code</span>
                    </div>
                    <h3 class="card-title">Documentation Quality Pipeline</h3>
                    <div class="portfolio-skill-tags" aria-label="Skills demonstrated">
                        <span class="doc-badge">English Technical Writing</span>
                        <span class="doc-badge">Task-based Docs</span>
                        <span class="doc-badge">Vale</span>
                    </div>
                    <p class="card-desc">This five-page documentation set turns the workflow from Project 03 into an English task path. Readers start with a local Vale check, then move to repository rules, GitHub Actions, and troubleshooting.</p>
                    <div class="portfolio-context">
                        <span><strong>Reader task</strong> Run Vale locally, understand the active rules, and follow the same check in CI.</span>
                        <span><strong>Published pages</strong> Project Overview, local Vale Quick Start, configuration guide, GitHub Actions guide, and troubleshooting guide.</span>
                        <span><strong>Current evidence</strong> All five pages pass the current local Vale check and MkDocs strict build. A controlled CI failure-and-recovery test remains pending.</span>
                    </div>
                    <div class="action-link-group">
                        <a href="../core-projects/english-documentation/quick-start/" class="action-link action-link-primary">View Quick Start &rarr;</a>
                        <a href="../core-projects/english-documentation/github-actions/" class="action-link">View GitHub Actions &rarr;</a>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

## 更多样本

<div class="grid cards evidence-map" markdown>

- **光照测量 API 文档案例**

    将一篇混合操作、接口定义和写作说明的长页面，重构为项目概览、使用指南和 API Reference。

    [查看样稿](03-api/index.md)

- **OpenClaw 快速安装**

    根据官方资料核验安装、首次配置、Gateway 和 Control UI 路径。

    [查看样稿](04-openclaw-quickstart.md)

</div>

<div class="bottom-pager">
    <a href="../" class="pager-link">返回首页</a>
    <a href="../case-studies/" class="pager-link pager-link-primary">下一步去看案例复盘</a>
</div>
