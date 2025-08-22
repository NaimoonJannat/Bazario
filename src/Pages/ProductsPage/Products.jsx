import { useLoaderData } from "react-router";
import ProductCard from "./ProductCard";
const Products = () => {
    const products = useLoaderData();
    return (
        <div className="">
            
            {/* The container */}
            <div className="flex flex-col md:flex-row">

                {/* Filters  */}
                <div className="w-full md:w-1/3 border-r-2 border-[#d4ff00] max-h-screen">
                </div>

                {/* Products */}
                <div className="text-center space-y-4 w-full md:w-2/3">
            <h2 className="text-3xl text-white font-bold">Total <span className="text-[#d4ff00]">{products.length}</span> Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    products.map(product =>
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    )
                }
            </div>
        </div>
                {/* <div className="w-full h-screen border-4 border-white md:w-1/2">
                
                </div> */}
            </div>
        </div>
    );
};

export default Products;