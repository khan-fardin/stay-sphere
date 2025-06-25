import React, { use } from 'react';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/logo.png'
import { Helmet } from 'react-helmet';
import animationLogin from '../../assets/Animation - 1749057173061.json';
import Lottie from 'lottie-react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Bounce, toast } from 'react-toastify';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {

    const { loginUser, signInWithGoogle, setUser } = use(AuthContext);
    const navigate = useNavigate();

    // email,password login
    const handleLoginBtn = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const { email, password } = data;

        loginUser(email, password)
            .then((result) => {
                const user = result.user;
                toast.success(`Registered as ${user.displayName}`, {
                    position: "bottom-center",
                    autoClose: 1500,
                    transition: Bounce,
                });
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode, errorMessage);
                // setError(errorCode);
            });
    };

    // google login
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
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
                <title>Login</title>
            </Helmet>

            <section className="flex-1">
                <div className="px-6 py-8 mx-auto md:h-screen lg:py-0 mb-10">
                    <Link to='/' className="flex items-center mb-6 text-2xl font-black w-fit">
                        <img className="w-8 mr-2" src={logo} alt="logo" />
                    </Link>
                    <div>
                        <div className="space-y-4">
                            <h1 className="text-xl text-secondary-content font-bold leading-tight tracking-tight md:text-2xl">
                                Login to your account
                            </h1>

                            {/* Login With email Pass */}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLoginBtn}>
                                <div>
                                    <input type="email" name="email" id="email" className="input w-full p-5 font-medium" placeholder="Enter Your Email" required />
                                </div>
                                <div>
                                    <input type="password" name="password" id="password" placeholder="Enter Your Password" className="input w-full p-5 font-medium" required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className="font-medium">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="btn w-full">Login</button>
                            </form>

                            <div className="divider">OR</div>

                            {/* Google Register */}
                            <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5] w-full">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>

                            <p className="text-sm font-light text-center">
                                Don’t have an account yet? <Link to='/registration' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register Now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='w-1/2 max-md:hidden'>
                <Lottie animationData={animationLogin}></Lottie>
            </div>
        </div>
    );
};

export default Login;