import { useEffect, useState } from "react";
import { userService } from "../services/userService";

function UserSelect() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error(err, "Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <label className="block mb-2 text-gray-700 font-semibold">
        Select User
      </label>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      >
        <option value="">-- Select a user --</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      {selectedUser && (
        <p className="mt-2 text-sm text-gray-600">
          Selected User ID: <span className="font-medium">{selectedUser}</span>
        </p>
      )}
    </div>
  );
}

export default UserSelect;
