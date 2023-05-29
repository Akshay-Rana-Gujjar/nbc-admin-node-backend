const { Client, Connection } = require("@elastic/elasticsearch");
const ELASTIC_URL = "http://elasticsearch:9200";

let esclient  = new Client({ node: ELASTIC_URL, Connection });

const index = "courses";
const type = "courses";

/**
 * @function checkConnection
 * @returns {Promise}
 * @description Checks if the client is connected to ElasticSearch
 */
function checkConnection() {
    return new Promise(async (resolve) => {
      console.log("Checking connection to ElasticSearch...");
      let isConnected = false;
      while (!isConnected) {
        try {
          
          await esclient.ping();
          console.log("Successfully connected to ElasticSearch");
          isConnected = true;
        // eslint-disable-next-line no-empty
        } catch (_) {
            // console.log(_)
        }
      }
      resolve(true);
    });
  }


module.exports = {
    esclient,
    checkConnection
}