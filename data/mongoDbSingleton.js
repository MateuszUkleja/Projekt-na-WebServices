const mongo = require("mongodb")
const MongoClient = mongo.MongoClient

module.exports = (function () {
    const url = "mongodb://127.0.0.1:27017"
    let client
    let db
    let colection

    function getInstance() {
        return new Promise(async function (resolve, reject) {
            if (client) {
                return resolve(client)
            }
            try {
                client = await new MongoClient(url)
                await client.connect()

                db = client.db("footballMatches")
                colection = db.collection("Matches")

                return resolve(client)
            } catch (error) {
                console.log(error);
                return reject(error)
            }
        })
    }

    async function getDb() {
        if (!db) {
            await getInstance()
        }
        return db
    }
    async function getCollection() {
        if (!colection) {
            await getInstance()
        }
        return colection
    }

    return {
        getInstance,
        getDb,
        getCollection
    }
})()