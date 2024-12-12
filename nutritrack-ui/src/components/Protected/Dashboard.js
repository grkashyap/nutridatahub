import {useState} from "react";
import Header from "../Header";
import Footer from "../Footer";
import Home from "./UserTabs/Home";
import Chat from "./UserTabs/Chat";
import Recommendations from "./UserTabs/Recommendations";

export default function Dashboard() {

    const tabs = [
        {id: 1, title: 'Home', component: <Home />},
        {id: 2, title: 'Chat-bot', component: <Chat />},
        {id: 3, title: 'Recommendations', component: <Recommendations />}
    ]

    const [activeTab, setActiveTab] = useState(0);
    
    return (
        <>

        <div className="flex flex-col flex-grow-0 md:container md:mx-auto shadow-xl min-h-screen bg-brown m-4">
                <Header />
                <div className="md:flex flex-1 flex-col p-4 gap-y-2 bg-white rounded-lg shadow-lg">
                    <div className="grid grid-cols-[auto_1fr]">
                        <div
                            className='space-y space-y-4 text-sm font-medium text-gray-500 m-4 md:me-4 mb-4 md:mb-0'>
                            {tabs.map((tab, index) => (
                                <div key={tab.id}>
                                    <button type='button'
                                            onClick={() => setActiveTab(index)}
                                            className={`inline-flex items-center px-4 py-3 rounded-lg w-full
                                    ${activeTab === index ? 'text-white bg-green-700 active' : 'text-black'}`}>
                                        {tab.title}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div
                            className="p-6 text-medium  rounded-lg bg-gray-100">
                            {tabs[activeTab].component}
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
        </>
    );
}