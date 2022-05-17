### 项目介绍
- 这是一个基于`vue2`的通用项目`模板`
- 项目文件结束符使用 `LF`，如果是 `CRLF`，请自行配置编辑器、git等工具
- 路由`history`模式默认配置在服务器下`/app`文件夹下，可修改 `~/.env.production` 文件中`VUE_APP_ROUTER_BASE`为根目录 `"/"` 或其它目录（不可为空）。
- 代码风格检测使用`eslint+prettier`（编辑器插件自行配置，读取本项目的配置文件）
- 此项目可`js与ts`混用。
- 技术栈：`vue`、`vue-router`、`scss`、`js`、`typescript`、`eslint`、`prettier`

### 目录结构

```
├── dist # 编译打包后的项目文件
│ ├── compile # 打包后通过webpack编译的资源
│ ├── static # 打包后通过webpack复制的静态资源
│ ├── favicon.ico # 应用icon
│ └── index.html # 应用入口
├── public 项目静态资源
│ ├── static # 开发时静态资源
│ ├──────├── css
│ ├──────├── font
│ ├──────├── images
│ ├──────└── js
│ ├── favicon.ico # 应用icon
│ └── index.html # 应用入口模板文件
├── src 项目资源
│ ├── base # 公共组件
│ ├── router # 路由配置
│ ├── utils # 工具库
│ ├── views # 路由视图文件
│ ├── App.vue # 项目入口页面
│ ├── main.ts # 项目入口程序
│ └── shims-vue.d # vue 针对ts的声明文件
├── .env.production # vue发布环境配置
├── .env.development # vue开发环境配置
├── vue.config.js # 项目配置文件
├── package.json # 项目依赖
├── tsconfig.json # 编辑器配置
├── .editorconfig # 编辑器配置
├── .eslintignore # eslint 检查忽略文件
├── .gitignore # git 忽略文件
├── .prettierignore # prettier 忽略文件
├── .prettierrc.js # 代码风格检查配置文件
└── README.md # 项目说明文档
```


### 注意事项（不要写不易追踪的代码）

- 所有方法、变量、css都要有明确的来源
  ```javascript
  import "./index.css"
  import { add } from "./utils"
  import api from "api"
  ```
- 不建议使用第三方样式库（element-ui、antd等项目基础UI框架可以使用）。如 `tailwind.css`、`reset.css` 等等
- 不建议使用`vue二次封`装后的库，可以在项目中自行封装。它们本生就是一个成俗的库，使用`vue版本`的操作复杂度并没有减少，并且可能跟不上版本。比如：`vue-awesome-swiper`、`vue-echarts`、`vue2-maptalks` 等等。如果一定要使用，请`按需引入`，不要全局注册这些组件，不然不熟悉这些库的开发人员来维护代码，根本不知道这个组件来自于那个库，比如`<mt-wms-layer></mt-wms-layer>`你可能不知道这个组件从哪儿冒出来的。
- 不建议使用郊区库、插件（没怎么听过的）。能自己写就自己写
- 不建议使用`mixin`。（如果用：请把变量名取复杂一点）
- 不建议使用`vuex` 。（如果用：请把变量名取复杂一点）
- 不建议使用 `provide` 和 `injecet`。 （如果用：请把方法名取复杂一点）
- 不建议挂载全局原型链 `Vue.prototype = xxxx`
- 体积大且成熟的库，建议使用cdn方式引入。如：swiper、echart、jquery等等，不需要npm包，可自定义方法动态加载。
- api请求时，建议使用完整路径，避免变量拼接，方便定位代码。如：`url="/api/work/list"`。不建议封装太深然后这样调用`await api().work.list()`
- 模块导出：为了项目体积优化，零散的模块不建议封装到一个大类里面
  ```javascript
  // [√]
  export function B () {}

  // [√]
  export function C () {}

  // [√]
  export default function A () {}

  // [×] 非完整库不建议用es6的class写法
  export default class Test {
    // ...
  }
  
  // [×] 不建议整个对象导出不常用的模块
  export default {
    A: function () {},
    B: function () {},
    C: function () {}
  }
  ```
- 组件使用：文件名、组件名、注册components名，保持一致
  ```html
  <!--
    my-box.vue 可以
    myBox.vue 不行
  -->
  <my-box></my-box>

  <!--
    headerWrapper.vue 可以
    header-wrapper.vue 不可以
  -->
  <headerWrapper></headerWrapper>
  ```


- 不建议使用`全局样式`，避免和其它库冲突
  ```css
  h1 {
    font-size: 30px;
  }
  ```

- 不建议使用全局 `eventBus` 进行跨组件的事件`订阅发布`。父子组件可用：
  ```vue
  // 子组件
  this.$emit('on-change')
  // 父组件
  <my-view @on-change="onChange"></my-view>
  ```

- 不建议将图片、测试json 放在`src`目录里。建议放在`public`静态目录里，因为public文件夹里的内容，不被webpack编译。不然随着项目增大，开发时越来越卡。项目内置scss全局方法`resolveTsStaticPath(按需)`和js方法`resolveScssStaticPath(内置)`用于链接转换
  ```vue
  <template>
    <img :src="resolveTsStaticPath('/static/images/loc.jpg')" style="height: 40px" />
  </template>

  <script>
  import { resolveTsStaticPath } from '@/utils/common'
  export default {
    methods: {
      resolveTsStaticPath
    }
  }
  </script>

  <style scoped lang="scss">
    div {
      background: url(resolveScssStaticPath('/static/images/leida02.png'));
    }
  </style>
  ```

### 代码提交
- 提交代码前，需要处理代码中不规范的地方。可以使用以下命令进行快捷修复，部分错误需要自己手动修复
  ```
  npm run lint
  ```
- 代码不规范`git commit`时会抛出错误，导致提交失败
- 如果确定自己的代码没有问题，但是依旧提示错误，请删除`node_modules/.cache`文件夹后重启项目试试