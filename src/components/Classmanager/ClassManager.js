import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import AddClass from "./AddClass";
import EditClass from "./EditClass";
import "./ClassManager.css";
import { toast } from "react-toastify";

export default function ClassManager() {
  // const [users, setUsers] = useState(initialUsers);
  const [classes, setclasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await apiClient.get("/api/get_class_admin");
      // console.log("class", response);
      setclasses(response.classes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  //tạo thông báo hỏi người dùng trước khi xóa
  const confirmDelete = (id) => {
    if (window.confirm("Do you want to delete this class?")) {
      handleDelete(id);
    }
  };

  const handleAddClass = async (name) => {
    try {
      const response = await apiClient.post("/api/add_class_admin", {
        class_name: name,
      });
      // Cập nhật state để phản ánh thay đổi, hiển thị data được thêm mới
      fetchClasses();
      toast.success(response.message);
      // console.log(response.message);
    } catch (error) {
      console.error("Failed to add class:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiClient.delete(
        `/api/delete_class_admin?class_id=${id}`
      );
      // Cập nhật state để phản ánh thay đổi
      const updatedClasses = classes.filter((cls) => cls.id !== id); // tạo một mảng mới, bao gồm tất cả các lớp học ngoại trừ lớp có id bằng với id được cung cấp
      setclasses(updatedClasses);
      toast.success(response.message);
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  const handleEdit = async (id, newName) => {
    try {
      const response = await apiClient.put(`/api/update_class_admin`, {
        class_name: newName,
        class_id: id,
      });
      // Cập nhật state để phản ánh thay đổi
      const updatedClasses = classes.map((cls) =>
        cls.id === id ? { ...cls, name: newName } : cls
      );
      setclasses(updatedClasses);
      toast.success(response.message);
    } catch (error) {
      console.error("Failed to update class:", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="class-management">
      <h2 style={{ textAlign: "center" }}>Class Management</h2>
      {/* <button onClick={handleAddUser}>Thêm Tài Khoản</button> */}
      <div className="add">
        <AddClass onAdd={handleAddClass} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th style={{ width: "50%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.name}</td>

              <td className="Edit-Del">
                <div className="action-buttons">
                  <EditClass classInfo={cls} onSave={handleEdit} />
                  <button onClick={() => confirmDelete(cls.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
