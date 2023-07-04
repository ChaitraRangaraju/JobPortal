import { useState, useEffect } from "react";
import { Link,useParams } from 'react-router-dom';


const Application = () => {

    const initialValues = { username: "", email: "", phno: "",dob:"",gender:"",school:"",sslcmarks:"" ,college:"" ,pumarks:"",graduation:"",graduationMarks:"",postgraduation:"",postgraduationMarks:"",experience:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { JOBID }= useParams();
    const [jobs, setJobs] = useState([]);
    const [jobsError, setJobsError] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const getJobDetail = async () => {
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
                setJobsError("Error getting Requested Job.")
            }
        }
        catch(error){
            setJobsError("No Details found")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const valid=validate(formValues)
        setFormErrors(valid);
        setIsSubmit(true);
        if(Object.keys(valid).length == 0 && jobs && jobs.jobName ){
            saveApplication();
        }

    };


    const saveApplication = async () => {
        // call api
        
        try {

            setSuccess('');
            setError('');
            const res = await fetch('http://localhost:8080/api/applications/add',{
                method: "POST",
                body: JSON.stringify({
                    ...formValues,
                    jobId:JOBID,
                    jobName:jobs.jobName
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
            });
            if (res.status == 200) {
                // good
                const body = await res.json();
                if (body.applicationDetails && body.applicationDetails.insertedId) {
                    setSuccess("Successfully submitted application with ID : " + body.applicationDetails.insertedId);
                }
                else {
                    // error jobs
                    setError("Error.")
                    
                }
            }
            else {
                // bad
                setError("Error.")
            }
        } catch (error) {
            setError("Could not set.")
        }
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.phno) {
            errors.phno = "Phone number is required";
        } 
        if (!values.gender) {
            errors.gender = "gender is required!";
        }
        if (!values.school) {
            errors.school = "School Name is required";
        } 
        if (!values.sslcmarks) {
            errors.sslcmarks = "SSLC Marks is required";
        } 
        if (!values.college) {
            errors.college = "12th college Name is required";
        } 
        if (!values.pumarks) {
            errors.pumarks = "12th marks is required";
        } 
        if (!values.graduation) {
            errors.graduation = "University Name is required";
        } 
        if (!values.graduationMarks) {
            errors.graduationMarks = "Graduation results is required";
        } 
        /*if (!values.postgraduation) {
            errors.postgraduation = "Post Graduation university Name is required";
        } 
        if (!values.postgraduationMarks) {
            errors.postgraduationMarks = "Post Graduation results is required";
        } */
        return errors;
    };
    
    useEffect(()=>{
        getJobDetail()
    },[])

    return(
        <div id="applyform">
           {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div>Applied successfully</div>
            ) : (
                // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}*/}

            <form onSubmit={handleSubmit}>
                <h3 className="hh3">Apply for Job: {/*{JOBID}*/} 
                    {
                        jobs && jobs.jobName 
                    }
                    {
                        jobsError
                    }</h3>
                {/*<div>
                    {
                        jobs && jobs.jobName && <p>{jobs.jobName}</p>
                    }
                    {
                        jobsError && <p>{jobsError}</p>
                    }
                    
                </div>*/}
                <div>
                    <div>
                        <label>Name *</label><br></br>
                        <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange}/>
                    </div>
                    <p className="ptag">{formErrors.username}</p>
                    <div>
                        <label>Email *</label><br></br>
                        <input type="text" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
                    </div>
                    <p className="ptag">{formErrors.email}</p>
                    <div>
                        <label>Phone Number *</label><br></br>
                        <input type="text" name="phno" placeholder="Phone Number" value={formValues.phno} onChange={handleChange}/>
                    </div>
                    <p className="ptag">{formErrors.phno}</p>
                    <div>
                        <label>Date of Birth *</label><br></br>
                        <input type="date" name="dob" value={formValues.dob} onChange={handleChange}  />
                    </div>
                    <br></br>
                    <div>
                        <label>Gender *</label><br></br>
                        <input type="text" name="gender" placeholder="gender" value={formValues.gender} onChange={handleChange} />
                    </div>
                    <p className="ptag">{formErrors.gender}</p>
                    <div>
                        <label>10th school *</label><br></br>
                        <input type="text" name="school" placeholder="school" value={formValues.school} onChange={handleChange} />
                    </div>
                    <p className="ptag">{formErrors.school}</p>
                    <div>
                        <label>10th Percentage *</label><br></br>
                        <input type="text" name="sslcmarks" placeholder="sslcmarks"   value={formValues.sslcmarks} onChange={handleChange} />
                    </div>
                    <p className="ptag">{formErrors.sslcmarks}</p>
                    <div>
                        <label>12th college *</label><br></br>
                        <input type="text" name="college" placeholder="college"  value={formValues.college} onChange={handleChange}/>
                    </div>
                    <p className="ptag">{formErrors.college}</p>
                    <div>
                        <label>12th Percentage *</label><br></br>
                        <input type="text" name="pumarks" placeholder="pumarks"  value={formValues.pumarks} onChange={handleChange} />
                    </div>
                    <p className="ptag">{formErrors.pumarks}</p>
                    <div>
                        <label>Graduation *</label><br></br>
                        <input type="text" name="graduation" placeholder="graduation" value={formValues.graduation} onChange={handleChange} />
                    </div>
                    <p className="ptag">{formErrors.graduation}</p>
                    <div>
                        <label>Graduation Results *</label><br></br>
                        <input type="text" name="graduationMarks" placeholder="graduationMarks"  value={formValues.graduationMarks} onChange={handleChange} />
                    </div>
                    <p className="ptag">{formErrors.graduationMarks}</p>
                    <div>
                        <label>Post Graduation(if any)</label><br></br>
                        <input type="text" name="postgraduation" placeholder="postgraduation" value={formValues.postgraduation} onChange={handleChange} />
                    </div>
                    <p className="ptag"></p>
                    <div>
                        <label>Post Graduation Results</label><br></br>
                        <input type="text" name="postgraduationMarks" placeholder="postgraduationMarks"  value={formValues.postgraduationMarks} onChange={handleChange}  />
                    </div>
                    <p className="ptag"></p>
                    <div>
                        <label>Year of Work Experience</label><br></br>
                        <input type="text" name="experience" placeholder="experience" value={formValues.experience} onChange={handleChange} />
                    </div>
                    <br></br>
                    <button id="btn">Submit</button>
                </div>
            </form>
            <div>
                {
                    error && <p style={{color:"red"}}>{error}</p>
                }
                {
                    success && <p  style={{color:"green"}}>{success}</p>
                }
                
            </div>
        </div>
    )
}

export default Application;