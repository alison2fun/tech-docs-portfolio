# 文档质量自动化流水线：从局部检查到验证后发布

## 项目背景

这是一个真实运行在个人作品集中的 Docs-as-Code 项目。

项目使用 Markdown 编写源文件，Vale 检查可以规则化的写作问题，MkDocs 构建网站，GitHub Actions 负责在代码提交后完成检查和发布。

项目早期的工作流主要通过 AI 对话生成，再由我把配置片段复制到仓库。当时，检查任务可以运行，网站也能正常发布，我便默认整条自动化链路已经成立。

后来，我使用可以读取完整仓库的 Agent 重新检查项目，才发现两个被遗漏的问题：

- Vale 只检查了一个演示文件，没有覆盖网站中真正发布的文档；
- 发布任务在 `main` 更新后独立运行，没有等待 Vale 和 MkDocs 的验证结果。

这意味着，我能够确认“检查”和“发布”分别存在，却无法证明公开文档在发布前一定经过了完整验证。

这次修改围绕一个目标展开：让真实文档进入检查范围，并让发布明确依赖验证结果。

| 项目 | 结果 |
| --- | --- |
| 项目性质 | 真实运行的个人公开项目 |
| 检查范围 | `docs/` 中的 44 个 Markdown 文件 |
| 历史基线 | 20 error、100 warning、196 suggestion |
| 修复结果 | 0 error、69 warning、181 suggestion |
| 构建结果 | `mkdocs build --strict` 通过 |
| 发布条件 | 仅在 `main` push 且验证成功后部署 |

---

## 我发现了两个流程缺口

旧仓库中有两条互不依赖的工作流。

第一条工作流运行 `vale test.md`。它可以证明 Vale 已经被安装并能够执行，却没有检查 `docs/` 中真正发布到网站的页面。

第二条工作流在 `main` 分支更新后独立发布网站。它没有等待 Vale 或 MkDocs 的检查结果，因此发布任务可能绕过验证继续运行。

从旧配置可以确认两项风险：

1. 真实文档没有进入完整检查；
2. 发布任务不依赖验证结果。

目前没有证据显示包含错误的文档曾经被实际发布，因此这里不作这一推断。能够确认的是，当时的流程缺少一道可以被验证的发布门禁。

- [查看旧 CI 工作流](https://github.com/alison2fun/tech-docs-portfolio/blob/1b7a9ea60f47e3fb86b2383445ed620f22106260/.github/workflows/ci.yml)
- [查看旧发布工作流](https://github.com/alison2fun/tech-docs-portfolio/blob/1b7a9ea60f47e3fb86b2383445ed620f22106260/.github/workflows/deploy.yml)

---

## 我与 Agent 怎样分工

Agent 负责读取完整仓库、定位配置缺口、提出修改方案，并执行工作流和文档修复。

我负责确认修改目标和范围，判断哪些结果属于真实问题，核对公开页面可以怎样表述，并根据验证证据决定是否接受和发布。

例如，Agent 可以扫描出 20 条 error，但这些结果不能直接等同于 20 处正文错误。其中包含合法项目术语、规则重复命中、故意保留的错误示例，以及一处真实的英文标题问题。

我需要继续判断：

- 哪些词应该加入项目词汇表；
- 哪些文本应该修改；
- 哪些示例需要从正文检查中排除；
- 哪个检查等级适合作为当前项目的发布门槛；
- 哪些结果已经完成验证，哪些仍然只能作为推测或待办事项。

Agent 提高了仓库检查和修改的效率。我保留了目标定义、结果判断、证据核对和发布决策。

---

## 先定义发布门禁

我没有直接修改 YAML，而是先确定这条流水线应该满足哪些条件。

真实发布的文档需要全部进入 Vale 检查。检查结果应保留 error、warning 和 suggestion 三个等级，方便后续继续治理；当前阶段只有 error 阻断流程。

Vale 检查结束后，还需要运行 MkDocs 严格构建。Vale 关注写作规则，MkDocs 负责确认网站结构和配置能否完成构建，两者覆盖的问题不同。

Pull Request 用于合并前反馈，因此只运行验证，不更新公开网站。只有 `main` push 才可以进入部署任务，并且必须先等待验证成功。

验证任务只获得返回检查结果所需的权限，部署任务才获得更新 GitHub Pages 所需的写入权限。这样可以把检查和发布的权限边界分开。

| 取舍 | 实现 |
| --- | --- |
| 检查真实文档 | Vale 扫描 `docs/` |
| 保留完整反馈 | `MinAlertLevel = suggestion` |
| error 阻断 | `fail_on_error: true` |
| warning 暂不阻断 | 保留提示，后续分批治理 |
| 同时检查内容与构建 | Vale 后运行 `mkdocs build --strict` |
| 区分 PR 和发布 | PR 只验证，`main` push 才部署 |
| 分开授权 | Validate 获得检查权限，Deploy 获得内容写入权限 |

---

## 修改后的工作流

![文档验证与发布工作流：Pull Request、main push 或手动运行先经过 Vale 与 MkDocs 验证，只有 main push 在验证成功后部署到 GitHub Pages](../assets/workflow-docs-ci.svg)

工作流支持三种触发方式：

- Pull Request；
- `main` push；
- 手动运行。

每次触发后，Validate 任务都会先运行 Vale 3.15.1，扫描 `docs/` 中的 Markdown 文件。出现 error 时，验证任务失败，流水线停止。

Vale 通过后，工作流继续执行 `mkdocs build --strict`。如果站点存在会导致严格构建失败的问题，流程同样会在发布前停止。

Pull Request 和手动运行只返回检查结果，不执行部署。

当触发事件是 `main` push 时，Deploy 任务通过 `needs: validate` 等待验证结果。只有 Validate 成功，网站才会部署到 GitHub Pages。

Vale 在这条流程中只报告问题，不会自动修改文档。文档修改仍然需要经过人工确认和提交。

[查看修改后的 GitHub Actions Workflow](https://github.com/alison2fun/tech-docs-portfolio/blob/main/.github/workflows/ci.yml)

---

## 20 条 error 怎样变成 0

我先在历史提交 `385d72c` 上运行 Vale 3.15.1，对 `docs/` 中的 44 个 Markdown 文件进行全量扫描，复现了 20 条 error。

这里的 20 条 error 指 20 条规则告警，其中部分来自同一处文本被不同规则重复命中，因此不能直接理解为 20 个独立错误。

我按照问题来源对结果进行了分类。

| 类型 | 数量 | 处理方式 |
| --- | ---: | --- |
| 合法项目术语被识别为拼写错误 | 12 | 加入项目词汇表 |
| 两个版本标题同时触发破折号相关规则 | 4 | 调整标题格式，改用中文括号 |
| 写作指南中故意展示的错误示例 | 3 | 标记为代码示例，不再按正文检查 |
| 英文标题中的 `Cannot` | 1 | 将标题改成中文 |

我没有通过降低检查等级来消除 error。`.vale.ini` 仍然从 suggestion 开始报告，原有的 warning 和 suggestion 也继续保留。

修改完成后，我在 `d204aef` 快照上重新运行 Vale，结果变为：

- 0 error；
- 69 warning；
- 181 suggestion。

- [查看历史基线提交 `385d72c`](https://github.com/alison2fun/tech-docs-portfolio/commit/385d72ce8fd36b8a7b9511b071503439793e92fd)
- [查看修复后提交 `d204aef`](https://github.com/alison2fun/tech-docs-portfolio/commit/d204aefa5b728c0fd70902aa74ad3824501f72eb)

---

## 为什么 warning 和 suggestion 暂不阻断

这是一个由我单独维护的个人网站，当前规则主要参考 Google 和 Microsoft 的写作风格。

全量扫描后仍然存在 69 条 warning 和 181 条 suggestion。它们主要用于提示表达一致性、词语选择和风格偏好，其中一些需要结合具体页面判断。

如果现在让所有 warning 一起阻断，发布流程会长期停留在风格治理阶段，也会把部分需要人工判断的建议直接视为发布故障。

因此，我先让 error 作为明确门槛，warning 和 suggestion 继续完整输出，再按照规则类型和核心页面分批处理。

如果项目进入多人协作，或者文档会直接影响产品操作和安全，我会重新评估阻断等级，并补充分支保护和审核要求。

---

## 我怎样验证这条链路

我没有只用“工作流运行成功”作为结论，而是分别验证修复前基线、本地结果、Pull Request 路径和正式发布路径。

| 验证对象 | 环境或事件 | 结果 |
| --- | --- | --- |
| [`385d72c` 历史快照](https://github.com/alison2fun/tech-docs-portfolio/commit/385d72ce8fd36b8a7b9511b071503439793e92fd) | Vale 3.15.1 | 44 文件；20 error、100 warning、196 suggestion |
| [`d204aef` 修复快照](https://github.com/alison2fun/tech-docs-portfolio/commit/d204aefa5b728c0fd70902aa74ad3824501f72eb) | Windows；Vale 3.15.1 | 44 文件；0 error、69 warning、181 suggestion |
| `d204aef` 修复快照 | Python 3.13.5；MkDocs Material 9.7.6 | `mkdocs build --strict` 通过 |
| [Pull Request 验证](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/29481055672) | Pull Request | Validate 成功，Deploy 跳过 |
| [`main` 验证和部署](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/29485447729) | `main` push | Validate 和 Deploy 均成功 |

当前发布门禁由两个提交共同完成。

[CI 改造提交](https://github.com/alison2fun/tech-docs-portfolio/commit/385d72ce8fd36b8a7b9511b071503439793e92fd)把验证和部署放入同一条依赖链路。[基线修复提交](https://github.com/alison2fun/tech-docs-portfolio/commit/d204aefa5b728c0fd70902aa74ad3824501f72eb)删除了仍然可以独立发布的旧工作流，同时处理全量扫描发现的 error。

这组结果可以证明：

- 真实文档已经进入 Vale 检查；
- error 会让验证失败；
- MkDocs 严格构建位于发布之前；
- Pull Request 不会部署网站；
- `main` push 只有在验证成功后才会进入部署任务。

- [查看 CI 改造提交](https://github.com/alison2fun/tech-docs-portfolio/commit/385d72ce8fd36b8a7b9511b071503439793e92fd)
- [查看基线修复提交](https://github.com/alison2fun/tech-docs-portfolio/commit/d204aefa5b728c0fd70902aa74ad3824501f72eb)
- [查看 Pull Request #1](https://github.com/alison2fun/tech-docs-portfolio/pull/1)
- [查看 `main` 验证与部署记录](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/29485447729)

---

## 当前限制

目前没有公开核验分支保护和 required checks。

因此，现有证据可以证明 Pull Request 会运行验证，但还不能证明验证失败时，GitHub 设置一定会阻止合并。

Vale Action 已固定到完整 commit SHA，`actions/checkout@v4` 和 `actions/setup-python@v5` 仍然使用版本标签。

`main` 的成功运行中，Validate 和 Deploy 各出现一条 Node.js 20 弃用 warning；两条 warning 均列出了 `actions/checkout@v4` 和 `actions/setup-python@v5`。

本地复现使用 Python 3.13.5，CI 使用 Python 3.12。两者当前都能通过，但环境还没有完全统一。

`mkdocs build --strict` 可以处理 MkDocs 构建过程中的 warning，却不覆盖外部链接检查和用户操作的端到端测试。

这是一个由单人维护的个人项目，目前也没有团队协作效率、审查耗时或缺陷减少比例等数据。

这些内容会保留为后续补强方向，不纳入本次已经完成的结论。

---

## 这次修改带来的变化

这次修改涉及的配置并不复杂，真正需要补上的，是几项此前没有被串联起来的判断：

- 检查应该覆盖哪些文档；
- 哪类问题需要阻止发布；
- 验证失败后能否停止下一步；
- Pull Request 和正式发布应该怎样分流；
- 检查任务和部署任务分别需要哪些权限；
- 我能够根据现有证据，把结论写到什么程度。

检查任务能够运行，只能说明工具已经接入。

当真实文档进入检查范围，发布明确等待验证结果，并且每一个结论都能回到提交记录和运行结果中核对，这条流水线才形成了一条完整的发布路径。

---

## 最终交付物

- [查看项目概览](../01-automation.md)
- [查看 Quick Start](../install.md)
- [查看 GitHub Actions 工作流](../github-actions-workflow.md)
- [查看验证结果](../core-projects/docs-engineering/validation-results.md)

## 相关方法

- [文档为什么会过期](preventing-stale-docs.md)
- [选择文档工具前，我会先问哪几个问题](choosing-docs-tools.md)
- [怎样与 AI 协作写技术文档](ai-assisted-docs-boundaries.md)

<div class="bottom-pager">
    <a href="../../01-automation/" class="pager-link">返回项目概览</a>
    <a href="../../case-studies/" class="pager-link pager-link-primary">返回复盘与方法</a>
</div>
