---
title: API 参考文档
---

# API 参考文档 (API Reference)

> 本文档面向接入"任务拆解小程序"后端服务的前端开发者。所有接口遵循 RESTful 设计风格，数据格式为 JSON。

---

## 版本记录 (Changelog)

| 版本号 | 发布日期 | 变更说明 |
|--------|----------|----------|
| v1.1.0 | 2025-03-10 | 新增调用配额字段 `quota_remaining`；细化错误码分类 |
| v1.0.0 | 2025-01-20 | 初始版本发布，支持任务拆解核心接口 |

---

## 基础信息 (Base Info)

- **Base URL：​** `https://api.task-decomposer.com/api/v1`
- **协议：​** HTTPS
- **字符编码：​** UTF-8
- **认证方式：​** Bearer Token（微信登录授权后获取）

---

## 认证说明 (Authentication)

所有接口均需在请求头中携带有效的访问令牌。令牌通过微信 OAuth 2.0 授权流程获取，有效期为 **7200 秒**，过期后需重新授权。

```
Authorization: Bearer {wx_access_token}
```

---

## 接口详情 (Endpoints)

### POST /tasks/decompose

**功能描述：​** 接收用户输入的原始任务描述，调用 AI 引擎将其拆解为 5 个微小、可立即执行的子步骤，并返回结构化的任务列表。

---

#### 请求头 (Request Headers)

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `Authorization` | string | 是 | 格式：`Bearer {wx_access_token}` |
| `Content-Type` | string | 是 | 固定值：`application/json` |

---

#### 请求体 (Request Body)

```json
{
  "task_description": "两周内完成毕业论文第二章文献综述",
  "language": "zh-CN"
}
```

| 字段名 | 类型 | 必填 | 约束 | 说明 |
|--------|------|------|------|------|
| `task_description` | string | 是 | 10 \~ 200 字符 | 用户输入的原始任务描述，建议包含具体目标、时间范围和当前状态 |
| `language` | string | 否 | 枚举值：`zh-CN`、`en-US` | 指定 AI 返回步骤的语言，默认 `zh-CN` |

---

#### 成功响应 (Success Response)

**HTTP 状态码：​** `200 OK`

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "task_id": "task_20250317_abc123",
    "original_description": "两周内完成毕业论文第二章文献综述",
    "steps": [
      {
        "step_id": 1,
        "content": "打开知网，搜索关键词「任务拆解 + 认知负荷」，收集 10 篇相关文献",
        "is_completed": false
      },
      {
        "step_id": 2,
        "content": "阅读并标注其中 5 篇最相关文献的摘要与结论",
        "is_completed": false
      },
      {
        "step_id": 3,
        "content": "建立文献综述框架，列出 3 个核心论点",
        "is_completed": false
      },
      {
        "step_id": 4,
        "content": "按论点分类整理文献引用，完成初稿提纲",
        "is_completed": false
      },
      {
        "step_id": 5,
        "content": "撰写文献综述正文第一段（约 300 字），完成开头破题",
        "is_completed": false
      }
    ],
    "quota_remaining": 17,
    "created_at": "2025-03-17T09:30:00Z"
  }
}
```

| 字段名 | 类型 | 说明 |
|--------|------|------|
| `code` | integer | 业务状态码，`0` 表示成功 |
| `message` | string | 响应描述 |
| `data.task_id` | string | 本次任务的唯一标识符，格式：`task_{日期}_{随机串}` |
| `data.original_description` | string | 原始输入内容，用于前端回显确认 |
| `data.steps` | array | AI 拆解生成的步骤列表，固定返回 5 条 |
| `data.steps[].step_id` | integer | 步骤序号，范围 1 \~ 5 |
| `data.steps[].content` | string | 步骤描述文本 |
| `data.steps[].is_completed` | boolean | 初始值固定为 `false`，由客户端本地维护勾选状态 |
| `data.quota_remaining` | integer | 当前账号今日剩余调用次数，上限 20 次/账号/日 |
| `data.created_at` | string | 任务创建时间，ISO 8601 格式，UTC 时区 |

---

#### 错误响应 (Error Responses)

所有错误响应均返回统一的 JSON 结构：

```json
{
  "code": {错误码},
  "message": "{错误描述}",
  "data": null
}
```

| HTTP 状态码 | 业务错误码 | 错误标识 | 触发场景 | 建议处理方式 |
|-------------|-----------|----------|----------|-------------|
| `400` | `4001` | `ERR_DESC_TOO_SHORT` | `task_description` 少于 10 个字符 | 前端提示用户"描述太简短啦，再说具体一点" |
| `400` | `4002` | `ERR_DESC_TOO_LONG` | `task_description` 超过 200 个字符 | 前端限制输入框最大字符数并实时提示 |
| `401` | `4010` | `ERR_UNAUTHORIZED` | Token 缺失、格式错误或已过期 | 引导用户重新微信授权登录 |
| `429` | `4290` | `ERR_RATE_LIMIT` | 当日调用次数已达 20 次上限 | 前端展示"今日次数已用完，明天再来"提示 |
| `503` | `5030` | `ERR_AI_UNAVAILABLE` | AI 服务暂时不可用 | 前端提示"拆解服务维护中，请稍后重试"并提供重试按钮 |

---

## 调用配额说明 (Rate Limiting)

为保障服务稳定性，每个微信账号每自然日最多调用本接口 **20 次**。配额于每日 **00:00（UTC+8）​** 重置。

剩余次数可通过成功响应中的 `quota_remaining` 字段实时获取，建议前端在输入界面显眼位置展示剩余次数，降低用户因超限产生的挫败感。

---

## 工具推荐 (Tooling)

在开发和调试阶段，推荐使用以下工具对本接口进行测试：

- **​[Apifox](https://apifox.com)​**：支持中文界面，适合团队协作与接口 Mock
- **​[Postman](https://www.postman.com)​**：业界标准 API 调试工具，支持自动化测试集合
- **curl（命令行）：​** 快速验证接口连通性

```bash
curl -X POST https://api.task-decomposer.com/api/v1/tasks/decompose \
  -H "Authorization: Bearer {your_wx_access_token}" \
  -H "Content-Type: application/json" \
  -d '{"task_description": "两周内完成毕业论文第二章文献综述", "language": "zh-CN"}'
```
