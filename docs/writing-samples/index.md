---
hide:
  - navigation
---

# 写作样稿

我一开始把所有样稿放进一张长表格，信息很全，找起来却不轻松。一个只想看 Quick Start 的人，需要先扫过 PRD、版本日志和产品总览，才能确认自己该点哪里。

所以这页现在只做一件事：按读者要完成的任务，把已经写完的文档放到对应入口里。模拟项目和个人原型会继续标出来。

## 按读者任务查看

<div class="work-index">
    <section class="work-index-group">
        <div class="work-index-heading"><span>01</span><h3>先让读者做成一次</h3></div>
        <p>前置条件、最短路径、验证结果和失败后的恢复，都要在第一次操作里接得上。</p>
        <div class="work-index-list">
            <a href="../install/" class="work-index-item"><span>Quick Start</span><strong>搭建本地文档质量检查环境</strong></a>
            <a href="../core-projects/english-documentation/quick-start/" class="work-index-item"><span>English Quick Start · Repository verified</span><strong>Set up local documentation checks with Vale</strong></a>
            <a href="../troubleshooting/" class="work-index-item"><span>Troubleshooting</span><strong>文档质量流水线故障排查</strong></a>
            <a href="../04-openclaw-quickstart/" class="work-index-item"><span>Developer Quick Start · 官方资料核验</span><strong>OpenClaw 快速开始：安装 CLI 并发送第一条消息</strong></a>
        </div>
    </section>

    <section class="work-index-group">
        <div class="work-index-heading"><span>02</span><h3>让文档可以长期维护</h3></div>
        <p>写作规则、自动检查、发布流程和更新记录需要留在同一套工作流里。</p>
        <div class="work-index-list">
            <a href="../01-automation/" class="work-index-item"><span>Project Overview</span><strong>文档质量自动化流水线</strong></a>
            <a href="../style-guide/" class="work-index-item"><span>Style Guide</span><strong>技术文档写作风格指南</strong></a>
            <a href="../github-actions-workflow/" class="work-index-item"><span>Workflow</span><strong>GitHub Actions 文档检查流程</strong></a>
            <a href="../changelog/" class="work-index-item"><span>Changelog</span><strong>文档项目更新记录</strong></a>
            <a href="../core-projects/english-documentation/configure-vale/" class="work-index-item"><span>English Configuration Guide</span><strong>Configure Vale for a documentation repository</strong></a>
            <a href="../core-projects/english-documentation/github-actions/" class="work-index-item"><span>English Workflow Guide</span><strong>Run Vale in GitHub Actions</strong></a>
            <a href="../core-projects/english-documentation/troubleshooting/" class="work-index-item"><span>English Troubleshooting</span><strong>Troubleshoot Vale and CI checks</strong></a>
        </div>
    </section>

    <section class="work-index-group">
        <div class="work-index-heading"><span>03</span><h3>让开发者能够查找和调用</h3></div>
        <p>接口、器件配置和结果寄存器最终都要回到一次可以执行、可以核对的技术任务。</p>
        <div class="work-index-list">
            <a href="../03-api/" class="work-index-item"><span>API Guide · 模拟</span><strong>IoT 接口集成指南</strong></a>
            <a href="../02-hardware/" class="work-index-item"><span>Hardware Quick Start · 官方资料核验</span><strong>采集第一组环境光数据</strong></a>
            <a href="../core-projects/hardware/configure-and-read-lux/" class="work-index-item"><span>Developer Guide · 官方资料核验</span><strong>配置与数据读取</strong></a>
            <a href="../mini-programs/action/product/task-decomposition-interface-draft/" class="work-index-item"><span>Cloud Function · 小程序内部</span><strong>微步 ACTION 任务拆解云函数调用说明</strong></a>
        </div>
    </section>

    <section class="work-index-group">
        <div class="work-index-heading"><span>04</span><h3>把产品流程交给用户和协作者</h3></div>
        <p>同一个产品需要面向不同读者解释范围、操作、接口、变化和已知限制。</p>
        <div class="work-index-list">
            <a href="../mini-programs/" class="work-index-item"><span>Product Overview</span><strong>三个小程序产品总览</strong></a>
            <a href="../mini-programs/action/" class="work-index-item"><span>Product Overview · 原型</span><strong>微步 ACTION 产品概览</strong></a>
            <a href="../mini-programs/action/user-guide/quick-start/" class="work-index-item"><span>User Guide · 原型截图</span><strong>拆解并推进第一个任务</strong></a>
            <a href="../mini-programs/action/product/prd/" class="work-index-item"><span>PRD · 原型需求稿</span><strong>微步 ACTION 产品需求文档</strong></a>
            <a href="../dot-collage/" class="work-index-item"><span>Screenshot Guide</span><strong>PopDots 波点拼贴帮助</strong></a>
            <a href="../photo-background/" class="work-index-item"><span>Screenshot Guide</span><strong>照片换底色小程序帮助</strong></a>
        </div>
    </section>
</div>

## 如果你只看两篇

想看任务型文档，可以先打开[搭建本地文档质量检查环境](../install.md)。它从安装条件开始，一直写到第一次检查成功和常见报错。

想看开发者文档，可以继续看[IoT 接口集成指南](../03-api.md)。这是一份明确标注为模拟场景的样稿，重点放在认证、请求、响应、错误处理和调试路径怎样连成一次完整调用。

想看英文技术写作，可以从 [Documentation Quality Pipeline](../core-projects/english-documentation/index.md) 开始，再进入 [Set up local documentation checks with Vale](../core-projects/english-documentation/quick-start.md)。前者说明项目范围和验证边界，后者带读者完成第一次本地检查。

## 关于英文样稿

英文项目现在已经形成五篇相互连接的文档：[Project Overview](../core-projects/english-documentation/index.md)、[Quick Start](../core-projects/english-documentation/quick-start.md)、[Configure Vale](../core-projects/english-documentation/configure-vale.md)、[GitHub Actions](../core-projects/english-documentation/github-actions.md)和[Troubleshooting](../core-projects/english-documentation/troubleshooting.md)。它们都使用当前仓库中的真实配置和工作流；没有重新运行的 CI 失败路径仍明确标为待验证。

<div class="bottom-pager">
    <a href="../portfolio/" class="pager-link">返回作品总览</a>
    <a href="../posts/" class="pager-link pager-link-primary">下一篇：写作与方法</a>
</div>
