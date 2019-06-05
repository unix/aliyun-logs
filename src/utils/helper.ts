import { join } from 'path'
import proto from 'protobufjs'
const builder = proto.loadSync(join(__dirname, 'sls.proto')).lookupType('log.LogGroup')

export const sortHeaders = (headers: object) => {
  return Object.keys(headers)
    .filter(item => /^(x-acs-|x-log-)/.test(item))
    .map(item => item.toLowerCase())
    .sort()
    .reduce((pre, current) => {
      const val = `${headers[current]}`.trim()
      return `${pre}${current}:${val}\n`
    }, '')
}


export const formatResource = (resource: string, params: any = {}) => {
  const keys = Object.keys(params).sort()
  if (!keys.length) return resource
  
  const query = keys.reduce((pre, current) => {
    if (!pre) return `${current}=${params[current]}`
    return `${pre}&${current}=${params[current]}`
  }, '')
  
  return `${resource}?${query}`
}

export const validateProtoLog = (logGroup: any | any[]) => {
  if (!logGroup.logs) {
    throw new Error('log param must include "logs"')
  }
  
  const logs = Array.isArray(logGroup.logs) ? logGroup.logs : [logGroup.logs]
  const notProto = logs.find(item => !item.isProto)
  if (notProto) {
    throw new Error('"logs" must be a "LogProto" type')
  }
  
  const nextLogs = logs.map(item => ({
    time: (item.timestamp || Date.now()) / 1000,
    contents: item.contents,
  }))
  
  return Object.assign({}, logGroup, {
    logs: nextLogs,
  })
}

export const formatLog = (log: any) => {
  return builder.encode(log).finish()
}

export const validateIndexLine = (line: any) => {
  if (line.include_keys && line.exclude_keys) {
    throw new Error('"include_keys" and "exclude_keys" specify at most one')
  }
  return line
}

export const validateIndexKeys = (keys: any) => {
  if (typeof keys !== 'object') {
    throw new Error('param "IndexEntity.keys" must be an object.')
  }
  
  const notPass = Object.keys(keys).find(item => typeof item !== 'object')
  if (notPass) {
    throw new Error(`param "IndexEntity.keys.${notPass}" must be an object.`)
  }
  
  return keys
}

