import { useNavigate } from "react-router-dom";

export default function ResultCard ({product} ) {

    const navigate = useNavigate();

    const showDefaultImage = (event) => {
        event.target.src = 'No_Image_Available.jpg'
    }

    const showImage = (imageSrc) => {
        if(imageSrc === undefined) return 'No_Image_Available';
        
        return imageSrc;
    }

    const viewProductDetails = () => {
        navigate(`/product/${product._id}`, {state: {fromSearch: true}});
    }

    return (
        <div>
            <div className="w-full h-80 max-w-xs rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-150 ease-in-out transform hover:scale-110" onClick={viewProductDetails}>
                <div>
                    <img className="w-full h-48 object-contain" src={showImage(product.image_small_url)} alt={product.product_name} onError={showDefaultImage}/>
                    <div className="p-4 place-content-center">
                        <div className="text-lg font-semibold text-gray-800">{product.product_name}</div>
                    </div>
                </div>
            </div>  
        </div>
    )
}