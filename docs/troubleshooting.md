# 故障排查：文档质量自动化流水线

## 页面目标

本文档整理在搭建和使用文档质量自动化流水线时可能遇到的常见问题。

这些问题主要涉及 Vale 安装、VS Code 插件、项目配置和 GitHub Actions 自动检查。每个问题都按照“现象、可能原因、解决方法、验证方式”的结构组织，帮助读者快速定位和解决问题。

## 适用范围

本文档适用于以下场景：

* 本地安装 Vale 后无法运行；
* VS Code 中没有显示 Vale 检查提示；
* Vale 找不到配置文件或规则目录；
* 本地检查和 GitHub Actions 检查结果不一致；
* GitHub Actions 自动检查失败。

---

## Vale Command Not Found

### 现象

在终端运行以下命令：

```bash
vale -v
```

终端提示：

```text
vale: command not found
```

或在 Windows PowerShell 中提示无法识别 `vale` 命令。

### 可能原因

可能原因包括：

* Vale 没有安装成功；
* Vale 安装路径没有加入系统 PATH；
* 安装完成后没有重新打开终端；
* 当前终端环境无法识别新安装的命令。

### 解决方法

1. 重新确认 Vale 是否已安装。
2. 关闭当前终端并重新打开。
3. 再次运行版本检查命令：

```bash
vale -v
```

如果仍然无法识别命令，请重新安装 Vale。

Windows 用户可以尝试：

```powershell
winget install Vale.Vale
```

macOS 用户可以尝试：

```bash
brew install vale
```

### 验证方式

如果终端输出 Vale 版本号，说明问题已解决。

示例：

```text
vale version 3.x.x
```

---

## VS Code Vale 插件没有提示

### 现象

已经安装 VS Code Vale 插件，但打开 Markdown 文件后没有看到任何 Vale 提示。

### 可能原因

可能原因包括：

* 当前打开的是单个 Markdown 文件，而不是项目根目录；
* 项目根目录下缺少 `.vale.ini`；
* VS Code 没有重新加载；
* 当前 Markdown 文件没有触发任何 Vale 规则；
* Vale 插件没有正确识别项目配置。

### 解决方法

1. 确认 VS Code 打开的是项目根目录，而不是单个文件。
2. 确认项目根目录下存在 `.vale.ini`。
3. 确认项目中存在 `styles/` 规则目录。
4. 重新加载 VS Code 窗口。
5. 在终端中手动运行：

```bash
vale docs/
```

### 验证方式

如果命令行可以输出检查结果，说明 Vale 本身可用。
如果 VS Code 仍然没有提示，问题可能出在插件配置或编辑器刷新状态。

---

## Vale Cannot Find Style Files

### 现象

运行 Vale 检查时，终端提示找不到样式规则文件，或提示某些 style 不存在。

### 可能原因

可能原因包括：

* `.vale.ini` 中的 `StylesPath` 配置错误；
* `styles/` 文件夹不存在；
* `BasedOnStyles` 中引用了不存在的规则集；
* 文件夹名称大小写不一致；
* 当前命令不是在项目根目录运行。

### 解决方法

1. 确认项目根目录中存在 `.vale.ini`。
2. 打开 `.vale.ini`，检查 `StylesPath` 是否指向正确目录。
3. 确认 `styles/` 文件夹中存在对应规则集。
4. 在项目根目录重新运行：

```bash
vale docs/
```

### 验证方式

如果 Vale 能够开始扫描 Markdown 文件，并输出具体检查结果，说明规则路径配置正确。

---

## Markdown 文件没有被检查

### 现象

运行检查命令后，没有看到任何输出，或者感觉某些 Markdown 文件没有被扫描。

### 可能原因

可能原因包括：

* 检查路径写错；
* `.vale.ini` 中没有匹配当前文件类型；
* 文档文件不在 `docs/` 目录下；
* 当前文档没有触发任何规则；
* 被检查文件被配置规则排除了。

### 解决方法

1. 确认你在项目根目录运行命令。
2. 使用明确路径运行检查：

```bash
vale docs/
```

3. 确认 `.vale.ini` 中包含 Markdown 文件匹配规则，例如：

```ini
[*.md]
BasedOnStyles = Microsoft, MyStyle
```

4. 人为制造一个明显错误，再次运行检查，确认规则是否触发。

### 验证方式

如果 Vale 输出文件名、行号和规则名称，说明 Markdown 文件已被检查。

---

## GitHub Actions 检查失败

### 现象

提交代码后，GitHub Actions 自动检查失败。

### 可能原因

可能原因包括：

* CI 配置文件路径错误；
* GitHub Actions 没有正确安装 Vale；
* 检查命令路径错误；
* 文档中存在未修复的 Vale error；
* 本地环境和 CI 环境使用的 Vale 版本不同。

### 解决方法

1. 打开 GitHub Actions 失败记录。
2. 查看失败步骤的日志。
3. 找到具体错误信息。
4. 在本地运行相同命令：

```bash
vale docs/
```

5. 修复文档问题或 CI 配置问题后重新提交。

### 验证方式

如果 GitHub Actions 重新运行后显示通过，说明问题已解决。

---

## 本地检查通过，但 GitHub Actions 失败

### 现象

本地运行 Vale 检查没有问题，但提交后 GitHub Actions 检查失败。

### 可能原因

可能原因包括：

* 本地和 CI 使用的 Vale 版本不同；
* CI 中运行命令的路径不同；
* 某些文件没有提交到仓库；
* `.vale.ini` 或 `styles/` 规则文件没有被提交；
* Windows 和 Linux 环境下路径大小写处理不同。

### 解决方法

1. 确认 `.vale.ini` 和 `styles/` 已经提交到仓库。
2. 检查 GitHub Actions 日志中的实际运行路径。
3. 在本地尽量使用和 CI 相同的命令：

```bash
vale docs/
```

4. 如果问题与路径大小写有关，统一文件夹和配置中的名称。

### 验证方式

重新提交后，GitHub Actions 检查通过。

---

## 排查顺序建议

遇到问题时，建议按以下顺序排查：

1. 先确认 Vale 是否安装成功；
2. 再确认 `.vale.ini` 是否存在；
3. 再确认 `styles/` 规则目录是否存在；
4. 再运行本地命令 `vale docs/`；
5. 最后查看 GitHub Actions 日志。

这个顺序可以帮助你区分问题出在工具安装、项目配置、文档内容，还是 CI 自动化流程。

## 下一步

如果你想理解这些问题背后的规则设计，请继续阅读：

1. [写作风格指南](style-guide.md)：了解本项目采用的写作规范；
2. [快速开始](install.md)：了解如何在本地运行文档质量检查；
3. [更新记录](changelog.md)：查看本文档项目的更新记录。
