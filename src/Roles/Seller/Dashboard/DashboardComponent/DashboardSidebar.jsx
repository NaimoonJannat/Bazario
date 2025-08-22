import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaTachometerAlt, FaHourglassEnd, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { IoAddCircleOutline, IoCalculatorOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { FcExpired } from "react-icons/fc";
import { BiSolidCoupon } from "react-icons/bi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineFeedback } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const DASHBOARD_BASE = '/dashboard';
  const menuItems = [
   {
    icon: <FaTachometerAlt />,
    label: 'Dashboard',
    path: DASHBOARD_BASE,
  },
  {
    icon: <IoAddCircleOutline />,
    label: 'Add Product',
    path: `${DASHBOARD_BASE}/add-product`,
  },
  {
    icon: <BiSolidCoupon />,
    label: 'Coupons',
    path: `${DASHBOARD_BASE}/coupons`,
  },
  {
    icon: <FaUsers />,
    label: 'User List',
    path: `${DASHBOARD_BASE}/user-list`,
  },
  {
    icon: <GoListUnordered />,
    label: 'Orders',
    path: `${DASHBOARD_BASE}/due-orders`,
  },
  {
    icon: <FaHourglassEnd />,
    label: 'Out of Stock',
    path: `${DASHBOARD_BASE}/out-of-stock`,
  },
  {
    icon: <FcExpired />,
    label: 'Expired Products',
    path: `${DASHBOARD_BASE}/expired-products`,
  },
  {
    icon: <RiDiscountPercentFill />,
    label: 'Discounts',
    path: `${DASHBOARD_BASE}/discounts`,
  },
  {
    icon: <MdOutlineFeedback />,
    label: 'Feedbacks',
    path: `${DASHBOARD_BASE}/feedback`,
  },
  {
    icon: <FaClockRotateLeft />,
    label: 'Pre-Orders',
    path: `${DASHBOARD_BASE}/pre-orders`,
  },
  {
    icon: <IoCalculatorOutline />,
    label: 'On Shop Sale',
    path: `${DASHBOARD_BASE}/on-shop-sale`,
  },
  
    // {
    //   icon: <FaUserGraduate />,
    //   label: 'Admission',
    //   path: '/online-admissions',
    //   submenu: [
    //     { label: 'Online Admission', path: '/online-admissions' },
    //     { label: 'Admission Fees', path: '/online-admissions/setting/fees' },
    //     { label: 'Settings', path: '/online-admissions/setting/index' },
    //   ],
    // },
  ];

  // Helper to check active path 
  const isActive = (path) => location.pathname === path;
  

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-0 left-0 h-screen bg-[#001f3f] z-50 transition-all duration-300 ease-in-out ${
        hovered ? 'w-[220px]' : 'w-[60px]'
      }`}
    >
      <ul className="mt-4 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 text-white transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-[#234465] text-yellow-400'
                  : 'hover:bg-[#234465]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  hovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                }`}
              >
                {item.label}
              </span>
            </Link>

            {/* Submenu */}
            {/* {item.submenu && hovered && (
              <ul className="ml-8 mt-1 space-y-1">
                {item.submenu.map((sub, i) => (
                  <li key={i}>
                    <Link
                      to={sub.path}
                      className={`block text-sm px-2 py-1 rounded transition ${
                        isActive(sub.path)
                          ? 'text-yellow-400 font-semibold'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
