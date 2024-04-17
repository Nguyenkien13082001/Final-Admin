import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";

export default function AddAccount({ onAdd }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("USER");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (!name || !email || !dob) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    // Gọi prop onAddClass để thêm lớp mới
    onAdd(name, email, dob, role);
    // Đóng modal và reset form
    setName("");
    setDob("");
    setEmail("");
    setRole("USER");
    setShow(false);
  };
  return (
    <>
      <Button
        style={{ marginBottom: "5px" }}
        variant="primary"
        onClick={handleShow}
      >
        Add Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div style={{ backgroundColor: "#00eaff1a" }}>
          {" "}
          <Modal.Header closeButton>
            <Modal.Title>Add Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridDoB">
                <Form.Label>DoB</Form.Label>
                <Form.Control
                  placeholder="DoB"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="date"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridClass">
                <Form.Label>Role</Form.Label>
                <Form.Select required onChange={(e) => setRole(e.target.value)}>
                  <option>USER</option>
                  <option>ADMIN</option>
                  <option>VIP</option>
                </Form.Select>
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridRole">
              <Form.Label>Role</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group> */}
              {/* </Row> */}
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
        </div>
      </Modal>
    </>
  );
}
