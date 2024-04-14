import React, { useState } from "react";
import AddChapter from "./AddChapter";
import EditChapter from "./EditChapter";
import "./ChapterManagement.css";

const initialUsers = [
  {
    id: 1,
    // image: "path_to_image1.jpg",

    Chapter: "Hình Học",
  },
  {
    id: 2,
    // image: "path_to_image2.jpg",

    Chapter: "Số Học",
  },
  // Thêm các người dùng khác theo mẫu trên
];

export default function ChapterManagement() {
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
    <div className="chapter-management">
      <h2 style={{ textAlign: "center" }}>Chapter Management</h2>
      {/* <button onClick={handleAddUser}>Thêm Tài Khoản</button> */}
      <div className="add">
        <AddChapter></AddChapter>
      </div>
      <table>
        <thead>
          <tr>
            <th>Chapter</th>
            <th style={{ width: "50%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.Chapter}</td>

              <td className="Edit-Del">
                <div className="action-buttons">
                  <div onClick={() => handleEdit(user.id)}>
                    <EditChapter />
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
