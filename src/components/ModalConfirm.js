import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success("Delete successfully");
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error("Error: Can't delete user!")
        }
    }

    return (
        <Modal show={show} onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <p>Are you sure to delete this record, <strong>email = {dataUserDelete.email}</strong> ?</p>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => confirmDelete()}>
                    Confirm Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirm;