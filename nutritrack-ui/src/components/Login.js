import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
    return (
        <div className="flex flex-col flex-grow-0 md:container md:mx-auto shadow-xl min-h-screen bg-white m-4">
            <Header />
            <h1>Login</h1>
            <Footer />
        </div>
    );
}