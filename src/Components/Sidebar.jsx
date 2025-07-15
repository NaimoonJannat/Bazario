import { Link } from 'react-router-dom';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { RxBackpack } from 'react-icons/rx';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null); // 'user' | 'admin' | null

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`)
        .then((res) => setUserRole(res.data.role))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className='fixed top-20 right-0 z-40 md:hidden flex flex-col gap-3 items-center bg-[#d4ff00] p-2 rounded-l-lg shadow-lg'>
      {/* Always show Products */}
      <Link to='/products' className='tooltip tooltip-left' data-tip='Products'>
        <AiOutlineProduct className='text-black text-xl hover:scale-110 transition-transform' />
      </Link>

      {/* USER Mode */}
      {user && userRole === 'user' && (
        <>
          <Link to='/favourite' className='tooltip tooltip-left' data-tip='Favourites'>
            <FaHeart className='text-black text-xl hover:scale-110 transition-transform' />
          </Link>
          <Link to='/cart' className='tooltip tooltip-left' data-tip='Cart'>
            <FaCartShopping className='text-black text-xl hover:scale-110 transition-transform' />
          </Link>
        </>
      )}

      {/* ADMIN Mode */}
      {user && userRole === 'admin' && (
        <Link to='/dashboard' className='tooltip tooltip-left' data-tip='Dashboard'>
          <RxBackpack className='text-black text-xl hover:scale-110 transition-transform' />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
