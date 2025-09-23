import React, { useState } from "react";
import api from "../api/axios";
import { Icon } from "@iconify/react";

const allowedPositions = [
  "Co-Head",
  "Co-Head, Senior Leader",
  "Corrdinator",
  "Corrdinator, Junior Leader",
  "Head",
  "Junior",
  "Junior Leader",
  "Junior Leader, Corrdinator",
  "Senior Leader",
  "Senior Leader, Co-Head"
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
      await api.put(
        `users/${user.id}`,
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
      await api.post(
        `updatePregisterUserPosition/${user.id}`,
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-7 flex flex-col items-center z-10 border animate-fade-in">
          <h3 className="font-bold text-lg mb-4 text-blue-900 text-center">Choose Edit Mode</h3>
          <button
            className="w-full mb-3 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition text-center flex items-center justify-center gap-2"
            onClick={() => setMode("info")}
          >
            <Icon icon="mdi:account-edit" width="20" />
            <span>Edit User Info</span>
          </button>
          <button
            className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow transition text-center flex items-center justify-center gap-2"
            onClick={() => setMode("position")}
          >
            <Icon icon="mdi:swap-horizontal" width="20" />
            <span>Edit Position Only</span>
          </button>
          <button
            className="w-full mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition"
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-7 flex flex-col z-10 border animate-fade-in">
          <h3 className="font-bold text-lg mb-4 text-blue-900 flex items-center gap-2">
            <Icon icon="mdi:account-edit" width="20" />
            <span>Edit User Info</span>
          </h3>
          <label className="text-xs text-gray-500 mb-1 block">Name</label>
          <input
            className="border w-full rounded-xl px-3 py-3 text-sm mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-xs text-gray-500 mb-1 block">Email</label>
          <input
            className="border w-full rounded-xl px-3 py-3 text-sm mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <div className="bg-red-100 text-red-700 rounded-xl mb-3 text-xs p-3 text-center shadow">{error}</div>
          )}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-3">
            <button
              className="flex-1 sm:flex-none bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl text-gray-700 border border-gray-200 font-semibold transition"
              onClick={() => setMode(null)}
              disabled={loading}
            >
              Back
            </button>
            <button
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold shadow transition"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-7 flex flex-col z-10 border animate-fade-in">
        <h3 className="font-bold text-lg mb-4 text-green-800 flex items-center gap-2">
          <Icon icon="mdi:swap-horizontal" width="20" />
          <span>Edit Position Only</span>
        </h3>
        <label className="text-xs text-gray-500 mb-1 block">Position</label>
        <select
          className="border w-full rounded-xl px-3 py-3 text-sm mb-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          <div className="bg-red-100 text-red-700 rounded-xl mb-3 text-xs p-3 text-center shadow">{error}</div>
        )}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-3">
          <button
            className="flex-1 sm:flex-none bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl text-gray-700 border border-gray-200 font-semibold transition"
            onClick={() => setMode(null)}
            disabled={loading}
          >
            Back
          </button>
          <button
            className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl text-white font-semibold shadow transition"
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