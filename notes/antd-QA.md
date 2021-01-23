# Creat-react-app中使用方法

1. 在`App.css`中引入
    `@import '~antd/dist/antd.css';`


# Creat-react-app中使用less,和自定义主题 
>可以不用不通过eject react-scripts 修改webpack config

这个例子在实际开发中还有一些优化的空间，比如无法进行主题配置。  
此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 craco （一个对 create-react-app 进行自定义配置的社区解决方案）。  

现在我们安装 craco 并修改 package.json 里的 scripts 属性。

1. `$ yarn add @craco/craco`

2. 修改package.json的命令启动
```JS
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```
3. 然后在项目根目录创建一个 craco.config.js 用于修改默认配置。
```js
/* craco.config.js */
module.exports = {
  // ...
};
```
4.  src/App.css 文件修改为 src/App.less，然后修改样式引用为 less 文件。

```js
/* src/App.js */
- import './App.css';
+ import './App.less';
/* src/App.less */
- @import '~antd/dist/antd.css';
+ @import '~antd/dist/antd.less';
```
然后安装 `craco-less` 并修改 `craco.config.js` 文件如下。

`$ yarn add craco-less`
```js
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

# 暗黑主题颜色设置
是在样式文件全量引入 antd.dark.less 或 antd.compact.less。

@import '~antd/dist/antd.dark.less'; // 引入官方提供的暗色 less 样式入口文件
@import '~antd/dist/antd.compact.less'; // 引入官方提供的紧凑 less 样式入口文件