import * as utils from '../utils/fetch'

export class Projects {
  
  constructor() {
  }
  
  async list(offset: number = 0, size: number = 500) {
    return utils.$fetch('/', {}, { offset, size })
  }
  
  async findOne(projectName: string) {
    const headers = { project: projectName }
    return utils.$fetch(`/`, { headers })
  }
  
  async create(projectName: string, description: string) {
    const options = {
      method: 'POST',
      body: { projectName, description },
    }
    return utils.$fetch('/', options)
  }
  
  async updateOne(projectName: string, description: string) {
    const options = {
      method: 'PUT',
      body: { projectName, description },
      headers: { project: projectName },
    }
    return utils.$fetch('/', options)
  }
  
  async destroyOne(projectName: string) {
    const options = {
      method: 'DELETE',
      headers: { project: projectName },
    }
    return utils.$fetch('/', options)
  }
}
