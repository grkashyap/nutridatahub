import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

export default function Home() {

    const { authenticated } = useContext(AuthContext);

    return (
        <div>
            <h1>{authenticated ? `Welcome ${sessionStorage.getItem('name')}` : ''}</h1>
        </div>
    )
};