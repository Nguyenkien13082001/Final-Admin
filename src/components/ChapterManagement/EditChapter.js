import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function EditChapter({ chapter, onSave }) {
  // console.log(name);
  const [show, setShow] = useState(false);
  const [chapterName, setChapterName] = useState(chapter.name);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setChapterName(chapter.name); // Cập nhật lại tên chương mỗi khi modal mở
    setShow(true);
  };

  const handleSave = () => {
    onSave(chapter.id, chapterName);
    setShow(false);
  };

  return (
    <>
      <Button style={{}} variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Chapter</Form.Label>
              <Form.Control
                placeholder="Name"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
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
