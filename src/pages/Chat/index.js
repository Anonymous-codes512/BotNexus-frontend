import React, { useState, useEffect } from "react";
import { Button, TextField, IconButton } from '@mui/material';
import { MdAttachFile } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa6";
import SearchBox from "../../components/SearchBox";
import logo from '../../assets/images/logo.png';
import image1 from '../../assets/images/profileAvatar.png';
import image2 from '../../assets/images/download.png';
import image3 from '../../assets/images/download (2).png';
import image4 from '../../assets/images/download (1).png';

const Chat = () => {
    const customStyles = { height: '35px' };

    const [selectedContact, setSelectedContact] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    
    // Store messages in an object for each contact
    const [messages, setMessages] = useState({
        1: [
            { id: 1, sender: "You", message: "A6a zra aw na Bhai tak 2 min bd", timestamp: "8:51 pm" },
            { id: 2, sender: "Madu", message: "Ok ok", timestamp: "8:51 pm" }
        ],
        2: [
            { id: 1, sender: "You", message: "Hello there", timestamp: "8:30 pm" },
            { id: 2, sender: "Ali", message: "Hey!", timestamp: "8:31 pm" }
        ],
        3: [
            { id: 1, sender: "You", message: "Hello there", timestamp: "8:30 pm" },
            { id: 2, sender: "Ayesha", message: "Hey!", timestamp: "8:31 pm" }
        ],
        4: [
            { id: 1, sender: "You", message: "Hello there", timestamp: "8:30 pm" },
            { id: 2, sender: "Sara", message: "Hey!", timestamp: "8:31 pm" }
        ],
        // Add more contacts' messages here
    });

    const contacts = [
        { id: 1, name: "Danish", image: image1 },
        { id: 2, name: "Ali", image: image2 },
        { id: 3, name: "Ayesha", image: image3 },
        { id: 4, name: "Sara", image: image4 },
    ];

    // Get the last message for each contact
    const getLastMessage = (contactId) => {
        const contactMessages = messages[contactId] || [];
        return contactMessages.length ? contactMessages[contactMessages.length - 1].message : "";
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedContact) {
            const newMsg = {
                id: messages[selectedContact.id].length + 1,
                sender: "You",
                message: newMessage,
                timestamp: new Date().toLocaleTimeString(),
            };
            const updatedMessages = { ...messages, [selectedContact.id]: [...messages[selectedContact.id], newMsg] };
            setMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages)); // Save messages permanently in localStorage
            setNewMessage(""); // Clear the input field
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Handle file logic here
            console.log(file);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedContact(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="right-content container-fluid overflow-hidden" style={{ paddingTop: '70px' }}>
            <div className="row" style={{ border: '2px solid #ddd', borderRadius: '0.5rem' }}>
                {/* Left Column */}
                <div className="col-md-3 left-column m-0 contact-list px-0 pt-2">
                    <div className="row hd ms-1 ps-2 pb-2">Chats</div>
                    <div className="row m-0 mx-2"><SearchBox style={customStyles} /></div>
                    <div className="contact-wrapper me-2 ps-1 w-100">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                className={`row m-0 my-2 me-1 d-flex align-items-center p-1 ps-3 rounded chat_contact_list ${selectedContact?.id === contact.id ? "chat_contact_list-active" : ""}`}
                                onClick={() => handleContactClick(contact)} // Set contact as selected when clicked
                            >
                                <div className="col-auto mt-1 ps-0">
                                    <div className="userImg">
                                        <span className="rounded-circle">
                                            <img src={contact.image} alt={contact.name} />
                                        </span>
                                    </div>
                                </div>
                                <div className="col mt-1 ps-1 d-flex flex-column">
                                    <b className="p-0 m-0 col-8 text-truncate">{contact.name}</b>
                                    <small className="m-0 col-8 text-truncate" style={{ fontSize: "0.7rem" }}>
                                        {getLastMessage(contact.id)}
                                    </small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                {selectedContact ? (
                    <div className="col-md-9 right-column chat-screen p-0">
                        {/* Top Header Row (Sticky) */}
                        <div className="row m-0 p-2 chat-header" style={{ backgroundColor: "#ebe9e9", position: 'sticky', borderBottom: '2px solid #ddd', top: '0', zIndex: 10 }}>
                            <div className="row align-items-center">
                                <div className="col-auto mt-1 ps-0">
                                    <div className="userImg">
                                        {/* Display the selected contact's image */}
                                        <span className="rounded-circle">
                                            <img src={selectedContact.image} alt={selectedContact.name} />
                                        </span>
                                    </div>
                                </div>
                                <div className="col mt-1 ps-1 d-flex flex-column">
                                    <b className="p-0 m-0 col-8 text-truncate">{selectedContact.name}</b>
                                </div>
                            </div>
                        </div>

                        {/* Middle Content Row (Chat Messages) */}
                        <div className="row chat-messages p-2 m-1">
                            {messages[selectedContact.id]?.map((message) => (
                                <div
                                    key={message.id}
                                    className={`message ${message.sender === "You" ? "message-you" : "message-contact"} px-2`}
                                >
                                    <div className="message-content">
                                        <span className="pe-2">{message.message}</span>
                                        <small>{message.timestamp}</small>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Content Row (Footer) */}
                        <div className="row m-0 p-2 chat-footer d-flex align-items-center justify-content-between" style={{ backgroundColor: "#ebe9e9", borderTop: '2px solid #ddd', position: 'sticky', bottom: '0' }}>
                            <div className="col-auto">
                                <IconButton component="span">
                                    <MdAttachFile size={20} />
                                </IconButton>
                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                            </div>

                            {/* Message Input */}
                            <div className="col-9">
                                <TextField
                                    id="messageInput"
                                    type="text"
                                    fullWidth
                                    placeholder="Type a message"
                                    variant="standard"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                    sx={{
                                        "& .MuiInput-underline:before": { borderBottom: "none" },
                                        "& .MuiInput-underline:after": { borderBottom: "none" },
                                    }}
                                />
                            </div>

                            <div className="col-auto">
                                <IconButton component="span" onClick={handleSendMessage}>
                                    <FaPaperPlane size={20} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-md-9 right-column chat-screen p-0 d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <img src={logo} alt="Logo" style={{ width: '200px', opacity: '0.6' }} />
                            <p style={{ fontSize: "0.7rem" }}>Stay connected and manage conversations.</p>
                            <p style={{ fontSize: "0.7rem" }}>Use our System for a smooth messaging experience.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
