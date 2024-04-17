import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import "./UserManagement.css";
import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";
import { toast } from "react-toastify";
// Thêm các người dùng khác theo mẫu trên

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/api/get_all_users_admin");
      // console.log("class", response);
      setUsers(response.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const confirmDelete = (id) => {
    if (window.confirm("Do you want to delete this class?")) {
      handleDelete(id);
    }
  };
  const handleAddUser = async (name, email, dob, role) => {
    try {
      const response = await apiClient.post("/api/add_user_admin", {
        name: name,
        email: email,
        dob: dob,
        status: role,
      });
      // Cập nhật state để phản ánh thay đổi, hiển thị data được thêm mới
      fetchUsers();
      toast.success(response.message);
      // console.log(response.message);
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiClient.delete(
        `/api/delete_user_admin?user_id=${id}`
      );
      // Cập nhật state để phản ánh thay đổi
      const updatedUsers = users.filter((user) => user.ID !== id); // tạo một mảng mới, bao gồm tất cả các người dùng ngoại trừ người dùng có id bằng với id được cung cấp
      setUsers(updatedUsers);
      toast.success(response.message);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = async (id, role) => {
    try {
      const response = await apiClient.put(`/api/update_user_admin`, {
        user_id: id,
        status: role,
      });
      // Cập nhật state để phản ánh thay đổi
      const updatedUser = users.map((user) =>
        user.ID === id ? { ...user, Status: role } : user
      );
      setUsers(updatedUser);
      toast.success(response.message);
    } catch (error) {
      console.error("Failed to update class:", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="user-management">
      <h2 style={{ textAlign: "center" }}>Account Management</h2>
      {/* <button onClick={handleAddUser}>Thêm Tài Khoản</button> */}
      <div className="add">
        <AddAccount onAdd={handleAddUser}></AddAccount>
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>Ảnh</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>DoB</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.ID}>
              {/* <td>
                <img
                  src={user.image}
                  alt={user.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td> */}
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.DoB}</td>
              <td>{user.Status}</td>

              <td className="Edit-Del">
                <div className="action-buttons">
                  <div>
                    <EditAccount userInfo={user} onSave={handleEdit} />{" "}
                    {/* Giả sử EditAccount là một component nút */}
                  </div>
                  <button onClick={() => confirmDelete(user.ID)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
