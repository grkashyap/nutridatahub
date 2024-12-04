export default function Overview( {product} ) {
    return (
        <div className="md:container md:mx-auto">
            <div className="text-4xl">
                {product.product_name_en}
            </div>
            <div className="text-md m-2">
                <span className="flex"><p className="font-bold">Common Name: </p><p>&nbsp;{product.generic_name}</p></span>
            </div>
            <div className="text-md m-2">
                <span className="flex"><p className="font-bold">Brands: </p><p>&nbsp;{product.brands}</p></span>
            </div>
            <div className="text-md m-2">
                <span className="flex"><p className="font-bold">Quantity: </p><p>&nbsp;{product.quantity}</p></span>
            </div>
            <div className="text-md m-2">
                <span className="flex"><p className="font-bold">Packaging: </p><p>&nbsp;{product.packaging_old}</p></span>
            </div>
        </div>
    );
}