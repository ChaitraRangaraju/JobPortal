import { useState, useEffect } from "react";

const Login = () => {

    const initialValues = { username: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

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
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };
    
    return(
        <div>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div>Signed in successfully</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
                <h3>Login Form</h3>
                <div></div>
                <div>
                    <div>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange}/>
                    </div>
                    <p>{formErrors.username}</p>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" value={formValues.email} onChange={handleChange}/>
                    </div>
                    <p>{formErrors.email}</p>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
                    </div>
                    <p>{formErrors.password}</p>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;