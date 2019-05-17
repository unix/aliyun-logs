import * as methods from './methods'
import * as fetch from './utils/fetch'
import * as ui from './utils/ui'

export interface AliyunLogOption {
  accessKey: string,
  secret: string,
  endpoint: string,
  stsToken?: string,
  debug?: boolean,
}

export class AliyunLog {
  
  projects = new methods.Projects()
  logstores = new methods.Logstores()
  shards = new methods.Shards()
  shippers = new methods.Shippers()
  indexs = new methods.Indexs()
  
  static ProtoEntity = methods.ProtoEntity
  
  constructor(
    private options: AliyunLogOption
  ) {
    this.init()
  }
  
  init() {
    ui.setDebug(this.options.debug)
    fetch.setFixedHeaders({
      accessKey: this.options.accessKey,
      secret: this.options.secret,
      endpoint: this.options.endpoint,
      stsToken: this.options.stsToken || '',
    })
  }
  
}
