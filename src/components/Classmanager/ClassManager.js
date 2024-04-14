import React, { useState } from "react";
import AddClass from "./AddClass";
import EditClass from "./EditClass";
import "./ClassManager.css";
const initialUsers = [
  {
    id: 1,
    // image: "path_to_image1.jpg",

    class: "10A1",
  },
  {
    id: 2,
    // image: "path_to_image2.jpg",

    class: "10A2",
  },
  // Thêm các người dùng khác theo mẫu trên
];

export default function ClassManager() {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEdit = (id) => {
    console.log("Edit user with id:", id);
    // Thêm logic để sửa thông tin người dùng
  };
  return (
    <div className="class-management">
      <h2 style={{ textAlign: "center" }}>Class Management</h2>
      {/* <button onClick={handleAddUser}>Thêm Tài Khoản</button> */}
      <div className="add">
        <AddClass></AddClass>
      </div>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th style={{ width: "50%" }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.class}</td>

              <td className="Edit-Del">
                <div className="action-buttons">
                  <div onClick={() => handleEdit(user.id)}>
                    <EditClass />
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
