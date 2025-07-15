// Sidebar.jsx
import { useState } from 'react';
import { FaTachometerAlt, FaUserGraduate } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const DashboardSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(
    Number(localStorage.getItem('activeSidebarNav')) || 0
  );
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const location = useLocation();

  const handleNavClick = (index, hasSubmenu = false) => {
    setActiveIndex(index);
    localStorage.setItem('activeSidebarNav', index);

    if (hasSubmenu) {
      setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
    } else {
      setOpenSubMenuIndex(null);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="fixed bg-[#215447] h-screen w-[60px] flex flex-col items-center z-50">
        <ul className="flex flex-col items-center mt-4 gap-4">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => handleNavClick(0)}
              className="text-white text-xl hover:text-yellow-400 transition-all"
              title="Dashboard"
            >
              <FaTachometerAlt
                className={`${
                  activeIndex === 0 ? 'text-yellow-400' : ''
                } transition-all duration-300`}
              />
            </button>
          </li>

          {/* Admission with Submenu */}
          <li className="relative">
            <button
              onClick={() => handleNavClick(1, true)}
              className="text-white text-xl hover:text-yellow-400 transition-all"
              title="Online Admission"
            >
              <FaUserGraduate
                className={`${
                  activeIndex === 1 ? 'text-yellow-400' : ''
                } transition-all duration-300`}
              />
            </button>

            {/* Submenu */}
            {openSubMenuIndex === 1 && (
              <ul className="absolute left-[60px] top-0 bg-white h-screen w-[200px] shadow-lg z-40 p-4">
                <li className="mb-2">
                  <a
                    href="/online-admissions"
                    className={`block font-semibold p-2 rounded-l-md border-l-4 ${
                      isActive('/online-admissions')
                        ? 'bg-gray-100 border-yellow-400'
                        : 'border-transparent hover:bg-gray-100'
                    }`}
                  >
                    Online Admission
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/online-admissions/setting/fees"
                    className={`block font-semibold p-2 rounded-l-md border-l-4 ${
                      isActive('/online-admissions/setting/fees')
                        ? 'bg-gray-100 border-yellow-400'
                        : 'border-transparent hover:bg-gray-100'
                    }`}
                  >
                    Admission Fees
                  </a>
                </li>
                <li>
                  <a
                    href="/online-admissions/setting/index"
                    className={`block font-semibold p-2 rounded-l-md border-l-4 ${
                      isActive('/online-admissions/setting/index')
                        ? 'bg-gray-100 border-yellow-400'
                        : 'border-transparent hover:bg-gray-100'
                    }`}
                  >
                    Settings
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="ml-[60px] flex-1 p-4 min-h-screen bg-gray-50">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default DashboardSidebar;
