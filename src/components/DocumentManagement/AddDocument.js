import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default function AddDocument({ onAdd, classList }) {
  const [show, setShow] = useState(false);
  const [Name, setName] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [file, setFile] = useState([]);

  const handleClose = () => {
    setName("");
    setSelectedClassId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSave = () => {
    if (!Name || !selectedClassId) {
      toast.warning("Please fill in all fields.");
      return;
    }
    console.log("selectedClassId", selectedClassId);
    onAdd(Name, file, selectedClassId);
    setName("");
    setSelectedClassId("");
    setFile([]);
    setShow(false);
  };

  const handleDocFileChange = (event) => {
    setFile(event.target.files[0]);
    setName(event.target.files[0].name);
    console.log(event.target.files);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Document
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Document</Modal.Title>
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
              <Form.Label>Document Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Document Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGridContent">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleDocFileChange}
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
