const {MongoClient} = require("mongodb");
const { DATABASE_URI, DABATABASE_NAME } = require("../constants/database");
const uri = DATABASE_URI;
const client = new MongoClient(uri);

let DB = null;

async function initMongo() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      DB = client.db(DABATABASE_NAME);
      
      console.log("Connected successfully to server");
    }catch(err){
        throw err;
    }
}

function getDB(){
    return DB;
}

function closeMongo(){
    return client.close()
}


module.exports =  {
    initMongo,
    getDB,
    closeMongo
}