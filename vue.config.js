const routerMode = process.env.VUE_APP_ROUTER_MODE
/** 是否生产环境 */
const isProduction = process.env.NODE_ENV === 'production'

function getChainWebpack(config) {
  config.plugins.delete('preload')
  config.plugins.delete('prefetch')

  config.plugin('html').tap((args) => {
    args[0].minify = {
      removeComments: false,
      collapseWhitespace: false,
      removeAttributeQuotes: false,
    }
    args[0].hash = true
    args[0].inject = 'body'
    args[0].PACK_TIME = +new Date()
    return args
  })
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
  let res = ''
  if (isProduction) {
    if (process.env.VUE_APP_ASSETS_DIR) {
      res = '../../'
    } else {
      res = '../'
    }
  }

  return res.replace(/\/\//g, '/')
})()

/** 向scss传入通用方法 */
const scssAdditionalData = `
  /** 转换静态资源路径 */
  @function resolveScssStaticPath ($path) {
    $prefix: "${CSS_DIR}";
    @return $prefix + $path;
  }

  /** 像素适配通用方法 */
  @function pxToRem ($number) {
    @return $number / 100 + rem;
  }
`

module.exports = {
  devServer: {
    port: 1721,
    proxy: {
      '^/(prod-api|product|doc)': {
        target: 'http://111.9.55.211:30010',
        changeOrigin: true,
      },
    },
  },
  assetsDir: process.env.VUE_APP_ASSETS_DIR,
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
