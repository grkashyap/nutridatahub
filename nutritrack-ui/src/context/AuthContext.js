import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [authTokens, setAuthTokens] = useState(null);
    const [user, setUser] = useState(null);
    const [authenticated, setIsAuthenticated] = useState(false);
    const [loading, setIsLoading] = useState(true);
    
    const login = (user, accessToken, email, username) => {
        sessionStorage.setItem('user', user);
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('name', username);
        sessionStorage.setItem('email', email);
    };

    const logout = (name, accessToken, email) => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('user');

        checkAuth();
    };

    const checkAuth = () => {
      const accessToken = sessionStorage.getItem('accessToken');
      const name = sessionStorage.getItem('name');
      const email = sessionStorage.getItem('email');
      const user = sessionStorage.getItem('user');

      if(accessToken && name && email && user) {
        setAuthTokens(accessToken);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setAuthTokens(null);
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    }

    useEffect(() => {
      checkAuth();
    },[])

    const authTokensToShare = {
        authTokens,
        updateAuthTokens : (authTokes) => {
            setAuthTokens(authTokes)
        },
        user,
        setUserDetails: (user) => {
            setUser(user)
        },
        authenticated,
        isAuthenticated: (authenticated) => {
          setIsAuthenticated(authenticated)
        },
        login,
        logout,
        checkAuth,
        loading
    };

    return (
      <AuthContext.Provider value={authTokensToShare}>
        { children }
      </AuthContext.Provider>
    );
}

export default AuthContext;