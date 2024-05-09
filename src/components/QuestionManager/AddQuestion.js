import React, { useState, useEffect } from "react";
import {
  getClassesCount,
  getChaptersCount,
  getTopicsCount,
} from "../../api/services";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

function AddQuestion({ onAdd }) {
  const [classes, setClasses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const [content, setContent] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [explain, setExplain] = useState("");
  // const [isEnable, setIsEnable] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedClass("");
    setSelectedChapter("");
    setSelectedTopic("");
    setContent("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectOption("");
    setExplain("");

    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const classes = await getClassesCount();
      setClasses(classes);
    };
    fetchData();
  }, []);

  const handleClassChange = async (e) => {
    console.log(e.target.value);
    if (e.target.value === "0") {
      setChapters([]);
      setTopics([]);
      setSelectedClass("");
      // setIsEnable(false);
    } else {
      setSelectedClass(e.target.value);
      const chapters = await getChaptersCount(e.target.value);
      console.log("chapters", chapters);
      setChapters(chapters);
    }
  };

  const handleChapterChange = async (e) => {
    if (e.target.value === "0") {
      setTopics([]);
      setSelectedChapter("");
      // setIsEnable(false);
    } else {
      setSelectedChapter(e.target.value);
      const topics = await getTopicsCount(e.target.value);
      setTopics(topics);
    }
  };

  const handleTopicChange = (e) => {
    if (e.target.value === "0") {
      setSelectedTopic("");
      // setIsEnable(false);
    } else {
      // setIsEnable(true);
      setSelectedTopic(e.target.value);
    }
  };

  const handleSave = () => {
    if (
      !selectedClass ||
      !selectedChapter ||
      !selectedTopic ||
      !content ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctOption
    ) {
      toast.warning("Please fill in all fields.");
      return;
    }

    const options = [option1, option2, option3, option4];
    const uniqueOptions = new Set(options);

    if (options.length !== uniqueOptions.size) {
      toast.warning("Options must be unique");
      return;
    }
    onAdd({
      class_id: selectedClass,
      chapter_id: selectedChapter,
      topic_id: selectedTopic,
      content,
      explain,
      option1,
      option2,
      option3,
      option4,
      correctOption,
      // Bạn có thể thêm các trường dữ liệu khác được thu thập từ form nếu cần
    });
    setSelectedClass("");
    setSelectedChapter("");
    setSelectedTopic("");
    setContent("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectOption("");
    setExplain("");
    setChapters([]);
    setTopics([]);

    setShow(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Question
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridClass">
                <Form.Label>Class</Form.Label>
                <Form.Select value={selectedClass} onChange={handleClassChange}>
                  <option value="0"> ChooseClass </option>
                  {classes.map((cls, index) => (
                    <option
                      key={index}
                      value={cls.class_id}
                    >{`Grade ${cls.class_name} (${cls.question_count})`}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridChapter">
                <Form.Label>Chapter</Form.Label>
                <Form.Select
                  value={selectedChapter}
                  onChange={handleChapterChange}
                >
                  <option value="0">ChooseChapter</option>
                  {chapters.map((chapter, index) => (
                    <option key={index} value={chapter.chapter_id}>
                      {`${chapter.chapter_name} (${chapter.question_count})`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Select value={selectedTopic} onChange={handleTopicChange}>
                  <option value="0">ChooseTopic</option>
                  {topics.map((topic, index) => (
                    <option key={index} value={topic.topic_id}>
                      {`${topic.topic_name} (${topic.question_count})`}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="formGridContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <fieldset style={{ marginTop: "10px" }}>
              <Form.Group as={Row} className="mb-3">
                <Col sm={10}>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        placeholder="Option 1"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onChange={() => setCorrectOption(option1)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        placeholder="Option 2"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onChange={() => setCorrectOption(option2)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        placeholder="Option 3"
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        onChange={() => setCorrectOption(option3)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        placeholder="Option 4"
                        value={option4}
                        onChange={(e) => setOption4(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios4"
                        onChange={() => setCorrectOption(option4)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Form.Group>
            </fieldset>

            <Form.Group as={Col} controlId="formGridExplain">
              <Form.Label>Explain</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Explain"
                value={explain}
                onChange={(e) => setExplain(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddQuestion;
