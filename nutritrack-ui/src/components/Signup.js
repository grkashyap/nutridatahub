import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    CognitoIdentityProviderClient,
    SignUpCommand,
    ConfirmSignUpCommand,
  } from '@aws-sdk/client-cognito-identity-provider';
import authConfig from '../resources/authConfig';

export default function Signup() {

    const [isRegistering, setIsRegistering] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const client = new CognitoIdentityProviderClient({region: authConfig.Region});
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setIsLoading(false);
        setError(false);

        if(password !== cpassword) {
            setError(true);
            setErrMsg("Password and Confirm Password doesn't match");
            return;
        }

        const command = new SignUpCommand({
            ClientId: authConfig.ClientId,
            Username: email,
            Name: name,
            Password: password,
            UserAttributes: [{Name: 'email', Value: email}, {Name: 'name', Value: name}]
        });

        try {
            await client.send(command);
            setIsLoading(false);
            setIsVerifying(true);
            setIsRegistering(false);
        } catch(err) {
            setIsLoading(false);
            setError(true);
            setErrMsg(err.message || 'Registration has failed');
        }
    };

    const handleVerification = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);
    
        const command = new ConfirmSignUpCommand({
          ClientId: authConfig.ClientId,
          Username: email,
          ConfirmationCode: verificationCode,
        });
    
        try {
          await client.send(command);
          setIsLoading(false);
          setIsVerifying(false);
          setIsRegistering(false);
          navigate('/login');
        } catch (err) {
          setIsLoading(false);
          setError(true);
          setErrMsg(err.message || 'Verification has failed');
        }
      };

    return (
        <div className="flex flex-col flex-grow-0 md:container md:mx-auto shadow-xl min-h-screen bg-brown m-4">
            <Header />
            <div className="flex flex-1 flex-col justify-center p-4">
                {
                    error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errMsg}</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                        </div>
                    )
                }
                { !isLoading &&
                    <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white shadow-lg">
                        {isRegistering && !isVerifying && 
                            <div>
                                <form onSubmit={handleRegister}>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">Name</label>
                                            <input 
                                                name="name" 
                                                type="text" 
                                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                                placeholder="Enter Name" 
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}/>
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                                            <input 
                                                name="email" 
                                                type="email" 
                                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                                placeholder="Enter email" 
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                            <input 
                                                name="password" 
                                                type="password" 
                                                required
                                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                                                placeholder="Enter password" 
                                                value={password}
                                                onChange={(e) =>  setPassword(e.target.value)}/>
                                        </div>
                                        <div>
                                            <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                            <input 
                                                name="cpassword" 
                                                type="password" 
                                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                                                placeholder="Enter confirm password" 
                                                required
                                                value={cpassword}
                                                onChange={(e) => setCPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="!mt-12">
                                        <button type="submit" 
                                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                            disabled={isLoading}>
                                            Create an account
                                        </button>
                                    </div>
                                </form>
                                <p className="text-gray-800 text-sm mt-6 text-center">
                                    Already have an account? 
                                    <a href='/login' className="text-blue-600 font-semibold hover:underline ml-1">
                                        Login here
                                    </a>
                                </p>
                            </div>
                        }
                        { isVerifying && 
                            <div>
                                <form onSubmit={handleVerification}>
                                    <div className="space-y-6">
                                        <label className="text-gray-800 text-sm mb-2 block">Verification Code</label>
                                        <input 
                                            type="text" 
                                            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                                            placeholder="Enter verification code" 
                                            required
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}/>
                                    </div>
                                    <div className="!mt-12">
                                        <button type="submit" 
                                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                            disabled={isLoading}>
                                            Verify
                                        </button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                }
                {
                    isLoading && (
                        <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
                            <span className='sr-only'>Loading...</span>
                            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                            <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    );
}