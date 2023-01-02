const cssnano = require('cssnano')

module.exports = {
    plugins: [
        cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                },
                discardEmpty: true,
                discardOverriden: true,
                discardDuplicates: true
            }]
        })
    ]
}

