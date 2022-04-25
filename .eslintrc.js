// typescript和eslint同一错误类型，取消ts错误提示
function ignoreTsRules (config) {
  for(let key in config) {
    config['@typescript-eslint/'+key] = 'off'
  }

  return config
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // 强制 cr
    "prettier/prettier": ["error", {
      "endOfLine": "lf"
    }],
    "no-explicit-any": "off",
    "vue/multi-word-component-names": "off", // 组件名必须由多个单词组成
    "vue/no-multiple-template-root": "off", // vue组件根模板多个节点
    ...ignoreTsRules({
      "no-console": "off", // 日志
      "no-unused-vars": "off", // 未使用的变量
      "new-cap": "error",// 构造对象首字母大写
      "eqeqeq": "error", // 全等于
      "no-sequences": "error", // 逗号操作符
      "no-undef": "error", // 禁用未声明的变量
      "no-use-before-define": "error", // 禁止在变量定义之前使用它们
      "no-debugger": "error", // 调试
      "no-func-assign": "error", // 禁止对 function 声明重新赋值
      "no-dupe-keys": "error", // 禁止对象字面量中出现重复的 key
      "no-await-in-loop": 'error', // 禁止在循环中出现 await
      "no-dupe-args": 'error', // 禁止 function 定义中出现重名参数
    })
  },
};
