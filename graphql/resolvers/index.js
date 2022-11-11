const  authResolver = require('./auth')
const recordResolver = require('./records')

const rootReseolver = {
    ...authResolver,
    ...recordResolver
}

module.exports = rootReseolver;