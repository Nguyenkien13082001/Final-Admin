import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function EditClass({ classInfo, onSave }) {
  const [show, setShow] = useState(false);
  const [className, setClassName] = useState(classInfo.name);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setClassName(classInfo.name); // Cập nhật lại tên lớp học mỗi khi modal mở
    setShow(true);
  };

  const handleSave = () => {
    onSave(classInfo.id, className);
    setShow(false);
  };

  return (
    <>
      <Button style={{}} variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={12}
                placeholder="Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
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
