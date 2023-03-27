module.exports = {
    devServer: {
        port: 8081,
        proxy: { // 配置跨域
            '/users':{
                target:`http://localhost:3000`, //请求后台接口
                changeOrigin:true, // 允许跨域
                logLevel:'debug'
            }
        },
    }
}