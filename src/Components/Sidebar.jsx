// Sidebar.jsx
import { Link } from 'react-router-dom';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';

const Sidebar = () => {
  return (
    <div className="fixed top-20 right-0 z-40 flex flex-col gap-3 items-center bg-[#d4ff00] p-2 rounded-l-lg shadow-lg md:hidden">
      <Link to="/products" className="tooltip tooltip-left" data-tip="Products">
        <AiOutlineProduct className="text-black text-xl hover:scale-110 transition-transform" />
      </Link>
      <Link to="/favourite" className="tooltip tooltip-left" data-tip="Favourites">
        <FaHeart className="text-black text-xl hover:scale-110 transition-transform" />
      </Link>
      <Link to="/cart" className="tooltip tooltip-left" data-tip="Cart">
        <FaCartShopping className="text-black text-xl hover:scale-110 transition-transform" />
      </Link>
    </div>
  );
};

export default Sidebar;
