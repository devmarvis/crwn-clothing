
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { 
    createUserDocFromAuth, 
    signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils"


const SignIn = () => {

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup();
        console.log(user);

        return await createUserDocFromAuth(user);  
    }

    
    return (
        <div>
            <h1>Sign In Page</h1>
            <button
            onClick={logGoogleUser}
            >
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn