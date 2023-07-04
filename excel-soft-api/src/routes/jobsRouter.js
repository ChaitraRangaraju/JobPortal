const express=require("express");

const jobService = require('../services/jobService');

const jobsRouter = express.Router()

// http://servername/api/jobs/list
// http://servername/api/jobs/detail?jobid=123
// http://servername/api/jobs/search?q=software%20engineer%203&location=mysore&yoe=4

jobsRouter.get('/list', async (req, res, next) => {
    const jobs = await jobService.getAllJobs();
    res.json({
        jobs
    });
});

jobsRouter.get('/detail', async (req, res, next) => {
    const { jobId } = req.query;
    if(!jobId) {
        return res.status(400).json({
            error: "Job Id not found"
        });
    }

    try{
    const job = await jobService.getJobDetails(jobId);
    // if(job.minyoe || job.maxyoe) {
    //     if(job.minyoe && job.maxyoe) {
    //         job.yearsOfExperience = job.minyoe+'-'+job.maxyoe+' years'; 
    //     }
    //     else if(job.minyoe) {
    //         job.yearsOfExperience = job.minyoe+'+'+' years'; 
    //     }
    //     else if(job.maxyoe) {
    //         job.yearsOfExperience = '<'+job.maxyoe+' years'; 
    //     }
    // }

    return res.status(200).json({
        job
    });
}
catch(e){
    return res.status(400).json({
        error:e
    })
}
});

jobsRouter.get('/search',async(req, res, next) => {

const { q, location, minyoe, maxyoe,qualification, skills } = req.query;

   /* res.json({
        jobs: [],
        requstedParams: {
            q,
            location,
            //minyoe,
            //maxyoe,
            //skills
        }
    })*/

    const job = await jobService.searchJobs({q,location, minyoe, maxyoe,qualification, skills});
    return res.json({
        job
    });
    
});

jobsRouter.post('/add',async(req, res, next) => {
    const body = req.body;

    if(!body.jobName || !body.description || !body.skillset || !body.education || !body.experiance || !body.jobPostedOn || !body.Location) {
        return res.status(400).json({
            error: "Entry full details"
        });
    }

    res.json({
        result: "Added new job",
        jobDetails: {
            body
        }
    })

    await jobService.addJobs(body);
    
});

jobsRouter.get('/job-details-options',()=>{})


module.exports = jobsRouter;