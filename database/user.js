const { USER_COLLECTION } = require("../constants/database");
const { getDB } = require("./connect");

const getUserCollection = function(){
    const db = getDB();
    return db.collection(USER_COLLECTION);
}


function addUser(userData){

    if(!userData) throw "User data required.";
    return getUserCollection().insertOne(userData);

}

function findUser(filter = {}){
    return getUserCollection().find(filter).toArray();
}


module.exports = {
    addUser,
    findUser
}