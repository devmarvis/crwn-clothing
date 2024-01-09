import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";


import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;


    // console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword ) return;

        try {
            const cred = await createAuthUserWithEmailAndPassword(email,
                password
                );
            const { user } = cred
            // console.log(user)

            await createUserDocFromAuth(user, { displayName });
            
            resetFormFields();
            
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert("Cannot create user, email already in use")
            }else {
                console.log("there was an error", error);
            }
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label="Display Name"
                required
                onChange = {handleChange}
                value={displayName}
                name='displayName'
                />
                <FormInput 
                label="Email"
                required
                onChange = {handleChange}
                value={email}
                name='email'
                />
                <FormInput 
                label="Password"
                required
                onChange = {handleChange}
                value={password}
                name='password'
                />
                <FormInput 
                label="Confirm Password"
                required
                onChange = {handleChange}
                value={confirmPassword}
                name='confirmPassword'
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;