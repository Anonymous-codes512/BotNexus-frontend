import React, { useState } from 'react';
import { Button, TextField, IconButton, Box } from '@mui/material';
import { FaPaperPlane } from 'react-icons/fa';
import { MdAttachFile } from 'react-icons/md';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { IoCloseCircleOutline } from 'react-icons/io5'; // Cross button icon import
import EmojiPicker from 'emoji-picker-react'; // Import the emoji picker component

const ComposeMessage = () => {
    const [contactNumber, setContactNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);  // For multiple file attachment

    const handleContactChange = (e) => {
        setContactNumber(e.target.value);
    };
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Get multiple files
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files to the state
    };

    const handleFileRemove = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove file from state by index
    };

    const handleSubmit = () => {
        // Handle message submission with files
        alert(`Message sent! ${files.length > 0 ? `Attached files: ${files.map((file) => file.name).join(', ')}` : 'No files attached.'}`);
    };


    return (
        <div className="container-fluid right-content overflow-auto">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h4 className="text-left hd">Compose New Message</h4>

                            <TextField
                                label="Contact Number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={contactNumber}
                                onChange={handleContactChange}
                            />

                            {/* Subject Input */}
                            <TextField
                                label="Subject"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={subject}
                                onChange={handleSubjectChange}
                            />

                            {/* Message Body */}
                            <TextField
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                value={message}
                                onChange={handleMessageChange}
                            />

                            <div className="d-flex row mt-2">
                                <div className="col-4  d-flex align-items-center">
                                    <input
                                        type="file"
                                        id="file-input"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        multiple
                                    />
                                    <label htmlFor="file-input">
                                        <IconButton className="rounded-circle" component="span">
                                            <MdAttachFile size={24} />
                                        </IconButton>
                                    </label>

                                </div>
                                <div className="col-8 d-flex justify-content-end align-items-center">
                                    <Button variant="contained" color="primary" endIcon={<FaPaperPlane />} onClick={handleSubmit} className="w-50">
                                        Send
                                    </Button>
                                </div>
                            </div>

                            <div className="d-flex flex-column mt-2 ">
                                {/* Display attached files and remove buttons */}
                                {files.length > 0 && files.map((file, index) => (
                                    <div className="d-flex align-items-center mt-1" key={index}>
                                        <p className="m-0 flex-grow-1">Attached File: {file.name}</p>
                                        <IconButton onClick={() => handleFileRemove(index)}>
                                            <IoCloseCircleOutline size={20} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComposeMessage;
