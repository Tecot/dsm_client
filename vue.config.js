/*
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-12-24 10:06:01
 * @Description: 
 */
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (conf) => {
    conf.plugin('html').tap((args) => {
        args[0].title = 'Marine Metagenome Database'
        return args
    })
  },
  devServer: {
    proxy: {
      '/api': {
	target: 'http://127.0.0.1:8173/',
        changeOrigin: true, 
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
