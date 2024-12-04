import { useState } from "react";
import Overview from "./ProductDetailsTab/Overview";
import Nutrients from "./ProductDetailsTab/Nutrients";

export default function ProductDetailsTab( {product} ) {

    const [activeTab, setActiveTab] = useState(0);

    if(!product) return;

    const tabs = [
        {title: 'Overview', component: <Overview product={product} /> },
        {title: 'Nutrients', component:<Nutrients product={product} />}
    ]

    return (
        <>          
            <div className="w-full max-w-2xl mx-auto p-4">
                <div className="flex border-b-2 mb-4">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`py-2 px-4 text-lg font-semibold transition-colors duration-300 
                            ${activeTab === index ? 'border-b-4 border-green-500 text-green-500' : 'text-gray-600 hover:text-green-500'}`}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>
                <div className="p-4">
                    {tabs[activeTab].component}
                </div>
            </div>
        </>
    );
}