import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function EditAccount({ userInfo, onSave }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(userInfo.Name);
  const [email, setEmail] = useState(userInfo.Email);
  const [role, setRole] = useState(userInfo.Role);
  const [dob, setDob] = useState(userInfo.DoB);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setName(userInfo.Name);
    setEmail(userInfo.Email);
    setRole(userInfo.Status);
    setDob(userInfo.DoB);
    setShow(true);
  };

  const handleSave = () => {
    onSave(userInfo.ID, role);
    setShow(false);
  };

  return (
    <>
      <Button style={{}} variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formGridDoB">
              <Form.Label>DoB</Form.Label>
              <Form.Control
                placeholder="DoB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
                disabled
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridClass">
              <Form.Label>Role</Form.Label>
              <Form.Select
                defaultValue={userInfo.Status}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>USER</option>
                <option>ADMIN</option>
                <option>VIP</option>
              </Form.Select>
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group> */}

            <Row className="mb-3">
              {/* <Form.Group as={Col} controlId="formGridClass">
                <Form.Label>Class</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group> */}

              {/* <Form.Group as={Col} controlId="formGridRole">
                <Form.Label>Role</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group> */}
            </Row>
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
