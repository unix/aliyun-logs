import * as ui from '../utils/ui'
import * as utils from '../utils/fetch'

export interface FieldIndexValue {
  type: string,
  alias?: string,
  chn?: boolean,
  token?: string[],
  caseSensitive?: boolean,
  doc_value?: boolean,
}

export interface FieldIndex {
  [key: string]: FieldIndexValue
}

export interface LineIndex {
  token: string[],
  caseSensitive?: boolean,
  chn?: boolean,
  include_keys?: string[],
  exclude_keys?: string[],
}

export interface IndexsCreateOption {
  keys: FieldIndex,
  line: LineIndex,
}

export class Indexs {
  
  async create(
    projectName: string,
    logstoreName: string,
    indexEntity: IndexsCreateOption,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'create')
    if (!logstoreName) this.requiredKey('logstoreName', 'create')
    if (!indexEntity) this.requiredKey('entity', 'create')
  
    if (!indexEntity.line && !indexEntity.keys) {
      throw new Error('param "line" and "keys" need to specify at least one')
    }
  
    const options = {
      headers: { project: projectName },
      method: 'POST',
      body: indexEntity,
    }
    return utils.$fetch(`/logstores/${logstoreName}/index`, options)
  }
  
  async update(
    projectName: string,
    logstoreName: string,
    indexEntity: IndexsCreateOption,
  ): Promise<any> {
    return this.create(projectName, logstoreName, indexEntity)
  }
  
  async destroy(
    projectName: string,
    logstoreName: string,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'destroy')
    if (!logstoreName) this.requiredKey('logstoreName', 'destroy')
  
    const options = {
      headers: { project: projectName },
      method: 'DELETE',
    }
    return utils.$fetch(`/logstores/${logstoreName}/index`, options)
  }
  
  async findAll(
    projectName: string,
    logstoreName: string,
  ): Promise<any> {
    if (!projectName) this.requiredKey('projectName', 'destroy')
    if (!logstoreName) this.requiredKey('logstoreName', 'destroy')
  
    const options = {
      headers: { project: projectName },
    }
    return utils.$fetch(`/logstores/${logstoreName}/index`, options)
  }
  
  private requiredKey(key: string, callName: string): void {
    throw new Error(`param [${ui.color.red(key)}] is required on "${ui.color.green('Indexs.' + callName)}" method.`)
  }
  
}
