import * as utils from '../utils/fetch'
import * as ui from '../utils/ui'

export interface ShardsSplitOption {
  shardid: number
  splitkey: string
}

export interface ShardsCursorOption {
  shardid: string
  from: 'begin' | 'end' | string
}

export interface ShardsTimeOfCursorOption {
  shardid: string
  cursor: string
}

export class Shards {
  async list(
    projectName: string,
    logstoreName: string,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'list')
    if (!logstoreName) this.requiredKey('logstoreName', 'list')
    const options = { headers: { project: projectName } }
    return utils.$fetch(`/logstores/${logstoreName}`, options)
  }
  
  async split(
    projectName: string,
    logstoreName: string,
    splitOption: ShardsSplitOption,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'split')
    if (!logstoreName) this.requiredKey('logstoreName', 'split')
    if (!splitOption) this.requiredKey('splitOption', 'split')
  
    const url = `/logstores/${logstoreName}/shards/${splitOption.shardid}`
    const options = { headers: { project: projectName }, method: 'POST' }
    const params = { key: splitOption.splitkey, action: 'split' }
    return utils.$fetch(url, options, params)
  }
  
  async merge(
    projectName: string,
    logstoreName: string,
    shardid: number,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'merge')
    if (!logstoreName) this.requiredKey('logstoreName', 'merge')
    if (!shardid) this.requiredKey('shardid', 'merge')
  
    const url = `/logstores/${logstoreName}/shards/${shardid}`
    const options = { headers: { project: projectName }, method: 'POST' }
    const params = { action: 'merge' }
    return utils.$fetch(url, options, params)
  }
  
  async findCursor(
    projectName: string,
    logstoreName: string,
    cursorOption: ShardsCursorOption,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'findCursor')
    if (!logstoreName) this.requiredKey('logstoreName', 'findCursor')
    if (!cursorOption) this.requiredKey('cursorOption', 'findCursor')
    const isFixedFrom = cursorOption.from === 'begin' || cursorOption.from === 'end'
    if (!isFixedFrom) {
      const num = ~~(+cursorOption.from / 1000)
      if (Number.isNaN(num)) {
        throw new Error('the param "from" of cursorOption must be timestamp / "begin" / "end".')
      }
      cursorOption.from = `${num}`
    }
    const params = {
      from: cursorOption.from,
      type: 'cursor',
    }
    const url = `/logstores/${logstoreName}/shards/${cursorOption.shardid}`
    const options = { headers: { project: projectName } }
    return utils.$fetch(url, options, params)
  }
  
  async findTimeByCursor(
    projectName: string,
    logstoreName: string,
    timeOfCursorOption: ShardsTimeOfCursorOption,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'findTimeByCursor')
    if (!logstoreName) this.requiredKey('logstoreName', 'findTimeByCursor')
    if (!timeOfCursorOption) this.requiredKey('timeOfCursorOption', 'findTimeByCursor')
    const params = {
      cursor: timeOfCursorOption.cursor,
      type: 'cursor_time',
    }
    const url = `/logstores/${logstoreName}/shards/${timeOfCursorOption.shardid}`
    const options = { headers: { project: projectName } }
    return utils.$fetch(url, options, params)
  }
  
  private requiredKey(key: string, callName: string): void {
    throw new Error(`param [${ui.color.red(key)}] is required on "${ui.color.green('shards.' + callName)}" method.`)
  }
}
