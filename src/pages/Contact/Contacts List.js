import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import SearchBox from '../../components/SearchBox/index';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";


const ContactsList = () => {
    const [numberOfRows, setNumberOfRows] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [editContactList, setEditContactList] = useState({
        id: '',
        listName: '',
        folderName: '',
        totalContacts: 0,
        creationDate: ''
    });

    const [searchQuery, setSearchQuery] = useState('');

    // Fetch contactLists data from localStorage
    const getContactListFromLocalStorage = () => {
        const contactLists = localStorage.getItem('contactLists');
        return contactLists ? JSON.parse(contactLists) : [];
    };

    const [contactLists, setContactList] = useState(getContactListFromLocalStorage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenEditModal = (contactList) => {
        setEditContactList(contactList);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleOpenDeleteModal = (contactList) => {
        setEditContactList(contactList);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditContactList(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        const updatedContactList = contactLists.map(contactList =>
            contactList.id === editContactList.id ? editContactList : contactList
        );
        localStorage.setItem('contactLists', JSON.stringify(updatedContactList));
        setContactList(updatedContactList);
        handleCloseEditModal();

        // Clear the form after editing
        setEditContactList({
            id: '',
            listName: '',
            folderName: '',
            totalContacts: 0,
            creationDate: ''
        });
    };

    const handleDeleteContact = () => {
        const updatedContactList = contactLists.filter(contactList => contactList.id !== editContactList.id);
        localStorage.setItem('contactLists', JSON.stringify(updatedContactList));
        setContactList(updatedContactList);
        handleCloseDeleteModal();
    };

    const generateRandomId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const handleSaveNewContact = () => {
        const newClient = {
            ...editContactList,
            id: generateRandomId(),
            folderName: "Official", // Default folder name
            creationDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Format creation date
            totalContacts: Math.floor(Math.random() * 100), // Random total contacts
        };

        const updatedContactList = [...contactLists, newClient];
        localStorage.setItem('contactLists', JSON.stringify(updatedContactList));
        setContactList(updatedContactList);

        // Clear the form
        setEditContactList({
            id: '',
            listName: '',
            folderName: '',
            totalContacts: 0,
            creationDate: ''
        });

        handleCloseModal();
    };

    useEffect(() => {
        const updatedContactList = getContactListFromLocalStorage();
        setContactList(updatedContactList);
    }, []);

    const indexOfLastClient = currentPage * numberOfRows;  // Use numberOfRows instead of contactsPerPage
    const indexOfFirstClient = indexOfLastClient - numberOfRows;  // Use numberOfRows here as well

    const currentClients = contactLists
        .filter(contactList =>
            contactList.listName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contactList.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(indexOfFirstClient, indexOfLastClient);

    return (
        <div className="right-content container-fluid" style={{ paddingTop: '70px' }}>
            <div className="card shadow border-0 p-3 mt-4">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-3 align-items-center">
                        <h3 className="hd">Lists of Contacts</h3>
                    </div>
                    <div className="col-md-3 align-items-center">
                        <Button
                            variant="contained"
                            color="primary"
                            className="py-2 w-100 text-capitalize"
                            startIcon={<IoIosAddCircle />}
                            onClick={handleOpenModal} // Open modal on click
                        >
                            Add New List
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal for adding new List */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle className='hd'>Create New List</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name of the List"
                        name="listName"
                        value={editContactList.listName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Folder Name"
                        name="folderName"
                        value={editContactList.folderName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveNewContact}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for editing List */}
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <DialogTitle>Edit List</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name of the List"
                        name="listName"
                        value={editContactList.listName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Folder Name"
                        name="folderName"
                        value={editContactList.folderName}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for deleting contact */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle>Delete List</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete {editContactList.listName}?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteContact} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="card shadow border-0 p-3 mt-4">
                <div className="row cardFilters mt-3 justify-content-between">
                    <div className="col-md-3">
                        <h4>Number of Rows</h4>
                        <FormControl size="small" className="w-100">
                            <Select
                                className="w-100"
                                value={numberOfRows}
                                onChange={(event) => setNumberOfRows(event.target.value)}  // Update numberOfRows here
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>

                    </div>

                    <div className="col-md-4 d-flex align-items-end">
                        <SearchBox onSearch={(query) => setSearchQuery(query)} />
                    </div>
                </div>

                <div className="table-responsive mt-3">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>SR #</th>
                                <th>List ID</th>
                                <th>List Name</th>
                                <th>List Folder</th>
                                <th>Total Contacts</th>
                                <th>Creation Date</th>
                                <th className="text-center">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentClients.map((contactList, index) => (
                                <tr key={contactList.id}>
                                    <td>{index + 1}</td>
                                    <td>{contactList.id}</td>
                                    <td className="text-decoration-underline">
                                        <Link
                                            to={`/contact?id=${contactList.id}`}
                                            style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
                                        >
                                            {contactList.listName}
                                        </Link>
                                    </td>
                                    <td>{contactList.folderName}</td>
                                    <td>{contactList.totalContacts}</td>
                                    <td>{contactList.creationDate}</td>
                                    <td className="actions d-flex align-items-center justify-content-center">
                                        <Button
                                            color="success"
                                            style={{ backgroundColor: "rgba(26, 159, 83, 0.2)" }}
                                            onClick={() => handleOpenEditModal(contactList)}
                                        >
                                            <FaPencilAlt />
                                        </Button>
                                        <Button
                                            color="error"
                                            style={{ backgroundColor: "rgba(241, 17, 51, 0.2)" }}
                                            onClick={() => handleOpenDeleteModal(contactList)}
                                        >
                                            <MdDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex pb-2 tableFooter">
                        <Pagination
                            count={Math.ceil(contactLists.length / numberOfRows)}  // Use numberOfRows here
                            page={currentPage}
                            onChange={handlePageChange}
                            className='ms-auto'
                            color="primary"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsList;
