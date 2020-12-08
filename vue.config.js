module.exports = {
    devServer: {
        proxy: {
            "^/api": {
                target: 'https://biz-service-stage.eatmarket.ru',
            },
        },
    }
};