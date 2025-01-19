const MongoSingleton = require("../data/mongoDbSingleton")


function saveAll(matches) {
    return new Promise(async (resolve, rejects) => {
        const collection = await MongoSingletonongoSingleton.getCollection()
        const result = await collection.insertMany(matches)

        if (result.insertedCount) {
            resolve(result)
        } else {
            rejects("Couldn't save matches")
        }
    })
}

function getAll(){
    return new Promise(async (resolve, rejects)=>{
        const collection = await MongoSingleton.getCollection()
        const cursor = collection.find()
        const results = await cursor.toArray()

        if(results.lenght > 0){
            resolve(results)
        }else{
            rejects("Can't get all matches")
        }
    })
}

function getbyTeam1(team1){
    return new Promise(async (resolve, rejects)=>{
        const colection = await MongoSingleton.getCollection()
        const result = await colection.find({team1})

        if(result){
            resolve(result)
        }else{
            rejects("Can't get matches by name Team:" + team1)
        }
    })
}

module.exports = {
    getAll,
    getbyTeam1,
    saveAll
}