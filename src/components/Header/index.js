import logo from '../../assets/images/logo.png';
import profileImg from '../../assets/images/profileAvatar.png';

import SearchBox from '../SearchBox';

import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { MdMenuOpen } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaBell } from "react-icons/fa";


import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { IoShieldCheckmark } from "react-icons/io5";




const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const myAccountOpen = Boolean(anchorEl);
    const [isOpenNotification, setIsOpenNotification] = React.useState(false);
    const notificationOpen = Boolean(isOpenNotification);

    
    const openMyAccountDropDown = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMyAccountDropDown = () => {
        setAnchorEl(null);
    };

    const openNotificationDropDown = (event) => {
        setIsOpenNotification(true);
    };
    const closeNotificationDropDown = () => {
        setIsOpenNotification(false);
    };

    return (
        <header className="d-flex align-items-center" >
            <div className="container-fluid w-100">
                <div className="row d-flex align-items-center w-100">
                    {/* Logo Wrapper */}
                    <div className="col-sm-2">
                        <Link to={'/'} className="d-flex align-items-center logo">
                            <img src={logo} className="logo" alt="Logo" />
                            <span className="ms-2">BotNexus</span>
                        </Link>
                    </div>

                    {/* Menu Button */}
                    <div className="col-sm-3 d-flex align-items-center ps-4">
                        <Button className="rounded-circle me-3">
                            <MdMenuOpen />
                        </Button>
                    </div>

                    {/* Menu Button */}
                    <div className="col-sm-7 d-flex align-items-center justify-content-end">
                        <Button className="rounded-circle me-3"><MdLightMode /></Button>
                        <div className="notification-dropdown-wrapper position-relative">
                            <Button className="rounded-circle me-3" onClick={openNotificationDropDown}><FaBell /></Button>
                            <Menu
                                anchorEl={isOpenNotification}
                                id="notification-menu"
                                className="notification-menu dropdown-list"
                                open={notificationOpen}
                                onClose={closeNotificationDropDown}
                                onClick={closeNotificationDropDown}
                                slotProps={{
                                    paper: {
                                        elevation: 0, sx: {
                                            overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
                                            '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <div className="head ps-3 pb-0">
                                    <h4>Notifications (10)</h4>
                                </div>
                                <Divider className="mb-1 bg-secondary" />

                                <div className="scroll">
                                    <MenuItem onClick={closeNotificationDropDown}>

                                        <div className="d-flex">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={profileImg} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="dropdownInfo ps-1">
                                                <h4>
                                                    <span>
                                                        <b>Abdul Jabbar</b>
                                                        add to his favourite list
                                                        <b> Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">few seconds ago</p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={closeNotificationDropDown}>

                                        <div className="d-flex">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={profileImg} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="dropdownInfo ps-1">
                                                <h4>
                                                    <span>
                                                        <b>Abdul Jabbar</b>
                                                        add to his favourite list
                                                        <b> Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">few seconds ago</p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={closeNotificationDropDown}>

                                        <div className="d-flex">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={profileImg} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="dropdownInfo ps-1">
                                                <h4>
                                                    <span>
                                                        <b>Abdul Jabbar</b>
                                                        add to his favourite list
                                                        <b> Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">few seconds ago</p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={closeNotificationDropDown}>

                                        <div className="d-flex">
                                            <div>
                                                <div className="userImg">
                                                    <span className="rounded-circle">
                                                        <img src={profileImg} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="dropdownInfo ps-1">
                                                <h4>
                                                    <span>
                                                        <b>Abdul Jabbar</b>
                                                        add to his favourite list
                                                        <b> Leather belt steve madden</b>
                                                    </span>
                                                </h4>
                                                <p className="text-sky mb-0">few seconds ago</p>
                                            </div>
                                        </div>
                                    </MenuItem>
                                </div>
                                <div className="px-3 pt-2 w-100">
                                    <Button className="btn-blue w-100">View all notifications</Button>
                                </div>
                            </Menu>
                        </div>

                        <div className="myAccountWrapper">
                            <Button className="myAccount d-flex align-items-center" onClick={openMyAccountDropDown}>
                                <div className="userImg">
                                    <span className="rounded-circle">
                                        <img src={profileImg} />
                                    </span>
                                </div>
                                <div className="userInfo">
                                    <h4>Danish Ejaz</h4>
                                    <p className="mb-0">@anonymous</p>
                                </div>
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={myAccountOpen}
                                onClose={closeMyAccountDropDown}
                                onClick={closeMyAccountDropDown}
                                slotProps={{
                                    paper: {
                                        elevation: 0, sx: {
                                            overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, },
                                            '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <div className="head ps-3 pb-0">
                                    <h4>Profile</h4>
                                </div>
                                <Divider className="mb-3 bg-secondary" />

                                <MenuItem onClick={closeMyAccountDropDown}>
                                    <ListItemIcon>
                                        <PersonAdd />
                                    </ListItemIcon>
                                    My Account
                                </MenuItem>
                                <MenuItem onClick={closeMyAccountDropDown}>
                                    <ListItemIcon>
                                        <IoShieldCheckmark />
                                    </ListItemIcon>
                                    Reset Password
                                </MenuItem>
                                <MenuItem onClick={closeMyAccountDropDown}>
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
