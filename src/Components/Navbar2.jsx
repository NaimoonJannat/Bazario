import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaHeart, FaUserCircle, FaClipboardList } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { RxBackpack } from 'react-icons/rx';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import Cart from './Cart';

const Navbar2 = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null); // 'user' | 'admin' | null
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://bazario-server-pearl.vercel.app/users/${user?.email}`)
        .then((res) => setUserRole(res.data.role))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast.success('Logged Out Successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
        toast.error('Error logging out. Please try again later.');
      });
  };

  return (
    <div className='navbar fixed z-50 bg-transparent text-[#d4ff00] shadow-sm flex flex-row justify-between px-4 mx-auto w-full'>
      {/* LEFT SIDE */}
      <div className='flex w-full md:w-1/2 items-center gap-2'>
        <Link to='/' className='flex gap-2 items-center'>
          <img className='w-auto h-20' src='./logo.png' alt='logo' />
        </Link>
        {/* Optional search input */}
      </div>

      {/* RIGHT SIDE */}
      <div className='flex flex-row justify-end items-center w-full md:w-1/2'>
        <ul className='menu menu-horizontal gap-8 items-center hidden md:flex'>
          {/* Always visible */}
          <Link to='/products'>
            <div className='text-base'>
              <AiOutlineProduct />
            </div>
          </Link>

          {/* Guest */}
          {!user && (
            <>
              <Link to='/registration'>
                <div>Register</div>
              </Link>
              <Link to='/login'>
                <div>Login</div>
              </Link>
            </>
          )}

          {/* User */}
          {user && userRole === 'user' && (
            <>
              <Link to='/favorite'>
                <div className='text-base'>
                  <FaHeart />
                </div>
              </Link>
              <button onClick={() => setIsCartOpen(true)}>
              <div className='text-base'>
                <FaCartShopping />
              </div>
            </button>
            </>
          )}

          {/* Admin */}
          {user && userRole === 'admin' && (
            <Link to='/dashboard'>
              <div className='text-base'>
                <RxBackpack />
              </div>
            </Link>
          )}
        </ul>
        {/* The login button on small screen  */}
        <ul className='menu menu-horizontal gap-8 items-center flex md:hidden'>
            {!user && (
            <>
              <Link to='/login'>
                <div>Login</div>
              </Link>
            </>
          )}
        </ul>
        

         {/* Render Cart Modal */}
      {user && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}


        {/* Authenticated User - Dropdown */}
        {user && (
          <div className='dropdown dropdown-end'>
            <label
              tabIndex={0}
              className='btn btn-ghost btn-circle avatar'
              title={user?.displayName}
            >
              <div className='w-10 rounded-full overflow-hidden'>
                {user?.photoURL ? (
                  <img
                    referrerPolicy='no-referrer'
                    alt='User'
                    src={user.photoURL}
                  />
                ) : (
                  <FaUserCircle className='w-full h-full text-xl' />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-[#001f3f] text-[#d4ff00] rounded-box w-52'
            >
              {userRole === 'user' && (
                <>
                  <li>
                    <Link to='/history'>History</Link>
                  </li>
                  <li>
                    <Link to='/profile'>My Profile</Link>
                  </li>
                </>
              )}

              {userRole === 'admin' && (
                <li>
                  <Link to='/profile'>My Profile</Link>
                </li>
              )}

              <li className='mt-2'>
                <button
                  onClick={handleSignOut}
                  className='bg-[#001f3f] text-[#d4ff00] w-full text-left px-3 py-2 rounded hover:bg-[#003366]'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar2;
