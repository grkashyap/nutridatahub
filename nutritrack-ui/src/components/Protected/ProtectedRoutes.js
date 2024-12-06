import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ( {children} ) => {
    const { authenticated, loading } = useContext(AuthContext);

    if(loading) {
        return (
            <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
            </div>
        );
    }

    return authenticated? children: <Navigate to="/login" />;
}

export default ProtectedRoute;