const {esclient, checkConnection} = require("./connect");

export async function addUser(userData){
    if(await checkConnection())
        esclient.index({
            index: "user",
            type: "document",
            body: userData
        });
}