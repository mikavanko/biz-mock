module.exports = {
    devServer: {
        proxy: {
            "^/api": {
                target: 'https://biz-service-abalakin.eatmarket.ru',
            },
        },
    }
};