import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

 const allowedPositions = [
  "Head",
  "CoHead",
  "Senior leader",
  "Junior leader",
  "Volunteer"
];




export default function PopoverEditUser({ user, onClose, onSaved }) {
  const [mode, setMode] = useState(null); 
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [position, setPosition] = useState(user.position || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSaveInfo = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("accessToken");
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/users/${user.id}`,
        { name, email }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSaved();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "An error occurred while updating user."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSavePosition = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/updatePosition/${user.id}`,
        { NewPosition: position }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSaved();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "An error occurred while updating position."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!mode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-[340px] p-7 flex flex-col items-center z-10 border animate-fade-in">
          <h3 className="font-bold text-lg mb-4 text-blue-900">Choose Edit Mode</h3>
          <button
            className="w-full mb-3 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition text-center"
            onClick={() => setMode("info")}
          >
            <Icon icon="mdi:account-edit" className="inline mr-2" width="20" />
            Edit User Info
          </button>
          <button
            className="w-full px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow transition text-center"
            onClick={() => setMode("position")}
          >
            <Icon icon="mdi:swap-horizontal" className="inline mr-2" width="20" />
            Edit Position Only
          </button>
          <button
            className="w-full mt-7 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (mode === "info") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-[340px] p-7 flex flex-col z-10 border animate-fade-in">
          <h3 className="font-bold text-lg mb-4 text-blue-900 flex items-center gap-2">
            <Icon icon="mdi:account-edit" width="20" />
            Edit User Info
          </h3>
          <label className="text-xs text-gray-500 mb-1 block">Name</label>
          <input
            className="border w-full rounded-xl px-3 py-2 text-sm mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-xs text-gray-500 mb-1 block">Email</label>
          <input
            className="border w-full rounded-xl px-3 py-2 text-sm mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <div className="bg-red-100 text-red-700 rounded-xl mb-2 text-xs p-2 text-center shadow">{error}</div>
          )}
          <div className="flex justify-end gap-2 mt-3">
            <button
              className="bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl text-gray-700 border border-gray-200 font-semibold transition"
              onClick={() => setMode(null)}
              disabled={loading}
            >
              Back
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold shadow transition"
              onClick={handleSaveInfo}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[340px] p-7 flex flex-col z-10 border animate-fade-in">
        <h3 className="font-bold text-lg mb-4 text-green-800 flex items-center gap-2">
          <Icon icon="mdi:swap-horizontal" width="20" />
          Edit Position Only
        </h3>
        <label className="text-xs text-gray-500 mb-1 block">Position</label>
        <select
  className="border w-full rounded-xl px-3 py-2 text-sm mb-3"
  value={position}
  onChange={(e) => setPosition(e.target.value)}
>
  <option value="">Select position</option>
  {allowedPositions.map((pos) => (
    <option key={pos} value={pos}>
      {pos}
    </option>
  ))}
</select>

        {error && (
          <div className="bg-red-100 text-red-700 rounded-xl mb-2 text-xs p-2 text-center shadow">{error}</div>
        )}
        <div className="flex justify-end gap-2 mt-3">
          <button
            className="bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl text-gray-700 border border-gray-200 font-semibold transition"
            onClick={() => setMode(null)}
            disabled={loading}
          >
            Back
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl text-white font-semibold shadow transition"
            onClick={handleSavePosition}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
