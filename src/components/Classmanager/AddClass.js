import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

export default function AddClass({ onAdd }) {
  const [show, setShow] = useState(false);
  const [className, setClassName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (!className) {
      toast.warning("Please fill in all fields.");
      setShow(true);
      return;
    }
    // Gọi prop onAddClass để thêm lớp mới
    onAdd(className);
    // Đóng modal và reset form
    setClassName("");
    setShow(false);
  };

  return (
    <>
      <Button
        style={{ marginBottom: "5px" }}
        variant="primary"
        onClick={handleShow}
      >
        Add Class
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={12}
                placeholder="Enter class name"
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
