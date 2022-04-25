/** 获取本地资源目录 */
export function resolveRelativeDir() {
  let prefix = './'

  if (process.env.VUE_APP_ROUTER_MODE === 'history') {
    prefix = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ROUTER_BASE : '/'
  }

  prefix += '/'

  return prefix.replace(/\/\//g, '/')
}

/** 静态资源目录 */
export const RELATIVE_DIR = resolveRelativeDir()

export function resolveTsStaticPath(url: string): string {
  return RELATIVE_DIR + url
}
