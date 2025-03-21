import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import SearchBox from '../../components/SearchBox/index';
import * as XLSX from 'xlsx';
import { Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const [searchParams] = useSearchParams();
    const listId = searchParams.get("id");

    const [fileData, setFileData] = useState([]); // State to store data from the Excel file
    const [clients, setClients] = useState([]); // Store client data
    const [numberOfRows, setNumberOfRows] = useState(10); // Default rows per page
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [openModal, setOpenModal] = useState(false); // Modal for adding a new contact
    const [openExcelModal, setOpenExcelModal] = useState(false); // Modal for uploading Excel file
    const [openEditModal, setOpenEditModal] = useState(false); // Modal for editing contact
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // Modal for deleting contact
    const [editContact, setEditContact] = useState({ name: '', contact: '', email: '' });
    const [searchQuery, setSearchQuery] = useState(''); // For search functionality

    // Load contact data from localStorage based on listId
    const loadContactsFromLocalStorage = (listId) => {
        const storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            const contacts = JSON.parse(storedContacts);
            return contacts[listId] || []; // Return contacts for the specific listId
        }
        return [];
    };

    useEffect(() => {
        setClients(loadContactsFromLocalStorage(listId)); // Load the clients when listId changes
    }, [listId]);

    // Pagination handler
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleOpenExcelModal = () => setOpenExcelModal(true);
    const handleCloseExcelModal = () => setOpenExcelModal(false);

    const handleOpenEditModal = (client) => {
        setEditContact(client);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => setOpenEditModal(false);

    const handleOpenDeleteModal = (client) => {
        setEditContact(client);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditContact(prev => ({ ...prev, [name]: value }));
    };

    // Save the new contact
    const handleSaveNewContact = () => {
        if (clients.some(client => client.email === editContact.email)) {
            toast.error('Email already exists!');
            return;
        }
        const newContact = { ...editContact, id: new Date().getTime().toString() };
        const updatedClients = [...clients, newContact];
        const updatedContacts = { ...JSON.parse(localStorage.getItem('contacts')) };
        updatedContacts[listId] = updatedClients;
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        setClients(updatedClients);
        handleCloseModal();
    };

    // Edit the contact
    const handleSaveEdit = () => {
        const updatedClients = clients.map(client =>
            client.email === editContact.email ? editContact : client
        );
        const updatedContacts = { ...JSON.parse(localStorage.getItem('contacts')) };
        updatedContacts[listId] = updatedClients;
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        setClients(updatedClients);
        handleCloseEditModal();
    };

    // Delete the contact
    const handleDeleteContact = () => {
        const updatedClients = clients.filter(client => client.email !== editContact.email);
        const updatedContacts = { ...JSON.parse(localStorage.getItem('contacts')) };
        updatedContacts[listId] = updatedClients;
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        setClients(updatedClients);
        handleCloseDeleteModal();
    };

    // Handle file change and process Excel data
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const binaryStr = event.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });  // Read all rows

                if (data.length === 0 || data[0].length < 3) {
                    toast.error("The file is empty or the columns don't match the expected format.");
                    return;
                }

                // Directly map the first three columns into the expected format
                const extractedData = data.slice(1).map(row => ({
                    listId: row[0],    // Client Name
                    name: row[1],    // Client Name
                    contact: row[2], // Contact Number
                    email: row[3],   // Email Address
                }));

                setFileData(extractedData);  // Store extracted data for preview
                toast.success("Excel file uploaded successfully.");
            };
            reader.readAsBinaryString(file);  // Read the file as binary string
        }
    };

    // Save Excel data to clients list
    const handleSaveFileData = () => {
        if (fileData.length === 0) {
            toast.error("No data to save.");
            return;
        }

        // Add the new data from Excel to the existing clients
        const updatedClients = [...clients, ...fileData];
        const updatedContacts = { ...JSON.parse(localStorage.getItem('contacts') || '{}') };
        updatedContacts[listId] = updatedClients;  // Update the specific listId
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));

        // Update state with the new list of clients
        setClients(updatedClients);
        handleCloseExcelModal();  // Close the modal
        setFileData([]);  // Clear the file data
        toast.success("Contacts saved successfully!");
    };


    // Filter and paginate the clients list
    const currentClients = clients
        .filter(client =>
            client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice((currentPage - 1) * numberOfRows, currentPage * numberOfRows);

    return (
        <div className="right-content container-fluid" style={{ paddingTop: '70px' }}>
            <div className="card shadow border-0 p-3 mt-4">
                <div className="row">
                    <div className="col-md-3 align-items-center">
                        <Button variant="contained" color="primary" className="py-2 w-100 text-capitalize" startIcon={<IoIosAddCircle />} onClick={handleOpenModal}>
                            Add New Contact
                        </Button>
                    </div>
                    <div className="col-md-3 align-items-center">
                        <Button variant="contained" color="primary" className="py-2 w-100 text-capitalize" startIcon={<RiFileExcel2Fill />} onClick={handleOpenExcelModal}>
                            Add Excel File
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal for adding new contact */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Add New Contact </DialogTitle>
                <DialogContent>
                    <TextField label="Client Name" name="name" value={editContact.name} onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Contact Number" name="contact" value={editContact.contact} onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Email Address" name="email" value={editContact.email} onChange={handleInputChange} fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant="outlined" color="error">Cancel</Button>
                    <Button onClick={handleSaveNewContact} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Modal for uploading Excel file */}
            <Dialog open={openExcelModal} onClose={handleCloseExcelModal} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 600 }}>Upload Excel File</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer" }}
                    />
                    {fileData.length > 0 && (
                        <div>
                            <h5>Preview Data:</h5>
                            <ul>
                                {fileData.map((contact, index) => (
                                    <li key={index}>{contact.name} - {contact.contact} - {contact.email}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "space-right", padding: "16px" }}>
                    <Button onClick={handleCloseExcelModal} variant="outlined" color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveFileData} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Modal for editing contact */}
            <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogContent>
                    <TextField label="Client Name" name="name" value={editContact.name} onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Contact Number" name="contact" value={editContact.contact} onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Email Address" name="email" value={editContact.email} onChange={handleInputChange} fullWidth margin="normal" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} variant="outlined" color="error">Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">Save Changes</Button>
                </DialogActions>
            </Dialog>

            {/* Modal for deleting contact */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle>Delete Contact</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete {editContact.name}?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal} variant="outlined" color="error">Cancel</Button>
                    <Button onClick={handleDeleteContact} variant="contained" color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Toast notifications */}
            <ToastContainer />

            <div className="card shadow border-0 p-3 mt-4">
                <h3 className="hd">Contacts List</h3>
                <Divider color="secondary" />
                <div className="row cardFilters mt-3 justify-content-between">
                    <div className="col-md-3">
                        <h4>Number of Rows</h4>
                        <FormControl size="small" className="w-100">
                            <Select className="w-100" value={numberOfRows} onChange={(event) => setNumberOfRows(event.target.value)}>
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
                                <th>Client Name</th>
                                <th>Contact Number</th>
                                <th>Email Address</th>
                                <th className="text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentClients.map((client, index) => (
                                <tr key={client.id}>
                                    <td>{(currentPage - 1) * numberOfRows + index + 1}</td>
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
                        <Pagination count={Math.ceil(clients.length / numberOfRows)} page={currentPage} onChange={handlePageChange} className="ms-auto" color="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
