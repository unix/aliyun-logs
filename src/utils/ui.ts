let isDebug = false

export const print = {
  log: (text: string) => console.log('\x1b[37m\%s \x1b[2m%s\x1b[0m', '>', text),
  danger: (text: string) => console.log('\x1b[31m\%s \x1b[31m%s\x1b[0m', '>', text),
  tip: (text: string) => console.log('\x1b[36m\%s \x1b[36m%s\x1b[0m', '>', text),
}

export const color = {
  red: (text: string) => `\x1b[31m${text}\x1b[31m\x1b[0m`,
  green: (text: string) => `\x1b[36m${text}\x1b[36m\x1b[0m`,
}

export const setDebug = (debug: boolean = false) => {
  isDebug = debug
}

export const debug = (log: any, params: any) => {
  if (!isDebug) return
  if (typeof params === 'object') {
    params = JSON.stringify(params, null, 2)
  }
  console.log('')
  print.log(`${log}${params}`)
}
