import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import {MdSpaceDashboard } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { IoChatbox } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { FaClipboardList } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { RiSettings4Fill } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";



const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="m-0 px-1 py2">
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <MdSpaceDashboard />
                            </span>
                            Dashboard
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <BsFillSendFill />
                            </span>
                            Compose Message
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <MdContactPage />
                            </span>
                            Contact
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <IoChatbox />
                            </span>
                            Chat
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <FaClipboardList />
                            </span>
                            Report
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <FaCreditCard />
                            </span>
                            Paymeny
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <TiFlowChildren />
                            </span>
                            Flow
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <HiTemplate />
                            </span>
                            Manage Template
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <Button className="w-100">
                            <span className="icon me-2">
                                <RiSettings4Fill />
                            </span>
                            Settings
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;