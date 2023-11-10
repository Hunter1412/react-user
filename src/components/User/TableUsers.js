
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditNew from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});


    const handleClose = () => {
        setShowModal(false);
        setShowModalEdit(false);
        setShowModalDelete(false);
    }
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers); //listUsers is const
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
        setListUsers(cloneListUsers);
    }

    useEffect(() => {
        //call api
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setShowModalEdit(true);
    }

    const handleDeleteUser = (user) => {
        setDataUserDelete(user);
        setShowModalDelete(true);
    }

    return (<>
        <div className='my-3 add-new'>
            <span className=''>
                <h1>List users</h1>
            </span>
            <button className='my-3 btn btn-success'
                onClick={() => setShowModal(true)}>Add new user</button>
        </div>
        <Table striped bordered responsive hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 && listUsers.map((item) => {
                    return (
                        <tr key={`users-${item.id}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td className='d-flex justify-content-center'>
                                <button
                                    onClick={() => { handleEditUser(item) }}
                                    className='btn btn-warning me-3'>Edit</button>
                                <button
                                    onClick={() => { handleDeleteUser(item) }}
                                    className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"

            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <ModalAddNew
            show={showModal}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditNew
            show={showModalEdit}
            handleClose={handleClose}
            handleEditUserFromModal={handleEditUserFromModal}
            dataUserEdit={dataUserEdit}
        />
        <ModalConfirm
            show={showModalDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>);
}

export default TableUsers;