import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../Provider/AuthProvider';

const Favorite = () => {
  const { user } = useContext(AuthContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/favorite/${user?.email}`)
        .then(res => res.json())
        .then(data => {
          const arr = Array.isArray(data) ? data : [];
          // seed qty = 1 per product (preserve existing qty if backend ever sends it)
          const withQty = arr.map(p => ({ ...p, qty: p?.qty && p.qty > 0 ? p.qty : 1 }));
          setFavoriteProducts(withQty);
        })
        .catch(err => console.error(err));
    }
  }, [user?.email]);

  const increaseQty = (id) => {
    setFavoriteProducts(prev =>
      prev.map(p => p._id === id ? { ...p, qty: (p.qty || 1) + 1 } : p)
    );
  };

  const decreaseQty = (id) => {
    setFavoriteProducts(prev =>
      prev.map(p => {
        if (p._id !== id) return p;
        const next = (p.qty || 1) - 1;
        return { ...p, qty: next < 1 ? 1 : next }; // min 1
      })
    );
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-white">Favorite List of <span className='text-[#d4ff00] font-semibold'>{user?.displayName}</span></h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"></span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                        <span>Product</span>
                      </div>
                    </th>
                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <button className="flex items-center gap-x-2">
                        <span>Category</span>
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <button className="flex items-center gap-x-2">
                        <span>Price</span>
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Quantity</th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {Array.isArray(favoriteProducts) && favoriteProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                          <div className="flex items-center gap-x-2">
                            <img className="object-cover w-16 h-16 rounded-full" src={product?.images?.[0]} alt={product?.title} />
                            <div>
                              <h2 className="font-medium text-[#001f3f] dark:text-white ">{product?.title}</h2>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-[#001f3f]">
                          <h2 className="text-sm font-normal text-[#d4ff00]">{product?.category}</h2>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-[#001f3f] dark:text-gray-300 whitespace-nowrap">{product?.price}</td>

                      {/* quantity selector  */}
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-4 mt-6">
                          <button
                            onClick={() => decreaseQty(product._id)}
                            className="w-10 h-10 flex justify-center items-center text-xl font-bold border rounded-lg bg-gray-800 hover:bg-[#d4ff00] hover:text-[#001f3f] transition"
                          >
                            -
                          </button>
                          <span className="text-lg font-bold">{product?.qty || 1}</span>
                          <button
                            onClick={() => increaseQty(product._id)}
                            className="w-10 h-10 flex justify-center items-center text-xl font-bold border rounded-lg bg-gray-800 hover:bg-[#d4ff00] hover:text-[#001f3f] transition"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>

      {/* pagination (unchanged) */}
      <div className="flex items-center justify-between mt-6">
        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          <span>previous</span>
        </a>

        <div className="items-center hidden lg:flex gap-x-3">
          <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
          <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
        </div>

        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Favorite;
