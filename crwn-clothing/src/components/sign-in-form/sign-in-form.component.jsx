import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createUserDocFromAuth, signInUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";


const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cred = await signInUserWithEmailAndPassword(email, password);
            // console.log(cred)

            setFormFields(defaultFormFields);
        } catch (error) {
            switch(error.code){
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break;
                default:
                    console.log(error);
            }
            // if(error.code === "auth/wrong-password") {
            //     alert('incorrect password for email');
            // } else if (error.c)
        }

    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                label="Email"
                required
                onChange={handleChange}
                value={email}
                name="email"
                />
                <FormInput
                label="Password"
                required
                onChange={handleChange}
                value={password}
                name="password"
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button 
                    onClick={signInWithGoogle}
                    type="button"
                    buttonType="google">Google sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;