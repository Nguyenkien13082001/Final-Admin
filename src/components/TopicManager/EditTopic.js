import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function EditTopic({ topic, onsave }) {
  const [show, setShow] = useState(false);
  const [topicName, setTopicName] = useState(topic.name);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setTopicName(topic.name);
    setShow(true);
  };

  const handleSave = () => {
    onsave(topic.id, topicName);
    setShow(false);
  };
  return (
    <>
      <Button style={{}} variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                placeholder="Name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
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
    </>
  );
}
