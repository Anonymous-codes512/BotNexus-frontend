import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { FaEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import SearchBox from '../../components/SearchBox/index';

const Contact = () => {

    const [showBy, setShowBy] = React.useState('');
    const [categoryBy, setCategoryBy] = React.useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(5); // Set how many clients you want per page
    const [openModal, setOpenModal] = useState(false); // State to control the modal open/close
    const [openExcelModal, setOpenExcelModal] = useState(false); // State to control the Excel file upload modal
    const [openEditModal, setOpenEditModal] = useState(false); // State for the Edit modal
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for the Delete modal
    const [editContact, setEditContact] = useState({
        name: '',
        contact: '',
        email: ''
    });

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenExcelModal = () => {
        setOpenExcelModal(true);
    };

    const handleCloseExcelModal = () => {
        setOpenExcelModal(false);
    };

    const handleOpenEditModal = (client) => {
        setEditContact(client);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleOpenDeleteModal = (client) => {
        setEditContact(client);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditContact(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = () => {
        // Logic to save the edited contact
        handleCloseEditModal();
    };

    const handleDeleteContact = () => {
        // Logic to delete the contact
        handleCloseDeleteModal();
    };

    // Array of clients
    const clients = [
        { id: 1, name: "Hassan Ali", contact: "+923017689023", email: "hassan@domain.com" },
        { id: 2, name: "Ali Khan", contact: "+923217902803", email: "ali@domain.com" },
        { id: 3, name: "Sara Ahmed", contact: "+923217617863", email: "sara@domain.com" },
        { id: 4, name: "John Doe", contact: "+923707389023", email: "john@domain.com" },
        { id: 5, name: "Emma Watson", contact: "+923028989023", email: "emma@domain.com" },
        { id: 6, name: "kareem Ali", contact: "+923179689022", email: "kareem@domain.com" },
        { id: 7, name: "Shoaib Khan", contact: "+923337667023", email: "Shoaib@domain.com" },
        { id: 8, name: "Saima Ahmed", contact: "+923417789088", email: "Saima@domain.com" },
        { id: 9, name: "Mark Jhon", contact: "+923557689089", email: "Mark@domain.com" },
        { id: 10, name: "karwan Ben", contact: "+923117689011", email: "karwan@domain.com" },
    ];

    // Calculate the clients to be displayed on the current page
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

    return (
        <div className="right-content container-fluid" style={{ paddingTop: '70px' }}>
            <div className="card shadow border-0 p-3 mt-4">
                <div className="row">
                    <div className="col-md-3 align-items-center">
                        <Button
                            variant="contained"
                            color="primary"
                            className="py-2 w-100 text-capitalize"
                            startIcon={<IoIosAddCircle />}
                            onClick={handleOpenModal} // Open modal on click
                        >
                            Add New Contact
                        </Button>
                    </div>
                    <div className="col-md-3 align-items-center">
                        <Button variant="contained" color="primary" className="py-2 w-100 text-capitalize" startIcon={<RiFileExcel2Fill />} onClick={handleOpenExcelModal} >
                            Add Excel File
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal for adding new contact */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Client Name"
                        name="name"
                        value={editContact.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Contact Number"
                        name="contact"
                        value={editContact.contact}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email Address"
                        name="email"
                        value={editContact.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveEdit}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for uploading Excel file */}
            <Dialog open={openExcelModal} onClose={handleCloseExcelModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 600, }}>Upload Excel File</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                            cursor: "pointer",
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-right", padding: "16px" }}>
                    <Button onClick={handleCloseExcelModal} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCloseExcelModal} // Add actual file handling logic
                        variant="contained"
                        color="primary"
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for editing contact */}
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Client Name"
                        name="name"
                        value={editContact.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Contact Number"
                        name="contact"
                        value={editContact.contact}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email Address"
                        name="email"
                        value={editContact.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} variant="contained"
                        color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for deleting contact */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle>Delete Contact</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete {editContact.name}?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} variant="outlined"
                        color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteContact} variant="contained"
                        color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="card shadow border-0 p-3 mt-4">
                <h3 className="hd">Contacts List</h3>
                <Divider color="secondary" />
                <div className="row cardFilters mt-3">
                    <div className="col-md-3">
                        <h4>SHOW BY</h4>
                        <FormControl size="small" className="w-100">
                            <Select className="w-100" value={showBy} onChange={(event) => setShowBy(event.target.value)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-md-3">
                        <h4>Category By</h4>
                        <FormControl size="small" className="w-100">
                            <Select className="w-100" value={categoryBy} onChange={(event) => setCategoryBy(event.target.value)} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="col-md-6 d-flex justify-content-end align-items-end">
                        <SearchBox />
                    </div>
                </div>

                <div className="table-responsive mt-3">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>SR #</th>
                                <th>Client Name</th>
                                <th>Contact Number</th>
                                <th>Email Address</th>
                                <th className="text-center">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody className="thead-dark">
                            {currentClients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.id}</td>
                                    <td>{client.name}</td>
                                    <td>{client.contact}</td>
                                    <td>{client.email}</td>
                                    <td className="actions d-flex align-items-center justify-content-center">
                                        <Button color="success" style={{ backgroundColor: "rgba(26, 159, 83, 0.2)" }} onClick={() => handleOpenEditModal(client)}><FaPencilAlt /></Button>
                                        <Button color="error" style={{ backgroundColor: "rgba(241, 17, 51, 0.2)" }} onClick={() => handleOpenDeleteModal(client)}><MdDelete /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="d-flex pb-2 tableFooter">
                        <Pagination
                            count={Math.ceil(clients.length / clientsPerPage)}
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

export default Contact;
