
const cds = require('@sap/cds')

module.exports = async srv => { // called by server.js

    const { Books } = srv.entities

    srv.before('READ', Books, async req => {

        console.log(req.http.req.headers)
        console.log(req.headers) // <-- find header here, if called from function callBooksWithHeader

    })

    srv.on('callBooksWithHeader', async req => {
        // https://cap.cloud.sap/docs/node.js/core-services#srv-send-request

        const result = await srv.send({
            query: SELECT.from(Books),
            headers: { some: 'header' }
        })

        return result

    })

}