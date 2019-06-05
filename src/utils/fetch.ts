import zeitFetch, { FetchOptions, Response } from '@zeit/fetch'
import nodeFetch from 'node-fetch'
import { createHmac, createHash } from 'crypto'
import { Request } from 'node-fetch'
import { sortHeaders, formatResource } from './helper'
import * as ui from './ui'

const fetch = zeitFetch(nodeFetch)
export interface HeaderCache {
  accessKey: string,
  secret: string,
  endpoint: string,
  stsToken?: string,
}
let cache: HeaderCache = {
  accessKey: undefined,
  secret: undefined,
  endpoint: undefined,
  stsToken: undefined,
}

const setApiDomain = (input: string | Request, query: object): string | Request => {
  const fullQuery = Object.keys(query).reduce((pre, current) => {
    const prefix = pre !== '?' ? `${pre}&` : pre
    return `${prefix}${current}=${query[current]}`
  }, '?')
  if (typeof input === 'string') {
    input = `http://${cache.endpoint}${input}`
    input = input.replace(/([^:])[\/\\\\]{2,}/, '$1/')
    input = `${input}${fullQuery}`
  } else {
    input.url = `${cache.endpoint}${input.url}`
    input.url = input.url.replace(/([^:])[\/\\\\]{2,}/, '$1/')
    input.url = `http://${input.url}${fullQuery}`
  }
  return input
}

const responseParser = (response: Response) => {
  const contentType = response.headers.get('content-type')
  const contentLength = response.headers.get('content-length')
  if (contentLength === '0') return Promise.resolve({})
  
  const key = /\bjson\b/.test(contentType) ? 'json'
    : /\btext\b/.test(contentType) ? 'text' : 'blob'
  
  const parse = response[key]()
  if (response.status === 403 || response.status === 401) return ui.print.danger('Authentication failure.')
  if (response.status === 500) {
    return parse.then(err => {
      return ui.print.danger((err && err.message) || 'Server error, wait for a second try.')
    })
  }
  
  if (response.ok) return parse
  return parse.then(err => Promise.reject(err))
}

export const setFixedHeaders = (headers: HeaderCache) => {
  cache = headers
}

const makeAuthorization = (
  method: string, resource: string, params: object, headers: object,
) => {
  const contentMD5 = headers['Content-MD5'] || ''
  const contentType = headers['Content-Type'] || ''
  const content = `${method}\n${contentMD5}\n${contentType}\n${headers['Date']}` +
  `\n${sortHeaders(headers)}${formatResource(resource, params)}`
  
  return createHmac('sha1', cache.secret)
    .update(content)
    .digest('base64')
}

export const updateOptions = (resource: string, options: FetchOptions, params: object) => {
  const customHeader = options.headers as any || {}
  const projectName = customHeader.project ? `${customHeader.project}.` : ''
  const headers = {
    'Host': `${projectName}${cache.endpoint}`,
    'Content-Type': '',
    'Content-Length': '0',
    'x-log-bodyrawsize': '0',
    'User-Agent': 'aliyun-logs-sdk',
    'x-log-apiversion': '0.6.0',
    'x-log-signaturemethod': 'hmac-sha1',
    'Date': new Date().toUTCString(),
  }
  const emptyBody = !options.body || Object.keys(options.body).length === 0
  if (!emptyBody) {
    const isBufferContent = Buffer.isBuffer(options.body)
    const strBody = isBufferContent ? options.body
      : typeof options.body === 'object' ? JSON.stringify(options.body) : options.body
    options.body = strBody as string
    headers['Content-Type'] = customHeader['Content-Type'] || 'application/json'
    headers['Content-MD5'] =  `${createHash('md5').update(options.body).digest('hex')}`.toUpperCase()
    headers['Content-Length'] = `${options.body.length}`
  
    if (isBufferContent) {
      headers['Content-Type'] = 'application/x-protobuf'
    }
  }
  
  if (customHeader['Accept-Encoding']) {
    headers['Accept-Encoding'] = customHeader['Accept-Encoding']
  }
  
  if (customHeader['Accept']) {
    headers['Accept'] = customHeader['Accept']
  }
  
  if (cache.stsToken && cache.stsToken !== '') {
    headers['x-acs-security-token'] = cache.stsToken
  }
  
  options.method = options.method || 'GET'
  const signature = makeAuthorization(options.method, resource, params, headers)
  headers['Authorization'] = `LOG ${cache.accessKey}:${signature}`
  options.headers = headers
  ui.debug(`request options: \n`, options)
  
  return options
}

export const $fetch = async (
  path: string,
  options: FetchOptions | object,
  params: object = {},
): Promise<any> => {
  const resource = path && path !== '' ? path : '/'
  const nextInput = setApiDomain(resource, params)
  const nextOptions = updateOptions(resource, options, params)
  let responseHeaders = {}
  return fetch(nextInput, nextOptions)
    .then(res => {
      responseHeaders = res.headers
      ui.debug(`response headers: \n`, res.headers)
      return responseParser(res)
    })
    .then(res => {
      Object.defineProperty(res, '_headers', {
        get: () => responseHeaders,
      })
      ui.debug(`response body: \n`, res)
      return res
    })
}
