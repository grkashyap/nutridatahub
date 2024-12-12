export default function Nutrients( {product} ) {

    const product_nutrient_levels = product.nutrient_levels;
    const levels = Object.keys(product_nutrient_levels);

    return (
        <div className="md:container md:mx-auto">
            <div className="text-2xl">
                Nutrient Level
            </div>
            <div>
                {
                    levels.map((level) => (
                        <div key={level} className="text-md m-2">
                            <span className="flex">
                                <p className="font-bold capitalize">{level.includes('-')? level.replace('-',' '):level}:</p>
                                <p className='capitalize'>&nbsp;{product_nutrient_levels[level]}</p>
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className="text-2xl mt-4">
                Ingredients
            </div>
            <div className="text-md m-2">
                {product.ingredients_text_en}
            </div>
        </div>
    );
}