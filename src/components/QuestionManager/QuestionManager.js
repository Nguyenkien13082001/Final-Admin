import React, { useState, useEffect, Fragment } from "react";
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

import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import { Form } from "react-bootstrap";

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
  const [showQuestionDetail, setShowQuestionDetail] = useState(false);
  const [search, setSearch] = useState("");

  const config = {
    loader: { load: ["input/asciimath"] }, //mathjax config
  };
  const fetchClasses = async () => {
    const classes = await getClassesCount();
    setClasses(classes);
  };

  const fetchQuestion = async () => {
    const questions = await getQuestions();
    setQuestionsData(questions);
    setShowQuestion(questions);
  };
  useEffect(() => {
    fetchClasses();
    fetchQuestion();
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

  const handleAddQuestion = async (question) => {
    console.log("Adding question:", question);
    const options = {
      value1: question.option1,
      value2: question.option2,
      value3: question.option3,
      value4: question.option4,
    };
    try {
      const response = await apiClient.post("/api/add_question_admin", {
        class_id: question.class_id,
        chapter_id: question.chapter_id,
        topic_id: question.topic_id,
        content: question.content,
        options: options,
        correct: question.correctOption,
        explaination: question.explain,
      });

      fetchQuestion();
      setSelectedChapter("");
      setSelectedClass("");
      setSelectedTopic("");

      toast.success("Add question successfully!");
    } catch (error) {
      console.error("Failed to add question:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = async (question, id) => {
    console.log("Editing question with id:", id);
    try {
      const response = await apiClient.put(`/api/update_question_admin`, {
        question_id: id,
        content: question.content,

        options: question.options,
        correct: question.correct,
        explaination: question.explaination,
      });
      fetchQuestion();
      toast.success("Update question successfully!");
    } catch (error) {
      console.error("Failed to update question:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting question with id:", id);

    try {
      if (window.confirm("Do you want to delete this question?")) {
        const response = await apiClient.delete(
          `/api/delete_question_admin?question_id=${id}`
        );
        const updatedQuestions = showQuestion.filter(
          (question) => question.id !== id
        );
        setShowQuestion(updatedQuestions);
        toast.success("Delete question successfully!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    const filteredQuestions = questionsData.filter((question) => {
      return question.content
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setShowQuestion(filteredQuestions);
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
        <div style={{ marginBottom: "10px" }}>
          <AddQuestion onAdd={handleAddQuestion} />
        </div>
        <Form className="d-flex">
          <Form.Control
            style={{ marginBottom: "10px" }}
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={handleChangeSearch}
          />
        </Form>
        <div className="question-management-table">
          <MathJax dynamic>
            <table>
              <thead>
                <tr className="csstr">
                  <th style={{ width: "2%" }}>No</th>
                  <th style={{ width: "20%" }}>Content</th>
                  <th>Opt1</th>
                  <th>Opt2</th>
                  <th>Opt3</th>
                  <th>Opt4</th>
                  {/* <th>Correct Answer</th> */}
                  <th style={{ width: "25%" }}>Explanation</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {showQuestion.map((question, index) => (
                  <tr key={question.id}>
                    <td>{index + 1}</td>

                    <td>
                      <div>{question.content}</div>
                    </td>

                    {question.answers.map((q) => (
                      <Fragment key={index}>
                        {/* sử dụng React.Fragment để nhóm các thẻ <td> */}

                        <td
                          style={{
                            color: q.answer.value1 === q.correct ? "red" : null,
                          }}
                        >
                          {q.answer.value1}
                        </td>
                        <td
                          style={{
                            color: q.answer.value2 === q.correct ? "red" : null,
                          }}
                        >
                          {q.answer.value2}
                        </td>
                        <td
                          style={{
                            color: q.answer.value3 === q.correct ? "red" : null,
                          }}
                        >
                          {q.answer.value3}
                        </td>
                        <td
                          style={{
                            color: q.answer.value4 === q.correct ? "red" : null,
                          }}
                        >
                          {q.answer.value4}
                        </td>
                        {/* <td>{q.correct}</td> */}
                        <td>{q.explaination}</td>
                      </Fragment>
                    ))}

                    <td className="Edit-Del">
                      <div className="action-buttons">
                        <div className="edit-btn">
                          <EditQuestion
                            question={question}
                            onSave={handleEdit}
                          />
                        </div>
                        <button
                          onClick={() => handleDelete(question.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MathJax>
        </div>
      </div>
    </MathJaxContext>
  );
}

export default QuestionManager;
