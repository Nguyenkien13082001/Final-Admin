import React, { useState } from "react";
import "./UserManagement.css";
import AddAccount from "./AddAccount";
import EditAccount from "./EditAccount";

const initialUsers = [
  {
    id: 1,
    // image: "path_to_image1.jpg",
    name: "Nguyen Van A",
    email: "email1@example.com",
    class: "10A1",
    role: "Học sinh",
    actions: "",
  },
  {
    id: 2,
    // image: "path_to_image2.jpg",
    name: "Tran Thi B",
    email: "email2@example.com",
    class: "10A2",
    role: "Học sinh",
    actions: "",
  },
  // Thêm các người dùng khác theo mẫu trên
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = () => {
    // Thêm logic để thêm người dùng mới
    console.log("Add new user");
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    // Thêm logic để sửa thông tin người dùng
  };

  return (
    <div className="user-management">
      <h2 style={{ textAlign: "center" }}>Account Management</h2>
      {/* <button onClick={handleAddUser}>Thêm Tài Khoản</button> */}
      <div className="add">
        <AddAccount></AddAccount>
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>Ảnh</th> */}
            <th>Tên</th>
            <th>Email</th>
            <th>Class</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* <td>
                <img
                  src={user.image}
                  alt={user.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td> */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.class}</td>
              <td>{user.role}</td>

              <td className="Edit-Del">
                <div className="action-buttons">
                  <div onClick={() => handleEdit(user.id)}>
                    <EditAccount />{" "}
                    {/* Giả sử EditAccount là một component nút */}
                  </div>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
