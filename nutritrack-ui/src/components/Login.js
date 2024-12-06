import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    GetUserCommand
  } from '@aws-sdk/client-cognito-identity-provider';
import authConfig from '../resources/authConfig.json';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);

    const {updateAuthTokens, setUserDetails, isAuthenticated, login} = useContext(AuthContext);

    const client = new CognitoIdentityProviderClient({region: authConfig.Region});
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(false);
        setErrMsg(null);

        const loginCommand =  new InitiateAuthCommand({
            ClientId: authConfig.ClientId,
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        });

        try {
            const response = await client.send(loginCommand);

            updateAuthTokens(response.AuthenticationResult.AccessToken);

            const getUserCommand = new GetUserCommand({
                AccessToken: response.AuthenticationResult.AccessToken
            });

            const user = await client.send(getUserCommand);
            
            const { Value, name } = user.UserAttributes.filter((attr) => attr.Name === 'name' || attr.Name === 'email')
                                                    .reduce((acc, attr) => {
                                                            acc[attr.Name] = attr.Value;
                                                            return acc;
                                                        }
                                                    );

            setUserDetails(user);
            isAuthenticated(true);
            login(user, response.AuthenticationResult.AccessToken, Value, name);

            navigate('/dashboard');

        } catch(err) {
            setError(true);
            setErrMsg(err.message || 'Login failed');
            setLoading(false);
            return;
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
                {
                    !loading && (
                        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white shadow-lg">
                            <div>
                                <form onSubmit={handleLogin}>
                                    <div className="space-y-6">
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
                                        <div className="!mt-12">
                                            <button type="submit" 
                                                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
                {
                    loading && (
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