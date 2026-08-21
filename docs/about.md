---
hide:
  - navigation
---

# 关于我

我是梁卓雯，电子信息硕士，目前在深圳，正在寻找技术文档工程师、资料开发工程师和开发者文档相关的工作。

我开始认真考虑技术文档这个方向，是因为回头看自己做过的几类工作，最顺手的部分一直很接近。

硕士阶段，我阅读和分析过 120 多篇英文论文。做硬件工程实习时，我需要从驱动 IC 规格书、竞品参数和测试数据里找到真正影响判断的信息。后来整理课程资料和写内容，我又开始处理另一类问题。材料很多，读者究竟该先看什么，怎样才能照着做下去。

这些事情慢慢接到了一起。我喜欢先弄懂一个陌生问题，再把散乱的信息整理成别人能读、能查、能照着操作的文档。于是我把技术文档作为现在的求职方向，也用这份作品集补上过去经历里还缺少的项目证据。

目前已经完成的内容包括文档质量检查流程、OPT4001YMN EVM 开发者文档集和光照测量 API 接入文档。小程序产品文档仍在整理，页面上会保留明确状态。相应的复盘里也留下了资料来源、修改过程和没有完成的验证。

[查看核心作品](portfolio.md)

## 我怎样处理一份文档

我拿到一项文档任务时，会先确认读者要完成什么。

写 Quick Start 时，我关心的是读者能不能沿着一条尽量短的路径得到第一次成功结果。写 API 文档时，操作步骤和字段查询会分开处理，读者不用在同一页来回翻找。整理硬件资料时，我会把官方资料能够确认的内容和仍需实物测试的部分标清楚。

我也会反复检查两个细节。读者做完当前一步能看到什么，接下来又该去哪里。很多文档已经放进了足够多的信息，真正容易卡住的地方，往往是完成标准不清楚，下一步也没有入口。

Markdown 和 MkDocs 用来组织、维护和发布页面。Vale 检查术语与格式，GitHub Actions 留下构建和发布记录。遇到需要解释流程的内容，我会使用 Mermaid，让图和正文可以一起修改。

这些取舍都保留在[复盘与方法](case-studies/index.md)中。那里记录了原页面哪里有问题、我删掉了什么，以及最后为什么采用现在的结构。

## 英文技术写作

目前的[英文作品](core-projects/english-documentation/index.md)包括 GitHub REST API 文档样稿和 Documentation Quality Pipeline。

GitHub REST API 文档样稿包含一篇 [Quickstart](core-projects/english-documentation/github-rest-api/quickstart.md) 和一篇配套 [Troubleshooting](core-projects/english-documentation/github-rest-api/troubleshooting.md)。[Documentation Quality Pipeline](core-projects/english-documentation/documentation-quality-pipeline.md) 直接取材于作品集正在使用的 Vale、MkDocs 和 GitHub Actions 配置，包含项目概览、Quick Start、配置说明、工作流说明和故障排查。

写作时，我参考 Google 和 Microsoft 的英文技术写作指南，重点检查标题大小写、术语一致性、句子长度和任务导向表达。仓库里的 Vale 也启用了相应规则，让本地检查和持续集成使用同一套标准。

Documentation Quality Pipeline 已经重新运行过本地检查。托管环境中的持续集成失败测试还没有完成，因此我在项目中保留了这项未验证范围，没有把它写成已经跑通的结果。

## 简历

如果你想先快速查看我的经历、技能和项目对应关系，可以阅读[在线简历](简历.md)，也可以<a href="../assets/resume-zhuowen-liang.pdf" download="梁卓雯-技术文档工程师-深圳.pdf" type="application/pdf" target="_blank" rel="noopener" data-download-pdf data-md-ignore>下载 PDF 简历</a>。

[查看核心作品](portfolio.md)
