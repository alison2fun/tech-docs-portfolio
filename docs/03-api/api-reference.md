# 光照测量 API Reference

本页说明光照测量接口的请求和响应契约，适合在开发、联调和故障排查时查阅。

!!! info "样例说明"
    本页描述的是模拟 API 契约。域名、资源、数据和限制均用于文档作品展示，尚未连接真实服务。

## Base URL

```text
https://api.example.com/v1
```

`v1` 是当前示例版本。服务端会通过新的主版本处理不兼容变更。

## 认证

接口使用 Bearer Token 认证。

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

所有请求都必须携带 `Authorization` 请求头。本文档假定调用者已经取得 Token，不定义 Token 的签发、刷新和权限申请流程。

## 获取最新光照数据

```http
GET /devices/{device_id}/measurements/latest
```

返回指定设备最近一次成功保存的光照测量记录。

### 路径参数

| 参数 | 类型 | 必填 | 约束 | 示例 |
| --- | --- | --- | --- | --- |
| `device_id` | string | 是 | 1 至 64 个字符，区分大小写 | `light-sensor-01` |

此 Endpoint 没有查询参数。返回结果固定为一条记录，因此不接受 `limit`、排序或分页参数。

### 请求头

| 请求头 | 必填 | 值 | 说明 |
| --- | --- | --- | --- |
| `Authorization` | 是 | `Bearer <token>` | 验证调用者身份和设备读取权限 |
| `Accept` | 否 | `application/json` | 指定期望的响应格式 |

### 请求示例

```bash
curl --request GET \
  --url 'https://api.example.com/v1/devices/light-sensor-01/measurements/latest' \
  --header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  --header 'Accept: application/json'
```

## 成功响应

请求成功时，服务返回 HTTP 200。

```json
{
  "device_id": "light-sensor-01",
  "measured_at": "2026-08-06T03:10:00Z",
  "illuminance_lux": 328.4,
  "request_id": "req_7f42c19a"
}
```

### 响应字段

| 字段 | 类型 | 可为空 | 约束 | 说明 |
| --- | --- | --- | --- | --- |
| `device_id` | string | 否 | 与请求路径中的值一致 | 返回数据所属的设备编号 |
| `measured_at` | string | 否 | RFC 3339 格式，UTC | 服务端保存该测量值时记录的采集时间 |
| `illuminance_lux` | number | 否 | 大于或等于 0 | 光照度，单位为 lux |
| `request_id` | string | 否 | 每次请求唯一 | 用于关联本次请求和服务端日志 |

响应不保证测量数据刚刚产生。调用方需要根据 `measured_at` 判断数据是否足够新。

## 错误响应

请求失败时，服务返回统一的错误对象。

```json
{
  "error": {
    "code": "MEASUREMENT_NOT_FOUND",
    "message": "No measurement was found for device 'light-sensor-01'.",
    "request_id": "req_51a6c902"
  }
}
```

### 错误字段

| 字段 | 类型 | 可为空 | 说明 |
| --- | --- | --- | --- |
| `error.code` | string | 否 | 稳定的业务错误码，可供程序判断 |
| `error.message` | string | 否 | 面向开发者的错误说明，不建议用于程序分支 |
| `error.request_id` | string | 否 | 本次失败请求的追踪编号 |

### 错误码

| HTTP 状态码 | 错误码 | 触发条件 | 建议处理 |
| --- | --- | --- | --- |
| 401 | `AUTHENTICATION_FAILED` | Token 缺失、过期或格式错误 | 取得有效 Token 后重新请求 |
| 403 | `ACCESS_DENIED` | 凭证没有读取该设备的权限 | 检查凭证权限和设备授权关系 |
| 404 | `DEVICE_NOT_FOUND` | `device_id` 对应的设备不存在 | 使用设备列表中的实际编号重新请求 |
| 404 | `MEASUREMENT_NOT_FOUND` | 设备存在，但没有可返回的测量记录 | 等待设备上报后重新请求 |
| 429 | `RATE_LIMIT_EXCEEDED` | 当前调用方超过频率限制 | 按 `Retry-After` 指定的秒数等待 |
| 500 | `INTERNAL_ERROR` | 服务端未能完成请求 | 记录 `request_id`，采用退避策略重试 |

程序应优先使用 `error.code` 处理不同错误。`message` 的文字可能在不改变接口版本的情况下调整。

## 频率限制

每个 Access Token 每分钟最多发送 60 次请求。成功响应和错误响应都会计入调用次数。

| 响应头 | 示例值 | 说明 |
| --- | --- | --- |
| `X-RateLimit-Limit` | `60` | 当前时间窗口允许的请求总数 |
| `X-RateLimit-Remaining` | `59` | 当前时间窗口剩余的请求数 |
| `Retry-After` | `30` | 仅在 HTTP 429 响应中返回，单位为秒 |

收到 HTTP 429 后，请等待 `Retry-After` 指定的时间，再使用指数退避策略重试。

## 数据与时间约定

- 请求和响应使用 UTF-8 编码。
- 响应正文使用 JSON。
- 时间使用 RFC 3339 格式并统一返回 UTC。
- 光照度统一使用 lux。
- 设备编号区分大小写。
- 未知字段可能在兼容更新中加入，调用方应忽略无法识别的字段。

## 当前范围

本页只定义查询最新一条光照数据所需的契约。历史数据、分页、时间筛选、WebSocket、SSE、令牌管理和设备管理不在当前范围内。

如需先完成一次调用，请阅读[获取设备最新光照数据](usage-guide.md)。文档结构和验证状态见[光照测量 API 文档案例](index.md)。
