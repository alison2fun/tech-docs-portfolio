# 写作风格指南 (Writing Style Guide)

本指南基于 **Microsoft Style Guide** 并结合中文排版习惯制定。所有的规则均已通过 Vale 实现自动化检测。

## 1. 中英文混排规范 (Spacing)

在中文技术文档中，汉字与英文单词/数字之间**必须**保留一个空格。

* **规则 ID**: `MyStyle.Spacing`
* **严重等级**: `Error` (强制拦截)

|✅ 正确示例 (Do) | ❌ 错误示例 (Don't) |
| :--- | :--- |
| 这是一个 **Github** 仓库 | 这是一个**Github**仓库 |
| 今天的气温是 **25** 度 | 今天的气温是**25**度 |

---

## 2. 语气与语态 (Voice and Tone)

根据 **Google Development Style Guide**,我们应该保持客观、直接。

### 2.1 避免使用 "Please"
技术文档应注重效率，指令应直接下达，无需过度客套。

* **规则 ID**: `Google.Politeness`
* **严重等级**: `Suggestion`

|✅ 正确示例 (Do) | ❌ 错误示例 (Don't) |
| :--- | :--- |
| **Click** the Submit button. | **Please click** the Submit button. |
| **Run** the following command. | **Please note that you should run** the command. |

### 2.2 使用主动语态 (Active Voice)
主动语态更清晰，责任主体更明确。

|✅ 正确示例 (Do) | ❌ 错误示例 (Don't) |
| :--- | :--- |
| The browser **sends** a request. | A request **is sent** by the browser. |