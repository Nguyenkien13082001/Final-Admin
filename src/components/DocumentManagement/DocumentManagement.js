import React, { useState, useEffect } from "react";
import "./DocumentManagement.css"; // Import your CSS file
import apiClient from "../../api/apiClient";
import EditDocumentManagement from "./EditDocumentManagement";
import { toast } from "react-toastify";
import AddDocument from "./AddDocument";
import { Form } from "react-bootstrap";
import { getClasses } from "../../api/services";
import { Button } from "react-bootstrap";

export default function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [data, setData] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("0");

  const fetchDocuments = async () => {
    try {
      const response = await apiClient.get("/api/get_all_documents");
      setDocuments(response.documents); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    // Hàm để lấy dữ liệu từ API
    fetchDocuments(); // Gọi hàm lấy dữ liệu
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần

  const fetchClassesAndSet = async () => {
    try {
      const classesData = await getClasses();
      console.log("data", classesData);
      setData(classesData);
    } catch (error) {
      console.error("Could not fetch classes:", error);
    }
  };

  useEffect(() => {
    fetchClassesAndSet();
  }, []);

  useEffect(() => {
    const fetchDocumentsByClass = async () => {
      if (selectedClassId === "0") {
        // Nếu lựa chọn là "All Class"
        fetchDocuments(); // Gọi lại hàm lấy tất cả tài liệu
      } else if (selectedClassId) {
        // Nếu có một lớp cụ thể được chọn
        try {
          const response = await apiClient.get(
            `/api/get_document_by_class?class_id=${selectedClassId}`
          );
          setDocuments(response.documents);
        } catch (error) {
          console.error("Error fetching documents by class:", error);
        }
      } else {
        setDocuments([]); // Xử lý trường hợp không có lớp nào được chọn (nếu cần)
      }
    };

    fetchDocumentsByClass(); // Chạy hàm fetch khi selectedClassId thay đổi
  }, [selectedClassId]); // Dependency là selectedClassId để re-fetch khi giá trị thay đổi

  const handleAddDocument = async (name, file, class_id) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("class_id", class_id);

    try {
      const response = await apiClient({
        method: "post",
        url: "/api/add_document",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.message);
      fetchDocuments();
    } catch (error) {
      toast.error("Error adding post: " + error.response.data.message);
    }
  };

  const handleClassChange = (e) => {
    const newClassId = e.target.value;
    if (newClassId !== selectedClassId) {
      // Chỉ cập nhật khi có sự thay đổi
      setSelectedClassId(newClassId);
    }
  };
  const handleEdit = async (id, name, file) => {
    const formData = new FormData();
    formData.append("document_id", id);
    formData.append("name", name);
    console.log("check1", file);

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await apiClient({
        method: "put",
        url: "/api/update_document",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      toast.success(response.message);
      fetchDocuments();
    } catch (error) {
      toast.error("Error adding post: " + error.response.data.message);
    }
  };

  const handleDelete = async (id, name) => {
    console.log("id", id);
    try {
      if (window.confirm(`Do you want to delete this document: ${name}?`)) {
        const response = await apiClient.delete(
          `/api/delete_document?document_id=${id}`
        );

        const updatedDocuments = documents.filter(
          (document) => document.document_id !== id
        );

        setDocuments(updatedDocuments);
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
      toast.error("Failed to delete document");
    }
  };

  return (
    <div className="Documentmng">
      <h1>Document Management</h1>
      <div className="addDcm">
        <AddDocument onAdd={handleAddDocument} classList={data} />
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
            <option value="0">All Class</option>
            {data.map((classGroup) => (
              <option key={classGroup.id} value={classGroup.id}>
                Grade {classGroup.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>thumbnail</th>
            <th>Date Submitted</th>
            <th>Class</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={doc.document_id}>
              <td data-label="ID">{index + 1}</td>
              <td data-label="Name">{doc.name}</td>
              <td data-label="thumbnail">
                <a href={doc.url} title={doc.url}>
                  <img
                    src={doc.thumbnail}
                    alt="Document"
                    className="thumbnail"
                  />
                </a>
              </td>
              <td data-label="created_at">{doc.created_at}</td>
              <td data-label="class_name">{doc.class_name}</td>
              <td data-label="url">
                <a href={doc.url} title={doc.url}>
                  {doc.url}
                </a>
              </td>
              <td>
                <div className="btndcment">
                  <EditDocumentManagement doc={doc} onSave={handleEdit} />

                  <Button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete(doc.document_id, doc.name)}
                    className="button red"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
