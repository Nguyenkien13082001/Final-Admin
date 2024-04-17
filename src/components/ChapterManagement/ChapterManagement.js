import React, { useState, useEffect } from "react";
import AddChapter from "./AddChapter";
import EditChapter from "./EditChapter";
import "./ChapterManagement.css";
import apiClient from "../../api/apiClient";
import { Form } from "react-bootstrap";
import { getClasses } from "../../api/services";
import { toast } from "react-toastify";

export default function ChapterManagement() {
  const [data, setData] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [chapters, setChapters] = useState([]);

  const fetchClassesAndSet = async () => {
    try {
      const classesData = await getClasses();
      console.log("data", classesData);
      setData(classesData);
      setSelectedClassId(classesData[0].id);
    } catch (error) {
      console.error("Could not fetch classes:", error);
    }
  };

  useEffect(() => {
    fetchClassesAndSet();
  }, []);

  const fetchChapters = async (new_class = 1) => {
    if (new_class) {
      try {
        const response = await apiClient.get(
          `/api/get_chapter_admin?class_id=${new_class}`
        );
        setChapters(response.chapters);
        console.log("chapters", response.chapters);
      } catch (error) {
        console.error("Could not fetch chapters for class:", new_class, error);
        setChapters([]);
      }
    }
  };
  useEffect(() => {
    fetchChapters();
  }, []);

  const handleClassChange = (e) => {
    let new_class = e.target.value;
    console.log("new_class", new_class);
    setSelectedClassId(new_class);
    fetchChapters(new_class);
  };

  const handleAddChapter = async (name, classId) => {
    try {
      const response = await apiClient.post("/api/add_chapter_admin", {
        class_id: classId,
        chapter_name: name,
      });
      // const updatedChapters = [...chapters, response.chapter];
      // setChapters(updatedChapters);
      // toast.success(response.message);
      fetchChapters(selectedClassId); // Tải lại chương cho lớp hiện tại
      toast.success("Chapter added successfully.");
    } catch (error) {
      console.error("Failed to add chapter:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      if (window.confirm(`Do you want to delete this chapter: ${name}?`)) {
        const response = await apiClient.delete(
          `/api/delete_chapter_admin?chapter_id=${id}`
        );
        const updatedChapters = chapters.filter((chapter) => chapter.id !== id);
        setChapters(updatedChapters);
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Failed to delete chapter:", error);
      toast.error("Failed to delete chapter");
    }
  };

  const handleEdit = async (id, name) => {
    try {
      const response = await apiClient.put(`/api/update_chapter_admin`, {
        chapter_id: id,
        chapter_name: name,
      });
      const updatedChapters = chapters.map((chapter) => {
        if (chapter.id === id) {
          return { ...chapter, name: name };
        }
        return chapter;
      });
      setChapters(updatedChapters);
      console.log("chapters", response.chapters);
      toast.success(response.message);
    } catch (error) {
      // console.error("Could not fetch chapters for class:", id, error);
      toast.error("Failed to update chapter");
    }
  };

  return (
    <div className="chapter-management">
      <h2 style={{ textAlign: "center" }}>Chapter Management</h2>
      <div className="add">
        <AddChapter onAdd={handleAddChapter} classList={data} />
      </div>

      <Form>
        <Form.Group>
          <Form.Label>Select Class</Form.Label>
          <Form.Control
            style={{ padding: "10px", marginBottom: "10px" }}
            as="select"
            value={selectedClassId}
            onChange={handleClassChange}
          >
            {data.map((classGroup) => (
              <option key={classGroup.id} value={classGroup.id}>
                Grade {classGroup.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      {chapters.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Chapter</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <tr key={chapter.id}>
                  <td>{chapter.name}</td>
                  <td className="Edit-Del">
                    <div className="action-buttons">
                      <div>
                        <EditChapter chapter={chapter} onSave={handleEdit} />
                      </div>
                      <button
                        onClick={() => handleDelete(chapter.id, chapter.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          No chapters found
        </div>
      )}
    </div>
  );
}
