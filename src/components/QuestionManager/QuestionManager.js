import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import "./QuestionManager.css";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import {
  getClassesCount,
  getQuestions,
  getChaptersCount,
  getTopicsCount,
} from "../../api/services";

function QuestionManager() {
  // Function để xử lý sự kiện (chưa triển khai)

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [showQuestion, setShowQuestion] = useState([]);

  const config = {
    loader: { load: ["input/asciimath"] },
  };

  useEffect(() => {
    const fetchData = async () => {
      const classes = await getClassesCount();
      setClasses(classes);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await getQuestions();
      setQuestionsData(questions);
      setShowQuestion(questions);
    };
    fetchData();
  }, []);

  const handleClassChange = async (e) => {
    console.log(e.target.value);
    if (e.target.value === "0") {
      setChapters([]);
      setShowQuestion(questionsData);
      setSelectedClass("");
    } else {
      setSelectedClass(e.target.value);
      const chapters = await getChaptersCount(e.target.value);
      // console.log("valueeeeeeee", e.target.value);
      // console.log("xnxx>>>", questionsData[0].class_id);
      setChapters(chapters);
      const filteredQuestions = questionsData.filter(
        (question) => String(question.class_id) === e.target.value
      );
      setShowQuestion(filteredQuestions);
    }
  };

  const handleChapterChange = async (e) => {
    if (e.target.value === "0") {
      setTopics([]);
      setSelectedChapter("");
      const filteredQuestions = questionsData.filter(
        (question) => String(question.class_id) === selectedClass
      );
      setShowQuestion(filteredQuestions);
    } else {
      setSelectedChapter(e.target.value);
      const topics = await getTopicsCount(e.target.value);
      setTopics(topics);
      const filteredQuestions = questionsData.filter(
        (question) => String(question.chapter_id) === e.target.value
      );
      setShowQuestion(filteredQuestions);
    }
  };

  const handleTopicChange = (e) => {
    if (e.target.value === "0") {
      setShowQuestion([]);
      setSelectedTopic("");
      const filteredQuestions = questionsData.filter(
        (question) => String(question.chapter_id) === selectedChapter
      );
      setShowQuestion(filteredQuestions);
    } else {
      setSelectedTopic(e.target.value);
      const filteredQuestions = questionsData.filter(
        (question) => String(question.topic_id) === e.target.value
      );
      setShowQuestion(filteredQuestions);
    }
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
    <MathJaxContext config={config}>
      <div className="question-management">
        <div className="question-management-header">
          <select
            className="input-field"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="0">All Classes</option>
            {classes.map((cls, index) => (
              <option
                key={index}
                value={cls.class_id}
              >{`Grade ${cls.class_name} (${cls.question_count})`}</option>
            ))}
          </select>

          <select
            className="input-field"
            value={selectedChapter}
            onChange={handleChapterChange}
          >
            <option value="0">All Chapters</option>
            {chapters.map((chapter, index) => (
              <option key={index} value={chapter.chapter_id}>
                {`${chapter.chapter_name} (${chapter.question_count})`}
              </option>
            ))}
          </select>

          <select
            className="input-field"
            value={selectedTopic}
            onChange={handleTopicChange}
          >
            <option value="0">All Topics</option>
            {topics.map((topic, index) => (
              <option key={index} value={topic.topic_id}>
                {`${topic.topic_name} (${topic.question_count})`}
              </option>
            ))}
          </select>
        </div>
        <div className="question-management-table">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Content</th>
                {/* <th>Lớp</th>
              <th>Chương</th>
              <th>Chuyên đề</th> */}
                <th style={{ width: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {showQuestion.map((question, index) => (
                <tr key={question.id}>
                  <td>{index + 1}</td>

                  <td>
                    <MathJax dynamic>
                      <div>{question.content}</div>
                    </MathJax>
                  </td>
                  {/* <td>{question.class}</td>
                <td>{question.chapter}</td>
                <td>{question.topic}</td> */}
                  <td>
                    <button
                      onClick={() => handleEdit(question.id)}
                      className="edit-btn"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleEdit(question.id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default QuestionManager;
