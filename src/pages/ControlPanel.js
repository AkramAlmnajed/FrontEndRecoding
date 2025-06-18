import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Header from "../components/Header/header";
import ModalAddUser from "../components/PopUp/AddUser";
import PopoverEditUser from "../components/PopUp/PopoverEditUser";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 2200);
    return () => clearTimeout(timer);
  }, [message]);
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[99]">
      <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in-up">
        <Icon icon="mdi:check-circle" className="text-white" width="22" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

export default function ControlPanel() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [toast, setToast] = useState(""); // إشعار بسيط

  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [lastPage, setLastPage] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);

  const fetchUsers = async (page = currentPage, pageSize = perPage) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Authentication token not found. Please login again.");
        setLoading(false);
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users?page=${page}&per_page=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsersData(response.data.data);
      setTotalUsers(response.data.total);
      setPerPage(response.data.per_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized. Please check your access token.");
      } else {
        setError("Error while fetching data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, perPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= lastPage) setCurrentPage(page);
  };

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleDeleteUser = async (id) => {
    setDeleteLoadingId(id);
    const token = localStorage.getItem("accessToken");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast("User deleted successfully!");
      await fetchUsers();
    } catch (err) {
      setToast(
        err.response?.data?.message || "Error occurred while deleting the user."
      );
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const renderPageNumbers = () => {
    let pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(lastPage, currentPage + 2);

    if (end - start < 4) {
      if (start === 1) end = Math.min(lastPage, start + 4);
      if (end === lastPage) start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded-full ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Toast message={toast} onClose={() => setToast("")} />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-5xl font-light mb-14">Control Panel:</h1>

        <div className="bg-white rounded-xl shadow">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <span className="text-gray-600">
              All Users:{" "}
              <span className="font-medium text-gray-900">{totalUsers}</span>
            </span>
            <button
              className="px-4 py-2 text-sm border border-blue-400 text-blue-500 rounded-full hover:bg-blue-50"
              onClick={handleOpenModal}
            >
              Add User
            </button>
            <ModalAddUser show={modalVisible} onClose={handleCloseModal} />
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading ...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed">
                  <thead>
                    <tr className="text-gray-500 text-sm font-medium">
                      <th className="w-12 px-2"></th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4">Email</th>
                      <th className="px-16">Position</th>
                      <th className="px-4">Department</th>
                      <th className="px-4">Layer</th>
                      <th className="px-4">Status</th>
                      <th className="w-20 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {usersData.map((user, idx) => (
                      <tr
                        key={user.id || idx}
                        className="text-gray-700 text-sm"
                      >
                        <td className="px-2">
                          <input type="checkbox" />
                        </td>
                        <td className="flex items-center px-4 py-3 space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                            <Icon icon="mdi:account" width="22" />
                          </div>
                          <span>{user.name}</span>
                        </td>
                        <td className="px-4">{user.email}</td>
                        <td className="px-16">{user.position}</td>
                        <td className="px-4">{user.department}</td>
                        <td className="px-4">{user.layer}</td>
                        <td className="px-4">
                          <span
                            className={
                              "py-1 px-4 rounded-full text-xs font-bold " +
                              (user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "Pause"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800")
                            }
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 flex items-center space-x-2 relative">
                          <Icon
                            icon="mdi:pencil"
                            className="text-blue-400 cursor-pointer hover:text-blue-700"
                            width="20"
                            title="Edit"
                            onClick={() => setEditUser(user)}
                          />
                          <Icon
                            icon="mdi:delete-outline"
                            className={`text-red-500 cursor-pointer hover:text-red-700 ${
                              deleteLoadingId === user.id
                                ? "opacity-50 pointer-events-none"
                                : ""
                            }`}
                            width="20"
                            title="Delete"
                            onClick={() => setConfirmDeleteId(user.id)}
                          />
                          {editUser && editUser.id === user.id && (
                            <PopoverEditUser
                              user={editUser}
                              onClose={() => setEditUser(null)}
                              onSaved={fetchUsers}
                            />
                          )}
                          {confirmDeleteId === user.id && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                              <div
                                className="fixed inset-0 bg-black/40"
                                onClick={() => setConfirmDeleteId(null)}
                              />
                              <div className="relative bg-white rounded-xl shadow-2xl p-7 min-w-[340px] flex flex-col items-center z-10 border">
                                <Icon
                                  icon="mdi:alert-circle"
                                  className="text-red-400 mb-3"
                                  width="38"
                                />
                                <div className="text-lg font-medium text-gray-800 mb-2">
                                  Delete user?
                                </div>
                                <div className="text-sm text-gray-500 mb-5 text-center">
                                  Are you sure you want to delete this user?
                                  This action can't be undone.
                                </div>
                                <div className="flex gap-4">
                                  <button
                                    className="bg-gray-100 hover:bg-gray-200 px-5 py-1.5 rounded font-medium text-gray-600 border border-gray-200"
                                    onClick={() => setConfirmDeleteId(null)}
                                    disabled={deleteLoadingId === user.id}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="bg-red-600 hover:bg-red-700 px-7 py-1.5 rounded text-white font-semibold shadow transition"
                                    onClick={() => {
                                      setConfirmDeleteId(null);
                                      handleDeleteUser(user.id);
                                    }}
                                    disabled={deleteLoadingId === user.id}
                                  >
                                    {deleteLoadingId === user.id
                                      ? "Deleting..."
                                      : "Delete"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center pt-4 mt-8 gap-4">
                <div className="text-gray-500 text-sm">
                  Showing {(currentPage - 1) * perPage + 1}-
                  {(currentPage - 1) * perPage + usersData.length} of{" "}
                  {totalUsers}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 mx-1 disabled:opacity-50"
                  >
                    <Icon icon="mdi:chevron-left" width="22" />
                  </button>
                  {renderPageNumbers()}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 mx-1 disabled:opacity-50"
                  >
                    <Icon icon="mdi:chevron-right" width="22" />
                  </button>
                </div>
                <div className="text-gray-500 text-sm">
                  Users per page{" "}
                  <select
                    value={perPage}
                    onChange={(e) => {
                      setPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-transparent border border-gray-200 text-sm text-gray-700 rounded px-2 py-1 ml-2"
                  >
                    {[10, 25, 50].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
