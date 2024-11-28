import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../Services/AdminService';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State to hold the search term
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // State to hold the filtered users

  // Helper function to capitalize the first letter of each word
  const capitalizeFirstLetter = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data); // Initialize filteredUsers with all users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle search term input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter users based on the search term
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        capitalizeFirstLetter(user.role).toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="p-6 pt-[5.5rem] bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, email, or role..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.userId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{index + 1}</td> {/* Index starts from 1 */}
              <td className="py-2 px-4 border-b">{user.firstName.concat(' ', user.lastName)}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{capitalizeFirstLetter(user.role)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
