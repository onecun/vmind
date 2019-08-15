module.exports = {
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}