const {app} = require('./src/app')

const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

module.exports = {startServer};