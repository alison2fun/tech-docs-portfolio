# 怎样写一篇能完成诊断的 Troubleshooting

读者打开 Troubleshooting 时，通常已经看到一条错误信息或一个异常现象。他们不会按课程顺序从头学习，而是先搜索终端里的原文，再判断问题停在哪一层。

我把 [GitHub REST API troubleshooting](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api) 与 [Docker daemon troubleshooting](https://docs.docker.com/engine/daemon/troubleshoot/) 放在一起比较，想弄清一篇排错文档怎样从现象走到可以执行的处理动作。

## Troubleshooting 负责已经发生的异常

Quickstart 负责正常路径和第一次成功。FAQ 适合回答概念、规则和选择。Troubleshooting 面对的是已经出现的错误、失败或异常行为。

一个问题是否值得收录，可以先看三件事。读者能否描述清楚症状，这个症状是否会打断当前任务，文档能否提供诊断或恢复动作。只有理论可能、没有观察入口，或者一句解释就能说完的问题，不必扩成故障条目。

预测候选问题时，可以沿着正常路径寻找中断点。环境、命令语法、认证、权限、网络、资源状态、请求与响应都可能让任务停住。候选问题还要带上依据，实际遇到、主动复现、官方记录和根据流程推断不能混成同一种事实。

## 用症状做检索入口

GitHub 的排错页会直接使用 `404 Not Found`、`Validation Failed` 等文字做标题。读者可以把终端里的文本原样带进页面搜索。

宽泛标题很难承担这个作用。`Authentication issues` 只说明了领域，`GitHub CLI authentication does not complete` 才指出读者看到了什么。拼写、大小写和标点也应尽量保留，方便搜索命中。

## 从症状逐步缩小原因

Docker 的条目常按下面的顺序展开。

```text
Symptom → Meaning → Check → Action
```

GitHub 的 `404` 也说明同一状态码可能有多种原因。公开仓库的 owner 或 repository 写错会返回 `404`，私有仓库缺少有效认证也可能返回 `404`。状态码只能作为入口，认证方式、页面可见性和 Endpoint 还需要继续比较。

诊断应该先做只读、低风险且容易确认的检查。如果某个结果已经确定原因，就停止无关分支。只有前一步不能区分原因时，才进入下一项检查。

## 把关键检查写完整

`Check the repository owner and name` 没有告诉读者怎样完成判断。关键检查需要补齐几个信息。

- 去哪里看。
- 看哪个字段、状态或文本。
- 不同结果分别意味着什么。
- 每种结果下一步做什么。

只有存在唯一预期结果时，才需要写固定正确值。DNS 查询可能返回多个有效 IP 地址，这时通过标准应是出现一个或多个地址。`TcpTestSucceeded` 则有清楚分支，`True` 可以返回原请求，`False` 需要继续检查网络、代理或防火墙。

因此，不能机械要求每个动作都有同一种四段结构。完整展开应该留给会改变诊断方向的检查。

## 让多种结果进入不同动作

Docker 的 DNS 条目会先确认是否使用特定 resolver，再给出互斥方案。文档说明方案影响，让读者按环境选一项，而不是把所有命令逐个尝试。

写互斥方案时，需要回答三个问题。每个方案适用于什么条件，会改动什么，选择之后怎样返回原任务。涉及删除、重置、覆盖和安全控制时，还要提前说明影响并优先给出可逆操作。

GitHub REST API 的限流判断也使用分支。`x-ratelimit-remaining` 为 `0` 时等待重置时间，存在 `retry-after` 时按秒数等待。消息没有指出限流时，读者应使用原始消息寻找下一条诊断路径，不能把所有 `403` 都归为同一原因。

## 不要只写模糊动词

`check`、`verify` 和 `make sure` 本身没有问题，问题在于后面缺少对象和标准。

`Check the connection` 可能指物理连接、DNS、TCP 端口、代理或服务响应。排错文档应明确检查哪一层，用什么命令，读者在输出哪里找结果。操作完成后，可以让读者重新执行原来失败的步骤，不必为每个问题增加重复的 `Verify the fix` 章节。

## Troubleshooting 检查清单

- 每个主要标题是否来自可观察症状或错误文本。
- 收录的问题是否会影响当前任务。
- 证据是否区分实际观察、主动测试、官方记录和推断。
- 诊断是否先从低风险、容易确认的原因开始。
- 关键检查是否写清位置、对象、判断条件和后续动作。
- 多种有效结果是否进入不同处理分支。
- 互斥方案是否说明适用条件和影响。
- 是否避免让读者无目的地逐个尝试。
- 是否与 Quickstart、FAQ 或 Reference 重复。
- 处理完成后是否能返回原任务或进入明确的升级路径。

这套方法已经用于 [Troubleshoot repository metadata requests](../core-projects/english-documentation/github-rest-api/troubleshooting.md)。相关写作工具见 [GitHub 英文文档写作复盘](github-rest-api-english-docs-retrospective.md)。

<div class="bottom-pager">
    <a href="../../case-studies/" class="pager-link">返回复盘与方法</a>
    <a href="../ai-assisted-docs-boundaries/" class="pager-link pager-link-primary">下一篇　怎样与 AI 协作写技术文档</a>
</div>
