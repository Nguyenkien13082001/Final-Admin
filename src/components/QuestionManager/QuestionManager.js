import React, { useState } from "react";
import "./QuestionManager.css";

// Giả định dữ liệu
const questionsData = [
  {
    id: 1,
    content: "Câu hỏi về toán học",
    class: 10,
    chapter: "Chương 1",
    topic: "Đại số",
  },
  {
    id: 2,
    content: "Câu hỏi về hóa học",
    class: 11,
    chapter: "Chương 2",
    topic: "Hóa hữu cơ",
  },
  // ... thêm câu hỏi ...
];

const classes = ["10", "11", "12"];
const chapters = ["Chương 1", "Chương 2", "Chương 3"];
const topics = ["Đại số", "Hình học", "Giải tích"];

function QuestionManager() {
  // Function để xử lý sự kiện (chưa triển khai)

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  // Function để xử lý sự kiện thay đổi dropdown
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleSearch = () => {
    console.log("Tìm kiếm với:", selectedClass, selectedChapter, selectedTopic);
    // Bạn sẽ thực hiện tìm kiếm dựa trên các giá trị được chọn ở đây
  };
  const handleEdit = (id) => {
    console.log("Editing question with id:", id);
    // Logic để chỉnh sửa câu hỏi
  };

  const handleDelete = (id) => {
    console.log("Deleting question with id:", id);
    // Logic để xóa câu hỏi
  };

  return (
    <div className="question-management">
      <div className="question-management-header">
        <select
          className="input-field"
          value={selectedClass}
          onChange={handleClassChange}
        >
          <option value="">Khối lớp</option>
          {classes.map((cl, index) => (
            <option key={index} value={cl}>{`Khối ${cl}`}</option>
          ))}
        </select>

        <select
          className="input-field"
          value={selectedChapter}
          onChange={handleChapterChange}
        >
          <option value="">Chương</option>
          {chapters.map((chapter, index) => (
            <option key={index} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>

        <select
          className="input-field"
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <option value="">Chuyên đề</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <button className="search-btn" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
      <div className="question-management-table">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Nội dung câu hỏi</th>
              <th>Lớp</th>
              <th>Chương</th>
              <th>Chuyên đề</th>
              <th style={{ width: "20%" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {questionsData.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.content}</td>
                <td>{question.class}</td>
                <td>{question.chapter}</td>
                <td>{question.topic}</td>
                <td>
                  <button
                    onClick={() => handleEdit(question.id)}
                    className="edit-btn"
                  >
                    Xem
                  </button>

                  <button
                    onClick={() => handleEdit(question.id)}
                    className="edit-btn"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="delete-btn"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuestionManager;
