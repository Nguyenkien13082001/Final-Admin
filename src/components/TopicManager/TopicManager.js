import React, { useState } from "react";
import "./TopicManager.css";
import AddTopic from "./AddTopic";
import EditTopic from "./EditTopic";

const initialUsers = [
  {
    id: 1,
    // image: "path_to_image1.jpg",

    Topic: "Chuyên đề 1",
  },
  {
    id: 2,
    // image: "path_to_image2.jpg",

    Topic: "Chuyên đề 2",
  },
  // Thêm các người dùng khác theo mẫu trên
];

export default function TopicManager() {
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
    <div className="Topic-management">
      <h2 style={{ textAlign: "center" }}>Topic Management</h2>
      {/* <button onClick={handleAddUser}>Thêm Tài Khoản</button> */}
      <div className="add">
        <AddTopic></AddTopic>
      </div>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th style={{ width: "50%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.Topic}</td>

              <td className="Edit-Del">
                <div className="action-buttons">
                  <div onClick={() => handleEdit(user.id)}>
                    <EditTopic />
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
