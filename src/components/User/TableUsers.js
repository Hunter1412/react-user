import { useEffect, useState, useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditNew from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';
import _debounce from 'lodash/debounce';

import './Table.scss';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse';
import { toast } from 'react-toastify';

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    const [keyword, setKeyword] = useState('');

    const [dataExport, SetDataExport] = useState([]);
    const [headersExport, SetHeadersExport] = useState([]);

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

    const handleSort = (by, field) => {
        setSortBy(by);
        setSortField(field);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    }

    //filter by email
    const debounceFn = useCallback(_debounce(handleSearch, 1000), []);
    function handleSearch(term) {
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }
    const handleChange = (event) => {
        setKeyword(event.target.value)
        debounceFn(event.target.value);
    };

    const getUsersExport = (event, done) => {
        if (listUsers && listUsers.length > 0) {
            let headers = [
                { label: "Id", key: "id" },
                { label: "Email", key: "email" },
                { label: "First Name", key: "first_name" },
                { label: "Last Name", key: "last_name" }
            ];
            SetHeadersExport(headers)
            SetDataExport(listUsers);
            done(); //end get data
        }
    }

    const handleImport = (event) => {
        if (event?.target?.files[0]) {
            let file = event.target.files[0];
            if (file.type !== "text/csv") {
                return toast.error("Only acept csv file!");
            }
            // Parse local CSV file
            Papa.parse(file, {
                header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length <= 0) {
                        return toast.error("Wrong format csv file");
                    }
                    let list = [];
                    rawCSV.map((item) => {
                        return item?.email?.length > 0 && list.unshift(item);
                    });
                    toast.success("Uploading...");
                    setListUsers([...list].slice());
                }
            });
        }
    }


    return (<>
        <div className='my-3 add-new'>
            <span className=''>
                <h1>List users</h1>
            </span>
            <div>
                <label htmlFor="upload" className='my-3 btn btn-info'>
                    <i className="fa-solid fa-file-import me-1"></i>
                    <span>Import</span>
                    <input type='file' id='upload' hidden
                        onChange={(e) => handleImport(e)}
                    />
                </label>

                <CSVLink
                    filename="users.csv"
                    className='btn btn-warning mx-2'
                    data={dataExport}
                    headers={headersExport}
                    asyncOnClick={true} //await cho fn getUsersExport
                    onClick={getUsersExport}
                >
                    <i className="fa-solid fa-file-export me-1"></i>
                    <span>Export</span>
                </CSVLink>

                <button className='my-3 btn btn-success'
                    onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-circle-plus me-1"></i>
                    <span>
                        Add new
                    </span>
                </button>
            </div>
        </div>
        <div className="my-3 col-12 col-md-6">
            <input
                className="form-control"
                placeholder="Search by email"
                value={keyword}
                onChange={handleChange}
            />
        </div>
        <Table striped bordered responsive hover>
            <thead>
                <tr>
                    <th>
                        <div className="sort-header">
                            <span>ID&nbsp;</span>
                            <span>
                                <i
                                    className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "id")}
                                    onKeyDown={() => { handleSort("desc", "id") }}
                                ></i>
                                <i
                                    className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "id")}
                                    onKeyDown={() => { handleSort("asc", "id") }}
                                ></i>
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>Email</div>
                    </th>
                    <th>
                        <div className='sort-header'>
                            <span>First Name&nbsp;</span>
                            <span>
                                <i
                                    className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "first_name")}
                                    onKeyDown={() => { handleSort("desc", "first_name") }}
                                ></i>
                                <i
                                    className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "first_name")}
                                    onKeyDown={() => { handleSort("asc", "first_name") }}
                                ></i>
                            </span>
                        </div>
                    </th>
                    <th>
                        <div className='sort-header'>Last Name</div>
                    </th>
                    <th>
                        <div className='sort-header'>Actions</div>
                    </th>
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