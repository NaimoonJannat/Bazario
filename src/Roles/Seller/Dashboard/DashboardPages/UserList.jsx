import React from 'react';
import useFetch from '../../../../Hooks/useFetch';
import Loader from '../../../../Components/Loader';


const UserList = () => {
  const { data: users, loading, error } = useFetch('http://localhost:5000/users');

  if (loading) return <p className="text-center mt-10 text-xl"><Loader></Loader></p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">User List</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                    alt="profile"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">{user.name}</div>
                    <div className="font-normal text-gray-500">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.position || 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                    {user.status || 'Offline'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit user
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
