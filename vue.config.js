const routerMode = process.env.VUE_APP_ROUTER_MODE
/** 是否生产环境 */
const isProduction = process.env.NODE_ENV === 'production'

function getChainWebpack(config) {
  config.plugins.delete('preload')
  config.plugins.delete('prefetch')
}

function gtPublicPath() {
  let path

  if (isProduction) {
    path = routerMode === 'history' ? process.env.VUE_APP_ROUTER_BASE : './'
  } else {
    path = '/'
  }

  return path
}

/** 项目静态资源相对路径前缀 */
const CSS_DIR = (function () {
  let res = './'
  if (isProduction) {
    if (process.env.VUE_APP_ASSETS_DIR) {
      res = '../../'
    } else {
      res = '../'
    }
  } else if (routerMode === 'history') {
    res = '/'
  }

  return res
})()

/** 向scss传入通用方法 */
const scssAdditionalData = `
  /** 转换静态资源路径 */
  @function resolveScssStaticPath ($path) {
    $prefix: "${CSS_DIR}";
    @return $prefix + $path;
  }
`

module.exports = {
  devServer: {
    port: 9425,
  },
  assetsDir: process.env.VUE_APP_ASSETS_DIR, // 这个路径如果改了，请注意修改 scss的resolveTsStaticPath
  outputDir: 'dist',
  lintOnSave: 'warning',
  filenameHashing: true,
  productionSourceMap: false,
  transpileDependencies: true,
  publicPath: gtPublicPath(),
  chainWebpack: getChainWebpack,
  css: {
    loaderOptions: {
      css: {
        // 不编译css中的url
        url: false,
      },
      scss: {
        // 向所以scss头部注入公共方法
        additionalData: scssAdditionalData,
      },
    },
  },
  configureWebpack: {
    // 左侧是import用的名字，右侧是库的全局变量
    externals: {},
  },
}
