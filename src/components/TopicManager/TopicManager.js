import React, { useState, useEffect } from "react";
import "./TopicManager.css";
import AddTopic from "./AddTopic";
import EditTopic from "./EditTopic";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { getClasses } from "../../api/services";

export default function TopicManager() {
  const [topic, setTopic] = useState([]);
  const [data, setData] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("1");
  const [selectedChapterId, setSelectedChapterId] = useState("1");
  const [chapters, setChapters] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [isEnable, setIsEnable] = useState(true);
  const [search, setSearch] = useState("");
  const [search_topic, setSearchTopic] = useState("");

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
    console.log("new_class", new_class);
    if (new_class) {
      try {
        const response = await apiClient.get(
          `/api/get_chapter_admin?class_id=${new_class}`
        );
        setChapters(response.chapters);
        fetchTopic(response.chapters[0].id);
        setIsEnable(true);
      } catch (error) {
        setIsEnable(false);
        setChapters([]);
        setTopic([]);
      }
    }
  };
  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchTopic = async (chapter) => {
    setSelectedChapterId(chapter);
    try {
      const response = await apiClient.get(
        `/api/get_topic_admin?chapter_id=${chapter}`
      );

      setTopic(response.topics);
      setSearchTopic(response.topics);
    } catch (error) {
      setTopic([]);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, []);

  const handleAddTopic = async (name, chapterId) => {
    if (!name || !chapterId) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await apiClient.post("/api/add_topic_admin", {
        chapter_id: chapterId,
        topic_name: name,
      });
      fetchTopic(chapterId);
      toast.success(response.message);
      setTopicName("");
    } catch (error) {
      console.error("Failed to add topic:", error);
      toast.error(error.response.data.message);
      setTopicName("");
    }
  };

  const handleDelete = async (id, name) => {
    try {
      if (
        window.confirm(`Are you sure you want to delete this topic: ${name}?`)
      ) {
        const response = await apiClient.delete(
          `/api/delete_topic_admin?topic_id=${id}`
        );
        // Cập nhật state để phản ánh thay đổi
        const updatedTopics = topic.filter((tp) => tp.id !== id); // tạo một mảng mới, bao gồm tất cả các topic ngoại trừ topic có id bằng với id được cung cấp
        setTopic(updatedTopics);
        setSearchTopic(updatedTopics);
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  const handleEdit = async (id, name) => {
    try {
      const response = await apiClient.put(`/api/update_topic_admin`, {
        topic_id: id,
        topic_name: name,
      });
      // Cập nhật state để phản ánh thay đổi
      const updatedTopics = topic.map((tp) => {
        if (tp.id === id) {
          return { ...tp, name: name };
        }
        return tp;
      });
      setTopic(updatedTopics);
      setSearchTopic(updatedTopics);
      toast.success(response.message);
    } catch (error) {
      console.error("Failed to update topic:", error);
      toast.error("Failed to update topic");
    }
  };

  const handleClassChange = (e) => {
    let new_class = e.target.value;
    setSelectedClassId(new_class);
    fetchChapters(new_class);
  };

  const handleChapterChange = (e) => {
    let chapter = e.target.value;
    setSelectedChapterId(chapter);
    fetchTopic(chapter);
  };

  const handleInputChange = (e) => {
    console.log(selectedChapterId);
    setTopicName(e.target.value);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filteredTopics = topic.filter((tp) =>
      tp.name.toLowerCase().includes(searchValue)
    );
    setSearchTopic(filteredTopics);
  };

  return (
    <div className="Topic-management">
      <h2 style={{ textAlign: "center" }}>Topic Management</h2>

      <div className="add">
        {/* <AddTopic></AddTopic> */}
        {isEnable && (
          <div>
            <input
              className="input-add-topic"
              type="text"
              value={topicName}
              onChange={handleInputChange}
            />

            <button
              className="btn-add-topic"
              onClick={() => {
                handleAddTopic(topicName, selectedChapterId);
              }}
            >
              Add Topic
            </button>
          </div>
        )}
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

        <Form.Group>
          <Form.Label>Select Chapter</Form.Label>
          <Form.Control
            style={{ padding: "10px", marginBottom: "10px" }}
            as="select"
            value={selectedChapterId}
            onChange={handleChapterChange}
            disabled={!isEnable}
          >
            {chapters.length === 0 && (
              <option value="">No chapter, please add more chapter!!!</option>
            )}
            {chapters.map((chappterGroup) => (
              <option key={chappterGroup.id} value={chappterGroup.id}>
                {chappterGroup.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
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
      </Form>
      {topic.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th style={{ width: "50%" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {search_topic &&
              search_topic.map((topic) => (
                <tr key={topic.id}>
                  <td>{topic.name}</td>

                  <td className="Edit-Del">
                    <div className="action-buttons">
                      <div>
                        <EditTopic topic={topic} onsave={handleEdit} />
                        {/* Giả sử EditAccount là một component nút */}
                      </div>
                      <button
                        onClick={() => handleDelete(topic.id, topic.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          No topic found
        </div>
      )}
    </div>
  );
}
