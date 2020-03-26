import * as utils from '../utils/fetch'
import * as ui from '../utils/ui'
import * as helper from '../utils/helper'
import { ProtoEntity } from './proto'

/* eslint-disable @typescript-eslint/camelcase */
export interface LogstoreUpdateOption {
  ttl: number
  shardCount: number
  enable_tracking?: boolean
  autoSplit?: boolean
  maxSplitShard?: number
}
/* eslint-enable */

export interface LogGroup {
  logs: ProtoEntity | ProtoEntity[]
  topic?: string
  source?: string
  reserved?: string
}

export interface LogsPullOption {
  shardid: string
  cursor: string
  count: number
  encoding?: 'lz4' | 'deflate' | 'gzip'
}

export interface LogQuery {
  from: number
  to: number
  topic?: string
  query?: string
  line?: number
  offset?: number
  reverse?: boolean
}

export interface HistogramsQuery {
  from: number
  to: number
  topic?: string
  query?: string
}

export class Logstores {
  
  async list(
    projectName: string,
    logstoreName: string = '',
    offset: number = 0,
    size: number = 500,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'list')
    const options = { headers: { project: projectName } }
    const params = { offset, size, logstoreName }
    return utils.$fetch('/logstores', options, params)
  }
  
  async findOne(
    projectName: string,
    logstoreName: string,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'findOne')
    if (!logstoreName) this.requiredKey('logstoreName', 'findOne')
    const options = { headers: { project: projectName } }
    return utils.$fetch(`/logstores/${logstoreName}`, options)
  }
  
  async updateOne(
    projectName: string,
    logstoreName: string,
    entity: LogstoreUpdateOption,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'updateOne')
    if (!logstoreName) this.requiredKey('logstoreName', 'updateOne')
    if (!entity) this.requiredKey('entity', 'updateOne')
    const body = Object.assign({}, entity, { logstoreName })
    const options = {
      headers: { project: projectName },
      method: 'PUT',
      body,
    }
    return utils.$fetch(`/logstores/${logstoreName}`, options)
  }
  
  async create(
    projectName: string,
    logstoreName: string,
    entity: LogstoreUpdateOption,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'create')
    if (!logstoreName) this.requiredKey('logstoreName', 'create')
    if (!entity) this.requiredKey('entity', 'create')
    const body = Object.assign({}, entity, { logstoreName })
    const options = {
      headers: { project: projectName },
      method: 'POST',
      body,
    }
    return utils.$fetch('/logstores', options)
  }
  
  async destroyOne(
    projectName: string,
    logstoreName: string,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'destroyOne')
    if (!logstoreName) this.requiredKey('logstoreName', 'destroyOne')
    const options = {
      headers: { project: projectName },
      method: 'DELETE',
    }
    return utils.$fetch(`/logstores/${logstoreName}`, options)
  }
  
  async appendLog(
    projectName: string,
    logstoreName: string,
    logEntity: LogGroup,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'appendLog')
    if (!logstoreName) this.requiredKey('logstoreName', 'appendLog')
    if (!logEntity) this.requiredKey('logEntity', 'appendLog')
    const safeLog = helper.validateProtoLog(logEntity)
  
    const options = {
      headers: { project: projectName },
      method: 'POST',
      body: helper.formatLog(safeLog),
    }
    return utils.$fetch(`/logstores/${logstoreName}/shards/lb`, options)
  }
  
  async pullLogsByCursor(
    projectName: string,
    logstoreName: string,
    pullOption: LogsPullOption,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'pullLogsByCursor')
    if (!logstoreName) this.requiredKey('logstoreName', 'pullLogsByCursor')
    if (!pullOption) this.requiredKey('pullOption', 'pullLogsByCursor')
  
    const url = `/logstores/${logstoreName}/shards/${pullOption.shardid}`
    const options = {
      headers: {
        project: projectName,
        Accept: 'application/x-protobuf',
        'Accept-Encoding': pullOption.encoding || 'lz4',
      },
    }
    const params = {
      type: 'logs',
      cursor: pullOption.cursor,
      count: pullOption.count,
    }
    return utils.$fetch(url, options, params)
  }
  
  async queryLogs(
    projectName: string,
    logstoreName: string,
    query: LogQuery,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'queryLogs')
    if (!logstoreName) this.requiredKey('logstoreName', 'queryLogs')
    if (!query) this.requiredKey('query', 'queryLogs')
  
    const options = { headers: { project: projectName } }
    const params = Object.assign({}, query, {
      type: 'log',
      from: ~~(query.from / 1000),
      to: ~~(query.to / 1000),
    })
    return utils.$fetch(`/logstores/${logstoreName}`, options, params)
  }
  
  async queryHistograms(
    projectName: string,
    logstoreName: string,
    query: HistogramsQuery,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'queryHistograms')
    if (!logstoreName) this.requiredKey('logstoreName', 'queryHistograms')
    if (!query) this.requiredKey('query', 'queryHistograms')
  
    const options = { headers: { project: projectName } }
    const params = Object.assign({}, query, {
      type: 'histogram',
      from: ~~(query.from / 1000),
      to: ~~(query.to / 1000),
    })
    return utils.$fetch(`/logstores/${logstoreName}`, options, params)
  }
  
  private requiredKey(key: string, callName: string): void {
    throw new Error(`param [${ui.color.red(key)}] is required on "${ui.color.green('logstores.' + callName)}" method.`)
  }
}
