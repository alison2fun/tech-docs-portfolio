# 文档质量自动化流水线验证结果

这页汇总已经保留在提交记录和 GitHub Actions 中的验证证据。数字对应历史快照，不代表当前工作区的实时扫描结果。

| 验证对象 | 结果 | 证据 |
|---|---|---|
| 历史快照 `385d72c` | 44 个 Markdown 文件；20 error、100 warning、196 suggestion | [查看提交](https://github.com/alison2fun/tech-docs-portfolio/commit/385d72ce8fd36b8a7b9511b071503439793e92fd) |
| 修复快照 `d204aef` | 0 error、69 warning、181 suggestion | [查看提交](https://github.com/alison2fun/tech-docs-portfolio/commit/d204aefa5b728c0fd70902aa74ad3824501f72eb) |
| MkDocs 严格构建 | `mkdocs build --strict` 通过 | [查看复盘中的验证记录](../../posts/docs-ci-publishing-gate.md) |
| Pull Request | Validate 成功，Deploy 跳过 | [查看 Actions 记录](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/29481055672) |
| `main` push | Validate 和 Deploy 均成功 | [查看 Actions 记录](https://github.com/alison2fun/tech-docs-portfolio/actions/runs/29485447729) |

## 这些结果能够证明什么

- 真实发布文档进入了 Vale 检查；
- error 会阻断验证任务；
- MkDocs 严格构建位于部署之前；
- Pull Request 只验证，不部署；
- `main` push 在验证成功后才进入部署。

分支保护和 required checks 仍没有公开核验记录。完整边界见[项目复盘](../../posts/docs-ci-publishing-gate.md)。

## 继续查看

- [查看项目交付物](../../github-actions-workflow.md)
- [阅读项目复盘](../../posts/docs-ci-publishing-gate.md)
- [返回核心作品](../../portfolio.md)
