import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

function EditQuestion({ question, onSave }) {
  const [content, setContent] = useState(question.content);
  const answer = question.answers[0];
  const [option1, setOption1] = useState(answer.answer.value1);
  const [option2, setOption2] = useState(answer.answer.value2);
  const [option3, setOption3] = useState(answer.answer.value3);
  const [option4, setOption4] = useState(answer.answer.value4);
  const [correctOption, setCorrectOption] = useState(answer.correct);
  console.log("correctOption", correctOption);
  const [explain, setExplain] = useState(answer.explaination);
  // const [isEnable, setIsEnable] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleSave = () => {
    if (
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
    console.log("correctOption", correctOption);
    onSave(
      {
        content: content,
        options: {
          value1: option1,
          value2: option2,
          value3: option3,
          value4: option4,
        },
        correct: correctOption,
        explaination: explain,
      },
      question.id
    );
    setShow(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col} controlId="formGridContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
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
                        placeholder="Đáp Án 1"
                        value={option1}
                        onChange={(e) => setOption1(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        name="formHorizontalRadios"
                        checked={correctOption === option1}
                        id="formHorizontalRadios1"
                        onChange={() => setCorrectOption(option1)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        placeholder="Đáp Án 2"
                        value={option2}
                        onChange={(e) => setOption2(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        checked={correctOption === option2}
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
                        placeholder="Đáp Án 3"
                        value={option3}
                        onChange={(e) => setOption3(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        checked={correctOption === option3}
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
                        placeholder="Đáp Án 4"
                        value={option4}
                        onChange={(e) => setOption4(e.target.value)}
                      />
                    </Col>
                    <Col className="cssradio" sm={4}>
                      <Form.Check
                        type="radio"
                        checked={correctOption === option4}
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
                type="text"
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditQuestion;
