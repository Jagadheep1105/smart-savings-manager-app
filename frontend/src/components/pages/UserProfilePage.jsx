 
import React, { useState } from "react";

const UserProfilePage = ({
  currentUser,
  setUsers,
  setCurrentUser,
  users,
  setError,
}) => {
  const user = currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [newProfile, setNewProfile] = useState(user.profile);

  const handleSave = () => {
    const updatedUser = { ...user, profile: newProfile };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    setIsEditing(false);
    setError("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">
        User Profile: {user.username}
      </h2>
      <div className="space-y-4">
        <p>
          <span className="font-semibold text-gray-600">Role:</span>{" "}
          <span className="capitalize">{user.role}</span>
        </p>
        {user.type && (
          <p>
            <span className="font-semibold text-gray-600">User Type:</span>{" "}
            <span className="capitalize">{user.type.replace("-", " ")}</span>
          </p>
        )}
        {user.salary && (
          <p>
            <span className="font-semibold text-gray-600">Monthly Salary:</span>{" "}
            <span className="text-green-600 font-bold">
              ${user.salary.toLocaleString()}
            </span>
          </p>
        )}

        <div className="pt-4 border-t mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Personal Statement / Bio
          </h3>
          {isEditing ? (
            <textarea
              value={newProfile}
              onChange={(e) => setNewProfile(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 h-32"
            />
          ) : (
            <p className="p-4 bg-gray-50 rounded-lg italic">{user.profile}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;