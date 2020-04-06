>  React 方形转盘抽奖
<p><code>git clone git@github.com:SimpleRoom/react-draw.git</code></p>
<p><code>npm install</code></p>
<p><code>npm run start</code></p>
<p><code>npm run build</code></p>

>  简介
+ 1、 [在线体验](https://jiucheng-front.github.io/demo/react/draw/)
+ 2、 默认使用: [create-react-app](https://github.com/facebook/create-react-app)
+ 3、 添加更改的配置:
  + 1、<code>package.json</code>内添加了<code>"homepage":"public"</code>作为静态本地服务器根目录，方便本地开发环境静态资源引用，打包时候会自动拷贝过去；
  + 2、<code>webpack.config.dev.js</code>和<code>webpack.config.prod.js</code>内都添加了<code>alias</code>配置，方便目录层级引用
  + 3、<code>webpack.config.dev.js</code>和<code>webpack.config.prod.js</code>内添加了<code>stylus</code>xx.mocule.styl类式xx.module.scss
+ 4、 本DEMO需要了解：[styled-component](https://github.com/styled-components/styled-components)、[ECMAScript 6](http://es6.ruanyifeng.com/)的部分语法
