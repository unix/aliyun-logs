import * as ui from '../utils/ui'
import * as utils from '../utils/fetch'

export interface TaskQuery {
  shipperName: string,
  from: number,
  to: number,
  status?: string,
  offset?: number,
  size?: number,
}

export interface RetryTaskQuery {
  shipperName: string,
  taskids: string[],
}

export class Shippers {
  
  async findTasks(
    projectName: string,
    logstoreName: string = '',
    taskQuery: TaskQuery,
  ) {
    if (!projectName) this.requiredKey('projectName', 'findTasks')
    if (!logstoreName) this.requiredKey('logstoreName', 'findTasks')
    if (!taskQuery) this.requiredKey('taskQuery', 'findTasks')
  
    const url = `/logstores/${logstoreName}/shipper/${taskQuery.shipperName}/tasks`
    const options = { headers: { project: projectName } }
    const params: any = {
      from: ~~(taskQuery.from / 1000),
      to: ~~(taskQuery.to / 1000),
      offset: taskQuery.offset || 0,
      size: taskQuery.size || 100,
    }
    if (taskQuery.status) {
      params.status = taskQuery.status
    }
    return utils.$fetch(url, options, params)
  }
  
  async retryTasks(
    projectName: string,
    logstoreName: string = '',
    retryQuery: RetryTaskQuery,
  ) {
    if (!projectName) this.requiredKey('projectName', 'retryTasks')
    if (!logstoreName) this.requiredKey('logstoreName', 'retryTasks')
    if (!retryQuery) this.requiredKey('retryQuery', 'retryTasks')
    
    const url = `/logstores/${logstoreName}/shipper/${retryQuery.shipperName}/tasks`
    const options = {
      headers: { project: projectName },
      method: 'PUT',
      body: retryQuery.taskids,
    }
    return utils.$fetch(url, options)
  }
  
  private requiredKey(key: string, callName: string): void {
    throw new Error(`param [${ui.color.red(key)}] is required on "${ui.color.green('shippers.' + callName)}" method.`)
  }
}
