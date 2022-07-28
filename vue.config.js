const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {host: 'localhost',port: 8080 },
  //关闭eslint
  lintOnSave: false,
  //关闭map文件
  productionSourceMap: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
})
