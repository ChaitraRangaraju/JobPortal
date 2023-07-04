import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';

const JobViewPage = () => {
    const [jobs, setJobs] = useState([]);
    const [jobsError, setJobsError] = useState('');

    const { JOBID }= useParams();

    const listJobs = async () => {
        try{
            const res = await fetch('http://localhost:8080/api/jobs/detail?jobId='+JOBID);
            if(res.status==200){
                const body= await res.json();
                console.log(body)

                if(body.job){
                    console.log(body.job)
                    setJobs(body.job);
                    setJobsError('');
                }
                else{
                    setJobsError("Error getting the Jobsdetails.")
                }

            }
            else{
                setJobsError("Error getting Jobsdetails.")
            }
        }
        catch(error){
            setJobsError("No Details found")
        }
    }

    const JobErrorDisplay = () => {
        return (<div>
            {jobsError}
        </div>);
    };

    const JobDetails = () => {
        
        return(
            <>
            {
                    <div class="newcontainer">
                        <p>Job Name : {jobs.jobName}</p>
                        <p>Job Description : {jobs.description}</p>
                        <p>Job Location : {jobs.Location}</p>
                        <p>Skillset Required : {jobs.skillset && jobs.skillset.toString()}</p>
                        <p>Qualification : {jobs.education}</p>
                        <p>Experience : {jobs.experiance}</p>
                        <p>Job Posted On : {jobs.jobPostedOn}</p><br></br>
                        <Link className='linkStyle' to={"/apply/"+jobs['_id']}>Apply</Link>
                    </div>
            }
            
            </>
        );

    }

    useEffect(() => {
        {listJobs()}
    },[])

    
    return(
        <>
        <div>
            {
                jobsError ? (
                <JobErrorDisplay />
                ) : (
                    <JobDetails/>
                )
             }

        </div>
        </>
    )

}

export default JobViewPage;