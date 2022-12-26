const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
    plugins: [
        'postcss-preset-env',
        purgecss({
            content:  ['./dist/**/*.html', './src/**/*.vue', './src/**/*.js']
        }),
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

