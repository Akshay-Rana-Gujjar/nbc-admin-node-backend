const { COURSE_COLLECTION } = require("../constants/database");
const { getDB } = require("./connect");
const { addCourse : AddCourseToElastic } = require("../elastic/course");

const getCourseCollection = function(){
    const db = getDB();
    return db.collection(COURSE_COLLECTION);
}


function addCourse(courseData){

    if(!courseData) throw "Course data required.";
    const _courseData = Object.assign({}, courseData);
    AddCourseToElastic(_courseData);
    return getCourseCollection().insertOne(courseData);

}

function findCourse(filter = {}, limit = 50, offset=0){
    return getCourseCollection().find(filter).limit(limit).skip(offset * limit).toArray();
}


module.exports = {
    addCourse,
    findCourse
}