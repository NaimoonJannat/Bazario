import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineProduct } from 'react-icons/ai';
import { FaHeart, FaUserCircle, FaClipboardList } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { RxBackpack } from "react-icons/rx";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Navbar2 = () => {
     const { user, logOut } = useContext(AuthContext);
      const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null); // 'user' | 'admin' | null

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/users/${user.email}`)
                .then(res => setUserRole(res.data.role))
                .catch(err => console.error(err));
        } 
    }, [user]);

      const handleSignOut = () => {
        logOut()
            .then((result) => {
                console.log(result);
                toast.success("Logged Out Successfully!");
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout Error:", error);
                toast.error("Error logging out. Please try again later.");
            });
    };

    return (
        <div className='navbar absolute z-10 bg-transparent text-[#d4ff00] shadow-sm flex flex-row justify-between px-4 mx-auto'>
            {/* LEFT SIDE - Common to all */}
            <div className='flex w-full md:w-1/2'>
                <Link to='/' className='flex gap-2 items-center'>
                    <img className='w-auto h-20' src='./logo.png' alt='logo' />
                </Link>
                {/* You can add a search input here if needed */}
            </div>

            {/* RIGHT SIDE - Conditional */}
            <div className='flex flex-row justify-end items-center w-full md:w-1/2'>
                <ul className='menu menu-horizontal gap-8 items-center'>

                    {/* Common for all roles */}
                    <Link to={"/products"}>
                        <div className="text-base"><AiOutlineProduct /></div>
                    </Link>

                    {/* GUEST (not logged in) */}
                    {!user && (
                        <>
                            <Link to="/registration">
                                <div>Register</div>
                            </Link>
                            <Link to="/login">
                                <div>Login</div>
                            </Link>
                        </>
                    )}

                    {/* USER */}
                    {user && userRole === 'user' && (
                        <>
                            <Link to={"/favourite"}>
                                <div className="text-base"><FaHeart /></div>
                            </Link>
                            <Link to={"/cart"}>
                                <div className="text-base"><FaCartShopping /></div>
                            </Link>
                        </>
                    )}

                    {/* admin */}
                    {user && userRole === 'admin' && (
                        <Link to="/dashboard">
                            <div className="text-base"><RxBackpack /></div>
                        </Link>
                    )}
                </ul>

                {/* AUTHENTICATED USER (USER or SELLER) - Avatar + Dropdown */}
                {user && (
                    <div className='dropdown dropdown-end z-50'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >
                            <div className='w-10 rounded-full' title={user?.displayName}>
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User Profile'
                                    src={user?.photoURL || <FaUserCircle />}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#001f3f] text-[#d4ff00] rounded-box w-52'
                        >
                            {/* Only for regular users */}
                            {userRole === 'user' && (
                                <>
                                    <li><Link to="/history">History</Link></li>
                                    <li><Link to="/profile">My Profile</Link></li>
                                </>
                            )}

                            {/* Only for admin */}
                            {userRole === 'admin' && (
                                <li><Link to="/profile">My Profile</Link></li>
                            )}

                            <li className='mt-2'>
                                <button
                                    onClick={handleSignOut}
                                    className='bg-[#001f3f] text-[#d4ff00] block text-center w-full'
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
