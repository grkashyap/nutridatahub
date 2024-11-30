export default function ResultCard ({product} ) {

    const showDefaultImage = (event) => {
        event.target.src = 'No_Image_Available.jpg'
    }

    return (
        <div>
            <div className="w-full h-80 max-w-xs rounded-lg overflow-hidden shadow-lg">
                <div>
                    <img className="w-full h-48 object-contain" src={product.image_small_url} alt={product.product_name} onError={showDefaultImage}/>
                    <div className="p-4 place-content-center">
                        <div className="text-lg font-semibold text-gray-800">{product.product_name}</div>
                    </div>
                </div>
            </div>  
        </div>
    )
}