import React, { useState } from 'react';
import {Link, Route, Routes} from 'react-router-dom'
import '../App.css';
import JobViewPage from './JobViewPage';

const JobListPage = () => {
    const [jobs, setJobs] = useState([]);
    const [jobsError, setJobsError] = useState('');

    const ListAlljobs = async () => {
        // call api
        try {

            const res = await fetch('http://localhost:8080/api/jobs/list');
            if (res.status == 200) {
                // good
                const body = await res.json();
                if (body.jobs) {
                    setJobs(body.jobs);
                    setJobsError('');
                }
                else {
                    // error jobs
                    setJobsError("Error in getting Jobs.")
                }
            }
            else {
                // bad
                setJobsError("Error getting Jobs List.")
            }
        } catch (error) {
            setJobsError("Could not get Jobs List.")
        }
    }


    const JobErrorDisplay = () => {
        return (<div>
            {jobsError}
        </div>);
    };

    const JobsListDisplay = () => {
        console.log("Job jsut display", jobs);
        return (
            <>
                {
                jobs.length ? jobs.map(job => (
                    <div className="container" >
                        <p className='jobstyle'>{job.jobName}</p>
                        <p className='jobstyle'>{job.description}</p>
                        <p className='jobstyle'>{job.Location}</p>
                        {/* <button>View</button> */}
                        <Link className='linkStyle1' to={"/job/"+job['_id']}>View</Link>
                    </div>
                    
                )) : (
                    <div className='listpage'>
                        Explore Job Roles
                        {/* No Jobs found, please refine your search */}
                        <button onClick={ListAlljobs}>View All Jobs</button>
                        <div>
                        <img className='imgstyle' src='https://finnet.co.in/wp-content/uploads/2021/01/logo-excel.jpg' width={380} height={350}></img>
                            <p className='excel1'>Redefining the Way People Learn</p>
                            <p className='excel'>Excelsoft Technologies, with operations in India, Malaysia, Singapore, the UK, and the USA is a provider of innovative technology-based solutions in the learning, assessments, and training management space catering to a diverse industry bases of School Education, Higher Education, Vocational Education, Corporate, Government, Defense and Educational Publishers.</p>
                            <p className='excel'>Our vision is to be recognized as a thought leader in technology who can comprehend, understand and develop world-class eLearning solutions. These solutions will be reliable, and capable of capturing the learner’s knowledge, skills and abilities.


Our mission is to provide the best eLearning solutions using state of the art technologies that help our customers deliver better, faster, and  cost-effective eLearning  solutions.
</p>
<p className='excel'>
Excelsoft’s expertise in creation and deployment of transformational eLearning solutions has served 100+ organizations, and used by over 30M+  end users worldwide.
</p>
                            
                        </div>
                        
                
                    </div>
                )
                
                }
            </>
        );
    }
    return (
        <>
        
        <div>
            <div  className='parentContainer'>
                {
                    jobsError ? (
                        <JobErrorDisplay />
                    ) : (
                        <div className='listing'>
                        <JobsListDisplay />
                        </div>
                    )
                }
            </div>
        </div>
        </>
    )
}

export default JobListPage;

