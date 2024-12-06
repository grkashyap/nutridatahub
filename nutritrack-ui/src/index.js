import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductDetails from './components/ProductDetails';
import { ProductResultsProvider } from './context/Products';
import { motion, AnimatePresence } from 'motion/react';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './components/Protected/Dashboard';
import ProtectedRoute from './components/Protected/ProtectedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductResultsProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <AnimatePresence mode='wait'>
            <Routes>
                <Route path='/' element={< App />} />
                <Route path='/product/:productId' element={
                    <motion.div key="productDetails" initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0}} transition={{duration: 0.2}}>
                      <ProductDetails />
                    </motion.div>
                } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/signup' element={ <Signup />} />
                <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthContextProvider>
      </ProductResultsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
