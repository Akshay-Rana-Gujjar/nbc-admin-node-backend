const { esclient, checkConnection } = require("./connect");

module.exports = {
  addCourse: async function addCourse(courseData) {
    if (await checkConnection())
      esclient.index({
        index: "course",
        type: "document",
        body: courseData,
      });
  },
  searchCourse: async function(queryText){
    if (await checkConnection()){
        return esclient.search({
            index: "course",
            type: "document",
            body: {
                query: {
                    multi_match: {
                        // simple_query_string: {
                        query: queryText,
                        fields: [
                            "courseTitle",
                            "courseDescription"
                        ]
                      }
                },
                highlight: {
                    "pre_tags" : ["<b>"],
                    "post_tags" : ["</b>"],
                    "fields" : {
                      "courseTitle" : {}
                    }
                  },
            },

        })
    }
  }
};
