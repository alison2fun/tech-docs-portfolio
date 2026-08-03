# 微步 ACTION 任务拆解云函数调用说明

本文记录微步 ACTION 小程序怎样调用 `generatePlan` 云函数，以及云函数怎样把用户任务交给 DeepSeek 处理。

这条调用链只服务小程序内部，不作为公开 API 对外提供。

## 调用链路

一次任务拆解会经过下面几个环节：

```text
用户输入任务
→ 小程序前端调用 generatePlan
→ generatePlan 向 DeepSeek 发起请求
→ DeepSeek 返回结构化结果
→ 云函数把结果返回前端
→ 页面展示 5 个步骤和提示内容
```

任务历史和完成进度另行写入微信云开发数据库，不由 DeepSeek 保存或管理。

## 前端怎样发起请求

用户点击任务拆解按钮后，前端调用 `generatePlan` 云函数：

```javascript
const result = await wx.cloud.callFunction({
  name: 'generatePlan',
  data: {
    userTask: taskName,
  },
});
```

### 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | ---: | --- |
| `userTask` | string | 是 | 用户在任务输入框中填写的完整任务描述 |

当前前端只向云函数传递任务描述，没有单独传递语言、用户名称或任务分类。

输入为空、内容过长等限制，需要以当前页面校验代码为准。

## 云函数怎样处理任务

`generatePlan` 使用 `axios` 请求 DeepSeek：

```javascript
const response = await axios.post(
  'https://api.deepseek.com/chat/completions',
  {
    model: 'deepseek-chat',
    response_format: {
      type: 'json_object',
    },
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: `请为任务“${userTask}”生成5个微小步骤和2条心理建议`,
      },
    ],
  },
);
```

上述代码说明：

- 使用的模型是 `deepseek-chat`；
- 用户任务会进入发送给 DeepSeek 的消息；
- 云函数要求模型返回 JSON；
- 目标结果包含 5 个行动步骤和 2 条提示。

系统提示词的具体内容属于云函数实现，暂未在公开文档中完整展开。

## 返回结果

前端最终需要拿到两类内容：

- 5 个行动步骤；
- 2 条提示或鼓励内容。

生成结果会继续用于：

- 展示任务卡片；
- 建立任务记录；
- 保存步骤完成状态；
- 更新任务进度。

具体字段名应与 `generatePlan` 云函数的实际 `return` 结构保持一致。修改云函数返回格式时，需要同步检查前端解析逻辑。

## 需要处理的失败情况

任务拆解过程中至少可能遇到：

- 云函数调用失败；
- DeepSeek 请求超时；
- DeepSeek 返回内容无法解析为 JSON；
- 返回的步骤不足 5 个；
- 返回字段缺失；
- 网络中断；
- 用户输入为空。

前端需要让用户知道失败发生在哪一步，并提供重试或返回修改任务的入口。

错误提示不应只显示“生成失败”，还需要告诉用户下一步可以做什么。

## 安全边界

DeepSeek API Key 应只保存在云函数环境或服务端配置中，不应写入小程序前端。

公开作品集时，不展示：

- 完整 API Key；
- 云环境密钥；
- 云函数私有配置；
- 可以直接访问内部服务的凭据。

用户任务会经过 DeepSeek 处理，因此任务输入不适合承载敏感或需要长期保密的信息。具体说明见[数据与隐私边界](data-privacy-boundaries.md)。

## 相关文档

- [系统流程设计](system-flow-design.md)
- [数据与隐私边界](data-privacy-boundaries.md)
- [产品需求文档（PRD）](prd.md)
