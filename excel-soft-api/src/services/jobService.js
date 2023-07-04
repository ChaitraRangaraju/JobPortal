const { ObjectId } = require('mongodb');
const db = require('../db/mongoDb');

async function getAllJobs() {
    const jobs = await db.jobs.find({});
    return jobs.toArray();
}

async function getJobDetails(jobId) {
    const job = await db.jobs.findOne({ "_id": ObjectId(jobId) })
    return job;
}

async function searchJobs({ q, location, minyoe, maxyoe, qualification, skills }) {
    // skills is array. what if it is not array?
    // check if skills is array, else discard.
    //const job = await db.jobs.findOne({avc:[{"jobName":q} , {"Location":location}, {"education":qualification},{"skillset":skills}]})
    const query = { '$or': [] };
    if(q) {
        query['$or'].push({jobName: q});
        query['$or'].push({description: q});
    }
    if(location) {
        query['$or'].push({Location: location});
    }
    if(qualification) {
        query['$or'].push({education: qualification});
    }
    console.log(query);
    const job = await db.jobs.findOne(query)
    return job;
}



function addJobs(body) {
    db.jobs.insertOne({
        "jobName": body.jobName,
        "description": body.description,
        "skillset": body.skillset,
        "education": body.education,
        "experiance": body.experiance,
        "jobPostedOn": Date(body.jobPostedOn),
        "Location": body.Location
    })

}

async function addApplication(body){
    const application = await db.applications.insertOne({
        "jobId":body.jobId,
        "jobName":body.jobName,
        "username": body.username,
        "email": body.email,
        "phno": body.phno,
        "dob": body.dob,
        "gender": body.gender,
        "school": body.school,
        "sslcmarks": body.sslcmarks,
        "college": body.college,
        "pumarks": body.pumarks,
        "graduation": body.graduation,
        "graduationMarks": body.graduationMarks,
        "postgraduation": body.postgraduation,
        "postgraduationMarks": body.postgraduationMarks,
        "experience": body.experience
      })

      return application;

}

module.exports = {
    getAllJobs,
    getJobDetails,
    searchJobs,
    addJobs,
    addApplication
}


/*

db.applications.insertOne({
  "username": "chai",
  "email": "chai@gmail.com",
  "phno": "9988776655",
  "dob": "01-01-2002",
  "gender": "F",
  "school": "xyz",
  "sslcmarks": "99",
  "college": "abc",
  "pumarks": "99",
  "graduation": "fff",
  "graduationMarks": "10",
  "postgraduation": "",
  "postgraduationMarks": "",
  "experience": "0"
})

*/