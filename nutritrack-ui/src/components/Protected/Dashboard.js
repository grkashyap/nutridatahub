import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Header from "../Header";
import Footer from "../Footer";

export default function Dashboard() {

    const { authenticated } = useContext(AuthContext);
    
    return (
        <div className="flex flex-col flex-grow-0 md:container md:mx-auto shadow-xl min-h-screen bg-brown m-4">
            <Header />
            <div className="flex flex-1 flex-col justify-center p-4">
                <h1>{authenticated ? `Welcome ${sessionStorage.getItem('name')}`:''}</h1>
            </div>
            <Footer />
        </div>
    );
}