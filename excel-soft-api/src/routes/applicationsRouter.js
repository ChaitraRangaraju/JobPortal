const express=require("express");

const jobService = require('../services/jobService');

const applicationsRouter = express.Router()

applicationsRouter.post('/add',async(req, res, next) => {
    const body = req.body;

    if(!body.username || !body.email || !body.phno ) {
        return res.status(400).json({
            error: "Entry full details"
        });
    }

    const applicationDetails = await jobService.addApplication(body);

    res.json({
        result: "Added new applications",
        applicationDetails
    })
 
});

module.exports = applicationsRouter;