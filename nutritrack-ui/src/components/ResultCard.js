export default function ResultCard ({product} ) {

    return (
        <div>
            <div className="w-full h-80 max-w-xs rounded-lg overflow-hidden shadow-lg">
                <div>
                    <img className="w-full h-48 object-contain" src={product.image_small_url} alt={product.product_name}/>
                    <div className="p-4">
                        <div className="text-lg font-semibold text-gray-800 place-content-center">{product.product_name}</div>
                    </div>
                </div>
            </div>  
        </div>
    )
}