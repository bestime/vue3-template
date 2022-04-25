module.exports = {
  // 换行长度，默认80
  printWidth: 120,

  // vscode编辑器没有这项，部分配置项，不生效
  overrides: [
    {
      "files": ".prettierrc.js",
    }
  ],

  // tab缩进大小,默认为2
  tabWidth: 2,

  // 使用tab缩进
  useTabs: false,

  // 每行末尾添加分号
  semi: false,

  // 字符串使用单引号
  singleQuote: true,

  htmlWhitespaceSensitivity: 'ignore',
  
  trailingComma: 'es5'
}
