import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { MdSpaceDashboard } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { IoChatbox } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { FaClipboardList, FaCreditCard } from "react-icons/fa6";
import { RiSettings4Fill } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";

const Sidebar = () => {
    // Get active menu from localStorage or default to '/'
    const [active, setActive] = useState(localStorage.getItem('activeMenu') || '/');

    useEffect(() => {
        localStorage.setItem('activeMenu', active);
    }, [active]);

    const handleClick = (path) => {
        setActive(path);
    };

    // Active styles
    const activeStyle = { color: "#007bff" , fontWeight: "bold" };
    const activeIconStyle = { color: "#007bff" };

    return (
        <div className="sidebar">
            <ul className="m-0 px-1 py2">
                <li>
                    <Link to={'/'} onClick={() => handleClick('/')}>
                        <Button className="w-100" style={active === '/' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/' ? activeIconStyle : {}}>
                                <MdSpaceDashboard />
                            </span>
                            Dashboard
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/compose-message">
                        <Button className="w-100" style={active === '/compose-message' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/compose-message' ? activeIconStyle : {}}>
                                <BsFillSendFill />
                            </span>
                            Compose Message
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/chat'} onClick={() => handleClick('/chat')}>
                        <Button className="w-100" style={active === '/chat' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/chat' ? activeIconStyle : {}}>
                                <IoChatbox />
                            </span>
                            Chat
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/contact-list'} onClick={() => handleClick('/contact-list')}>
                        <Button className="w-100" style={active === '/contact-list' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/contact-list' ? activeIconStyle : {}}>
                                <MdContactPage />
                            </span>
                            Contact
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/report'} onClick={() => handleClick('/report')}>
                        <Button className="w-100" style={active === '/report' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/report' ? activeIconStyle : {}}>
                                <FaClipboardList />
                            </span>
                            Report
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/payment-screen'} onClick={() => handleClick('/payment-screen')}>
                        <Button className="w-100" style={active === '/payment-screen' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/payment-screen' ? activeIconStyle : {}}>
                                <FaCreditCard />
                            </span>
                            Payment
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/flow'} onClick={() => handleClick('/flow')}>
                        <Button className="w-100" style={active === '/flow' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/flow' ? activeIconStyle : {}}>
                                <TiFlowChildren />
                            </span>
                            Flow
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/template'} onClick={() => handleClick('/template')}>
                        <Button className="w-100" style={active === '/template' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/template' ? activeIconStyle : {}}>
                                <HiTemplate />
                            </span>
                            Manage Template
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/settings'} onClick={() => handleClick('/settings')}>
                        <Button className="w-100" style={active === '/settings' ? activeStyle : {}}>
                            <span className="icon me-2" style={active === '/settings' ? activeIconStyle : {}}>
                                <RiSettings4Fill />
                            </span>
                            Settings
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
