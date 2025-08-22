import { useLoaderData, useParams } from "react-router";

const ProductDetails = () => {
     const products = useLoaderData();
     const { id } = useParams();
     const product = products.find((task) => task._id === id);
    return (
        <div className="card lg:card-side lg:p-8">
            <div className="lg:w-1/2 rounded-2xl  flex justify-center items-center">
                <img className="w-full border-2 border-[#d4ff00] shadow-2xl shadow-[#d4ff00] " src={product.images[0]} />
            </div>
            <div className="card-body lg:w-1/2 text-white">
                <h2 className="text-4xl font-bold">{product.title}</h2>
                <div className="divider"></div>
                <div className="text-[#d4ff00] font-bold">{product.category}</div>
                <div className="divider"></div>
                <div>
                    <p className=" text-base">
                        <span className="font-semibold">Details:</span>{" "}
                        {product.description}
                    </p>
                </div>
                <div className="divider"></div>
                <div className="flex gap-4 justify-center items-center">
                    <div>
                        <p className="text-base">Quantity: </p>
                        <p className="text-base">Expiry Date: </p>

                    </div>
                    <div>
                        <p className="font-bold">{product.quantity}</p>
                        <p className="font-bold">{product.expireDate}</p>
                    </div>
                </div>
                <div className="card-actions justify-start flex gap-4">
                    <button className="btn bg-[#d4ff00]">Add to Cart</button>
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;