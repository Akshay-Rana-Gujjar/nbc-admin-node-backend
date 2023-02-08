const { USER_COLLECTION } = require("../constants/database");
const { getDB } = require("./connect");

const getUserCollection = function(){
    const db = getDB();
    return db.collection(USER_COLLECTION);
}


async function addUser(userData){

    if(!userData) throw "User data required.";

    const db = getDB();

    return getUserCollection().insertOne(userData);

}

async function findUser(filter){

    if(!filter) throw "Filter is required.";

    return getUserCollection().find(filter).toArray();

}


module.exports = {
    addUser,
    findUser
}