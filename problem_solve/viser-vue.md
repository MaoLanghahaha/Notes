**1、问题场景：** 
vue开发一个web网站项目使用了viser-vue，开发环境中无任何问题，但项目打包后本地（express）安装运行却报错。
**2、报错信息：**
> Uncaught TypeError: Cannot assign to read only property 'constructor' of object '#\<t>'

**3、报错原因：** 
初步判断是viser依赖的@antv/g2、@antv/g2-plugin-slider经webpack编译打包后会出现问题
**4、解决方案：**
> 使用第三方 CDN 分离部分组件，如 vue.config.js 下的 assetCDN 属性所配置（具体请自行查询网上 webpack 相关教程）
````js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    'viser-vue': 'ViserVue'
  },
  css: [],
  js: ['//unpkg.com/viser-vue/umd/viser-vue.min.js']
}
module.exports = defineConfig({
  configureWebpack: {
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },
})
````