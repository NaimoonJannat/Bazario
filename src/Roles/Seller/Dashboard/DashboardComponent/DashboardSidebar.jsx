import { useState } from 'react';
import { FaTachometerAlt, FaUserGraduate } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';

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
    icon: <FaUserGraduate />,
    label: 'Add Product',
    path: `${DASHBOARD_BASE}/add-product`,
  },
  {
    icon: <FaUserGraduate />,
    label: 'Create Coupon',
    path: `${DASHBOARD_BASE}/add-product`,
  },
  {
    icon: <FaUserGraduate />,
    label: 'Add Product',
    path: `${DASHBOARD_BASE}/add-product`,
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

  // Helper to check active path (exact or prefix match for submenu)
  const isActive = (path) => location.pathname === path;
  const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);

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
                isActive(item.path) || isActivePrefix(item.path)
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
