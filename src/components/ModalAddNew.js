import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { postCreateUser } from '../services/UserService';
import {toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;

    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)
        if (res && res.id) {
            handleClose();
            setName("");
            setJob("");
            toast.success("Add new successfully!");
            handleUpdateTable({ first_name: name, id: res.id });
        } else {
            toast.error("Error...");
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group mb-3">
                    <label className="form-label ">Name</label>
                    <input className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter name" />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Job</label>
                    <input className="form-control"
                        type='text'
                        value={job}
                        onChange={(event) => setJob(event.target.value)}
                        placeholder="Enter job" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Add new
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddNew;