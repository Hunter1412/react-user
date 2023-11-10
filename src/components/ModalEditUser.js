import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalEditNew = (props) => {
    const { show, handleClose, handleEditUserFromModal, dataUserEdit } = props;

    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [id, setId] = useState(dataUserEdit.id);

    const handleEditUser = async () => {
        let res = await putUpdateUser(id, name, job)
        if (res && res.updatedAt) {
            handleClose();
            setName("");
            setJob("");
            toast.success("Edit this user successfully!");
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            });
        } else {
            toast.error("Error...");
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    return (
        <Modal show={show} onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit new user</Modal.Title>
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
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditNew;