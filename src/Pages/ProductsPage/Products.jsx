
const Products = () => {
    return (
        <div>
            <h5 className='text-5xl'>Products page</h5>
            {/* The container */}
            <div className="w-full flex flex-col md:flex-row">

                {/* Filter  */}
                <div className="w-full max-h-screen md:w-1/3 border-4 border-white"></div>

                {/* Products */}
                <div className="w-full h-screen border-4 border-white md:w-1/2"></div>
            </div>
        </div>
    );
};

export default Products;