# API 列表
## 总览

  - 所有方法均返回 fetch 请求默认的 `Promise` 对象
  - 如果源返回值为空，方法会返回空对象
  - 可以通过 `response._header` 获取返回对象的 `header`：
    ```
    log.projects.list()
      .then(res => console.log(res._header))
    ```
    
  Q:**为什么没有返回类型？**
  
  A: 因为阿里云日志服务的返回数据并不固定 (视查询结果)，同时头也可以改变返回类型，而且很多操作只返回头信息。
  所以大多数情况下还需要你参考 API 源的文档返回值**并且尝试一次**。

## 项目 `projects`

### 查看项目列表
查询并返回项目列表。[API 源](https://help.aliyun.com/document_detail/74955.html)

方法：`log.projects.list(offset?: number, size?: number)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| offset | 否 | 0 | 返回记录的起始位置，默认值为 0 |
| size | 否 | 500| 每页返回最大条目 |

### 获取单个项目
根据名称查询单个项目。[API 源](https://help.aliyun.com/document_detail/74957.html)

方法：`log.projects.findOne(projectName: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |

### 创建项目
创建项目。[API 源](https://help.aliyun.com/document_detail/74780.html)

方法：`log.projects.create(projectName: string, description: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| description | 是 | - | 项目描述 |

### 更新项目
更新项目详情。[API 源](https://help.aliyun.com/document_detail/113026.html)

方法：`log.projects.updateOne(projectName: string, description: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| description | 是 | - | 项目描述 |

### 删除项目
删除一个项目。[API 源](https://help.aliyun.com/document_detail/74956.html)

方法：`log.projects.destroyOne(projectName: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |


## 日志库 `logstores`

### 获取日志库列表
获取日志库列表，可以按名称查询。[API 源](https://help.aliyun.com/document_detail/29019.html)

方法：
```
log.logstores.list(
  projectName: string,
  logstoreName?: string,
  offset?: number,
  size?: number,
) 
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 否 | - | 日志库的名称 |
| offset | 否 | 0 | 返回记录的起始位置，默认值为 0 |
| size | 否 | 500 | 每页返回最大条目 |

### 获取单个日志库
查询单个日志库。[API 源](https://help.aliyun.com/document_detail/29018.html)

方法：`log.logstores.findOne(projectName: string, logstoreName: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |


### 更新日志库
修改日志库信息。[API 源](https://help.aliyun.com/document_detail/29018.html)

方法：
```ts
log.logstores.updateOne(
  projectName: string,
  logstoreName: string, 
  entity: LogstoreUpdateOption,
)
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| entity | 是 | - | 更新对象，参见下方声明 |

entity：
```ts
interface LogstoreUpdateOption {
  ttl: number,
  shardCount: number,
  enable_tracking?: boolean,
  autoSplit?: boolean,
  maxSplitShard?: number,
}
```

entity 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| ttl | 是 | - | 日志数据生命周期（TTL），单位为天，范围1~3600 |
| shardCount | 是 | - | 查看Shard的个数 |
| enable_tracking | 否 | - | 是否开启WebTracking |
| autoSplit | 否 | - | 是否自动分裂 shard |
| maxSplitShard | 否 | - | 自动分裂时最大的shard个数 ，范围为1~64 |


### 创建日志库
创建单个日志库。[API 源](https://help.aliyun.com/document_detail/29015.html)

方法：
```ts
log.logstores.create(
  projectName: string,
  logstoreName: string,
  entity: LogstoreUpdateOption,
)
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| entity | 是 | - | 与 更新日志库 `log.logstores.updateOne` 相同 |

### 删除日志库
删除单个日志库。[API 源](https://help.aliyun.com/document_detail/29016.html)

方法：`log.logstores.destroyOne(projectName: string, logstoreName: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |


### 添加日志
向单个日志库写入日志。[API 源](https://help.aliyun.com/document_detail/29026.html)

方法：
```ts
log.logstores.appendLog(
  projectName: string,
  logstoreName: string,
  logEntity: LogGroup,
)
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| logEntity | 是 | - | 日志实体，参见下文 |

logEntity:
```ts
logs: ProtoEntity | ProtoEntity[],
topic?: string,
source?: string,
reserved?: string,
```
logEntity 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| logs | 是 | - | Proto 的日志实体，可以通过 `new AliyunLog.ProtoEntity()` 创建 |
| topic | 否 | - | 主题，详细可阅读 [日志Topic](https://help.aliyun.com/document_detail/60069.html) |
| source | 否 | - | 来源 |
| reserved | 否 | - | - |

**使用示例**，向一个日志库中写入 2 个日志:

```js
const { AliyunLog } = require('aliyun-logs')
const log = new AliyunLog({ ... })

// 创建一个日志实体，包含两条
const mylogs = new AliyunLog.ProtoEntity(
  [{ key: 'user001', value: 'ok' }, { key: 'user002', value: 'system has an error' }]
)
  
// 提交日志实体
log.logstores.appendLog('use-deploy', 'test2', { logs: mylogs })
.catch(err => console.log(err))
```

### 根据游标拉取日志
根据游标拉取压缩日志。[API 源](https://help.aliyun.com/document_detail/29025.html)

方法：`log.logstores.pullLogsByCursor(projectName: string, logstoreName: string, pullOption: LogsPullOption)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| pullOption | 是 | - | 拉取参数，见下文 |

pullOption:
```ts
interface LogsPullOption {
  shardid: string,
  cursor: string,
  count: number,
  encoding?: 'lz4' | 'deflate' | 'gzip'
}
```
pullOption 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| shardid | 是 | - | shard id |
| cursor | 是 | - | 游标 |
| count | 是 | - | 返回的 loggroup 数目，范围为 1~1000 |
| encoding | 否 | - | 响应类型 |



### 查询日志
查询日志。[API 源](https://help.aliyun.com/document_detail/29029.html)

方法：`log.logstores.queryLogs(projectName: string, logstoreName: string, query: LogQuery)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| query | 是 | - | 查询参数，见下文 |

query:
```ts
interface LogQuery {
  from: number,
  to: number,
  topic?: string,
  query?: string,
  line?: number,
  offset?: number,
  reverse?: boolean,
}
```
query 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| from | 是 | - | 查询开始时间点，JS 时间戳即可 |
| to | 是 | - | 查询结束时间点，JS 时间戳即可 |
| topic | 否 | - | 查询日志主题 |
| query | 否 | - | 查询表达式，[表达式语法](https://help.aliyun.com/document_detail/29060.html) |
| line | 否 | 100 | 返回的最大日志条数。取值范围为 0~100 |
| offset | 否 | 0 | 返回日志的起始点。取值范围为 0 或正整数 |
| reverse | 否 | false | 是否按日志时间戳逆序返回日志 |

### 查询日志分布
查询日志的分布情况。[API 源](https://help.aliyun.com/document_detail/29030.html)

方法：`log.logstores.queryHistograms(projectName: string, logstoreName: string, query: HistogramsQuery)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| query | 是 | - | 查询参数，见下文 |

query:
```ts
interface HistogramsQuery {
  from: number,
  to: number,
  topic?: string,
  query?: string,
}
```
query 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| from | 是 | - | 查询开始时间点，JS 时间戳即可 |
| to | 是 | - | 查询结束时间点，JS 时间戳即可 |
| topic | 否 | - | 查询日志主题 |
| query | 否 | - | 查询表达式，[表达式语法](https://help.aliyun.com/document_detail/29060.html) |


## 分区 `shards`

### 查询分区列表
查询日志库中的所有分区列表。[API 源](https://help.aliyun.com/document_detail/29020.html)

方法：`log.shards.list(projectName: string, logstoreName: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |

### 分裂 Shard
分裂一个可写的 Shard。[API 源](https://help.aliyun.com/document_detail/29020.html)

方法：`log.shards.split(projectName: string, logstoreName: string, splitOption: ShardsSplitOption)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| splitOption | 是 | - | 分裂参数，见下文 |

splitOption:
```ts
interface ShardsSplitOption {
  shardid: number,
  splitkey: string,
}
```
splitOption 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| shardid | 是 | - | shard id |
| splitkey | 是 | - | shard 分裂位置，如 `ef000000000000000000000000000000` |

### 合并 Shard
合并两个相邻且可写的 Shard。提供一个 `shardid`，自动寻找下一个 Shard 合并。[API 源](https://help.aliyun.com/document_detail/29022.html)

方法：`log.shards.merge(projectName: string, logstoreName: string, shardid: number)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| shardid | 是 | - | shard id |


### 获取游标
根据时间获取游标。[API 源](https://help.aliyun.com/document_detail/29024.html)

方法：`log.shards.findCursor(projectName: string, logstoreName: string, cursorOption: ShardsCursorOption)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| cursorOption | 是 | - | 查询参数，见下文 |

cursorOption:
```ts 
interface ShardsCursorOption {
  shardid: string,
  from: 'begin' | 'end' | string,
}
```
cursorOption 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| shardid | 是 | - | shard id |
| from | 是 | - | 指定位置，固定字符串或是时间戳 |


### 获取游标的时间
根据游标查询服务端时间。[API 源](https://help.aliyun.com/document_detail/113274.html)

方法:
```ts
log.shards.findTimeByCursor(
  projectName: string,
  logstoreName: string,
  timeOfCursorOption: ShardsTimeOfCursorOption,
)  
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| timeOfCursorOption | 是 | - | 查询参数，见下文 |

timeOfCursorOption:
```ts 
interface ShardsTimeOfCursorOption {
  shardid: string,
  cursor: string,
}
```
timeOfCursorOption 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| shardid | 是 | - | shard id |
| cursor | 是 | - | 游标 |

## 投递任务 `shippers`

### 获取投递任务状态
查询投递任务状态。[API 源](https://help.aliyun.com/document_detail/29027.html)

方法: `log.shippers.findTasks(projectName: string, logstoreName: string, taskQuery: TaskQuery)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| taskQuery | 是 | - | 查询参数，见下文 |

taskQuery:
```ts 
interface TaskQuery {
  shipperName: string,
  from: number,
  to: number,
  status?: string,
  offset?: number,
  size?: number,
}
```
taskQuery 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| shipperName | 是 | - | 日志投递规则名称 |
| from | 是 | - | 日志投递任务创建时间区间，时间戳 |
| to | 是 | - | 日志投递任务创建时间区间，时间戳 |
| status | 否 | - | 支持 success/fail/running 等状态 |
| offset | 否 | 0 | 投递任务的起始数目 |
| size | 否 | 100 | 指定时间区间内投递任务的数目，最大 500 |

### 重试任务
重新执行失败的日志投递任务。[API 源](https://help.aliyun.com/document_detail/29028.html)

方法: 
```ts 
log.shippers.retryTasks(
  projectName: string,
  logstoreName: string,
  retryQuery: RetryTaskQuery,
)
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| retryQuery | 是 | - | 重试参数，见下文 |

retryQuery:
```ts 
interface RetryTaskQuery {
  shipperName: string,
  taskids: string[],
}
```
RetryTaskQuery 参数说明:
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| shipperName | 是 | - | 日志投递规则名称 |
| taskids | 是 | - | 任务名 |


## 索引 `indexs`

### 创建索引
对日志库创建一个索引。[API 源](https://help.aliyun.com/document_detail/74953.html)

**创建索引的具体参数文档请务必阅读源 API，此外，索引只对创建以后录入的日志生效。**

方法: 
```ts 
log.indexs.create(
  projectName: string,
  logstoreName: string,
  indexEntity: IndexsCreateOption,
)
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| indexEntity | 是 | - | 索引实体，见下文 |

indexEntity:
```ts 
interface IndexsCreateOption {
  keys: { [key: string]: FieldIndexValue },
  line: LineIndex,
}
```
FieldIndexValue:
```ts 
FieldIndexValue {
  type: string,
  alias?: string,
  chn?: boolean,
  token?: string[],
  caseSensitive?: boolean,
  doc_value?: boolean,
}
```
LineIndex:
```ts 
interface LineIndex {
  token: string[],
  caseSensitive?: boolean,
  chn?: boolean,
  include_keys?: string[],
  exclude_keys?: string[],
}
```


### 更新索引
更新索引。[API 源](https://help.aliyun.com/document_detail/74912.html)

方法: 
```ts 
log.indexs.update(
  projectName: string,
  logstoreName: string,
  indexEntity: IndexsCreateOption,
)
```

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |
| indexEntity | 是 | - | 索引实体，同创建索引 `log.indexs.create` |

### 删除索引
删除日志库的索引。[API 源](https://help.aliyun.com/document_detail/74970.html)

方法: `log.indexs.destroy(projectName: string, logstoreName: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |

### 获取索引
获取指定日志库的所有。[API 源](https://help.aliyun.com/document_detail/74911.html)

方法: `log.indexs.findAll(projectName: string, logstoreName: string)`

参数：
| 参数 | 必选 | 默认值 | 描述 |
| ------|:------:|:-----:|:-----|
| projectName | 是 | - | 项目名 |
| logstoreName | 是 | - | 日志库的名称 |

