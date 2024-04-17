import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default function AddChapter({ onAdd, classList }) {
  const [show, setShow] = useState(false);
  const [chapterName, setChapterName] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");

  const handleClose = () => {
    setChapterName("");
    setSelectedClassId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSave = () => {
    if (!chapterName || !selectedClassId) {
      toast.warning("Please fill in all fields.");
      return;
    }
    console.log("selectedClassId", selectedClassId);
    onAdd(chapterName, selectedClassId);
    setChapterName("");
    setSelectedClassId("");
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Chapter
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="classSelect">
              <Form.Label>Select Class</Form.Label>
              <Form.Select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
              >
                <option value="">Select a class</option>
                {classList.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="chapterName">
              <Form.Label>Chapter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter chapter name"
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
