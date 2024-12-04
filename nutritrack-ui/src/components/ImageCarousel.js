import { useState } from "react";

export default function ImageCarousel( {images} ) {

    const [currentIndex, setCurrentIndex] = useState(0);

    if(!images) return;

    const categories = Object.keys(images);

    if(categories.length === 0) return;

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex-1+categories.length) % categories.length);
    }

    const nextImage = () => {
        setCurrentIndex((nextIndex) => (nextIndex+1) % categories.length);
    }

    const currentCategory = categories[currentIndex];

    return (
        <div className="container mx-auto p-4">
            <div className="flex relative place-content-center max-w-8xl mx-auto">
                <img 
                    src={images[currentCategory].display[Object.keys(images[currentCategory].display)[0]]} 
                    onError={(event) => event.target.src = '/No_Image_Available.jpg'} 
                    alt={currentCategory} 
                    className="h-64 object-cover rounded-lg shadow-lg" 
                    x-content-type-options="nosniff"
                />
                <button 
                    type="button" 
                    onClick={() => prevImage()}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100 transition-all"
                    >
                    &lt;
                </button>
                <button 
                    type="button" 
                    onClick={() => nextImage()}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100 transition-all"
                    >
                    &gt;
                </button>
            </div>
            <div className="flex justify-center mt-4 space-x-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
                {categories.map((category, index) => (
                    <button type="button"
                        key={category}
                        onClick={() => setCurrentIndex(index)}
                        className={`px-4 py-2 rounded ${currentIndex === index ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}