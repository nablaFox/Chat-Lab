const logger = require('../../config/logger')

exports.care = async (callback, log = true) => {
    try {
        const data = await callback()
        return [data, null]
    } catch (err) {
        log && logger.error(err)
        return [null, err]
    }
}