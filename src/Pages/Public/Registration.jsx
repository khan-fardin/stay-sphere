import React, { use, useState } from 'react';
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router';
import registerAnime from '../../assets/registrationAnimation.json'
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Provider/AuthProvider';
import { MdOutlineNearbyError } from 'react-icons/md';
import { Bounce, toast } from 'react-toastify';
import { GoogleAuthProvider } from 'firebase/auth';

const Registration = () => {

    const { registerUser, updateUser, setUser, signInWithGoogle } = use(AuthContext);
    const [passError, setPassError] = useState('');
    const [confirmPassError, setConfirmPassError] = useState('');
    const navigate = useNavigate();

    const handleRegisterBtn = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const { name, email, password, confirmPassword, photoURL } = data;

        // ensure all fields are fill up, valid pass and confirm pass 
        if (!name || !email || !password || !confirmPassword || !photoURL) {
            return toast.error("All fields are required");
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return setPassError('Password must have 1 uppercase, 1 lowercase & be 6+ characters');
        }
        if (password !== confirmPassword) {
            return setConfirmPassError("Passwords do not match");
        }

        // sign up logic
        registerUser(email, password)
            .then(result => {
                const user = result.user
                toast.success(`Registered as ${name}`, {
                    position: "bottom-center",
                    autoClose: 1500,
                    transition: Bounce,
                });
                updateUser({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photoURL });
                        navigate("/");
                    })
                    .catch((error) => {
                        // console.log(error);
                        setUser(user);
                    });
            })
            .catch(error => {
                toast.error(error.message || "Signup failed");
            });
    };

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // If valid, show success toast
                toast.success(`Registered as ${user.displayName}`, {
                    position: "bottom-center",
                    autoClose: 1500,
                    transition: Bounce,
                });
                setUser(user);
                navigate("/");
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage || "Signup failed");
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    return (
        <div className='flex items-center justify-center'>

            <Helmet>
                <title>Register</title>
            </Helmet>

            <div className='flex-1 p-3 space-y-2.5'>
                <Link to='/' className="flex items-center mb-6 text-2xl font-black w-fit">
                    <img className="w-8 mr-2" src={logo} alt="logo" />
                </Link>
                <h1 className='text-3xl font-bold'>Welcome to <span className='text-accent'>Stay Sphere</span>!</h1>
                <p className='font-medium opacity-40'>Please enter valid registration information and create an account.</p>

                {/* Email Pass Registration */}
                <form onSubmit={handleRegisterBtn} className="space-y-4 md:space-y-6">
                    <div>
                        <input type="text" name="name" className="input w-full p-5 font-medium" placeholder="Enter Your Name" required />
                    </div>
                    <div>
                        <input type="email" name="email" className="input w-full p-5 font-medium" placeholder="Enter Your Valid Email" required />
                    </div>
                    <div>
                        <input type="url" name="photoURL" className="input w-full p-5 font-medium" placeholder="Enter Your Valid Photo URL" required />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Enter a Strong Password" className="input w-full p-5 font-medium" required />
                        {passError && <p className='text-red-600 flex items-center gap-1'><MdOutlineNearbyError />{passError}</p>}
                    </div>
                    <div>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input w-full p-5 font-medium" required />
                        {confirmPassError && <p className='text-red-600 flex items-center gap-1'><MdOutlineNearbyError />{confirmPassError}</p>}
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                        </div>
                        <div className="ml-3 text-sm">
                            <label className="font-light text-gray-700">I accept the
                                <button className="font-medium text-secondary hover:underline ml-1 w-fit" onClick={() => document.getElementById('my_modal_1').showModal()}>Terms and Condition</button>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn w-full">Create an account</button>
                </form>

                <div className="divider">OR</div>

                {/* Google Register */}
                <button onClick={handleGoogleRegister} className="btn bg-white text-black border-[#e5e5e5] w-full">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign Up with Google
                </button>

                <div className="text-sm text-center font-light text-gray-500 dark:text-gray-400 my-10">
                    Already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                </div>
            </div>
            <Lottie animationData={registerAnime} loop={true} style={{ borderRadius: 50 }} rendererSettings={{preserveAspectRatio: 'xMidYMid slice', className: 'rounded-[50px]'}} className='flex-1 max-md:hidden' />
        </div>
    );
};

export default Registration;