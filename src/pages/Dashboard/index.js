import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { useState } from "react";
import { Button, Divider } from '@mui/material';
import { IoMdCheckmark } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaEye, FaRegEye } from "react-icons/fa6";
import { MdDelete, MdSpaceDashboard } from "react-icons/md";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FaPencilAlt } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';


import image from '../../assets/images/profileAvatar.png';
import SearchBox from '../../components/SearchBox';

const Dashboard = () => {
    const [metrics] = useState({
        balance: "INR 874.52",
        totalConversations: 9462,
        currentPlan: "No Feature Avaliable",
        marketing: 3048,
        authentication: 20,
        utility: 2920,
        userInitiated: 3474,
        businessInitiated: 5988,
        openTickets: 0,
        pendingTickets: 0,
        solvedTickets: 0,
        expiredTickets: 0,
        broadcastSent: 108,
        broadcastDelivered: 97,
        broadcastRead: 77,
        apiSent: 843,
        apiDelivered: 842,
        apiRead: 601,
        messageLimitProgress: 33,
        totalMessages: 1000,
    });

    const [showBy, setShowBy] = React.useState('');
    const [categoryBy, setCategoryBy] = React.useState('');

    return (
        <div className="container-fluid right-content">

            <div className="row mb-3 d-flex">
                <div className="col-12">
                    <div className="card shadow-lg">
                        <div className="card-body d-flex align-items-center">
                            <MdSpaceDashboard className="me-3" style={{ fontSize: "1.2rem", color: "rgba(0,0,0,0.7)" }} />
                            <h5 className="card-title mb-0">Dashboard</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3 d-flex align-items-stretch">
                {/* First Column */}
                <div className="col-md-3">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title">Hello Umair</h6>
                            <p className="card-text p-0 m-0 fs-4">{metrics.balance}</p>
                        </div>
                    </div>
                </div>

                {/* Second Column */}
                <div className="col-md-6 card shadow-lg py-2 h-100">
                    <h6 className="card-title pt-2">Total Conversations</h6>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card-body">
                                <p className="card-text p-0 m-0 fs-4">{metrics.marketing}</p>
                                <p className="card-title" style={{ fontSize: "0.8rem" }}>Marketing</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <p className="card-text p-0 m-0 fs-4">{metrics.authentication}</p>
                                <p className="card-title" style={{ fontSize: "0.8rem" }}>Authentication</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <p className="card-text p-0 m-0 fs-4">{metrics.utility}</p>
                                <p className="card-title" style={{ fontSize: "0.8rem" }}>Utility</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card-body">
                                <p className="card-text p-0 m-0 fs-4">{metrics.userInitiated}</p>
                                <p className="card-title" style={{ fontSize: "0.8rem" }}>User Initiated</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <p className="card-text p-0 m-0 fs-4">{metrics.businessInitiated}</p>
                                <h6 className="card-title" style={{ fontSize: "0.8rem" }}>Business Initiated</h6>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <p className="card-text p-0 m-0 fs-4">{metrics.totalConversations}</p>
                                <h6 className="card-title" style={{ fontSize: "0.8rem" }}>Total</h6>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Column */}
                <div className="col-md-3">
                    <div className="card shadow-lg h-100">
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h6 className="card-title mb-3">Current Plan</h6>
                            <p className="card-text my-4">{metrics.currentPlan}</p>
                            <div className="w-100 mt-auto">
                                <Button className="w-100" variant="contained" color="error" >Upgrade Now</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row mb-4 align-items-stretch d-flex">
                <div className="col-md-2 pe-1">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title" style={{ fontSize: "0.8rem" }}>Open Tickets</h6>
                            <p className="card-text p-0 m-0 fs-5">{metrics.openTickets}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 px-1">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title" style={{ fontSize: "0.8rem" }}>Pending Tickets</h6>
                            <p className="card-text p-0 m-0 fs-5">{metrics.pendingTickets}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 px-1">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title" style={{ fontSize: "0.8rem" }}>Solved Tickets</h6>
                            <p className="card-text p-0 m-0 fs-5">{metrics.solvedTickets}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 px-1">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title" style={{ fontSize: "0.8rem" }}>Expired Tickets</h6>
                            <p className="card-text p-0 m-0 fs-5">{metrics.expiredTickets}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ps-1">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title" style={{ fontSize: "0.8rem" }}>Message Limit Progress</h6>
                            <div className="progress" style={{ height: "1px" }}>
                                <div className="progress-bar" role="progressbar" style={{ width: `${(metrics.messageLimitProgress / 1000) * 100}%` }} aria-valuenow={(metrics.messageLimitProgress / 1000) * 100} aria-valuemin="0" aria-valuemax="100"></div>                            </div>
                            <small className="mt-2 d-block">{metrics.messageLimitProgress} out of {metrics.totalMessages} messages used</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Broadcast Summary and API Message Summary Section */}
            <div className="row mb-4 d-flex align-items-stretch">
                <div className="col-md-6 pe-1">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title">Overview Summary of Broadcast Message</h6>
                            <div className="d-flex justify-content-between align-items-center w-75 my-4">
                                <div className="text-left report-icon row px-2">
                                    <Button className="rounded-circle col" >
                                        <IoMdCheckmark />
                                    </Button>
                                    <div className="col">
                                        <b className="m-0 ">{metrics.broadcastSent}</b>
                                        <p className="m-0" style={{ fontSize: "0.8rem" }}>Sent</p>
                                    </div>
                                </div>
                                <div className="text-left report-icon row px-2">
                                    <Button className="rounded-circle col">
                                        <IoMdCheckmarkCircleOutline />
                                    </Button>
                                    <div className="col">
                                        <b className="m-0">{metrics.broadcastDelivered}</b>
                                        <p className="m-0" style={{ fontSize: "0.8rem" }}>Delivered</p>
                                    </div>
                                </div>
                                <div className="text-left report-icon row px-2">
                                    <Button className="rounded-circle col">
                                        <FaRegEye />
                                    </Button>
                                    <div className="col">
                                        <b className="m-0">{metrics.broadcastRead}</b>
                                        <p className="m-0" style={{ fontSize: "0.8rem" }}>Read</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Card: Overview Summary of API Message */}
                <div className="col-md-6 ps-1">
                    <div className="card shadow-lg h-100">
                        <div className="card-body">
                            <h6 className="card-title">Overview Summary of API Message</h6>
                            <div className="d-flex justify-content-between align-items-center w-75 my-4">
                                <div className="text-left report-icon row px-2">
                                    <Button className="rounded-circle col" >
                                        <IoMdCheckmark />
                                    </Button>
                                    <div className="col">
                                        <b className="m-0">{metrics.broadcastSent}</b>
                                        <p className="m-0" style={{ fontSize: "0.8rem" }}>Sent</p>
                                    </div>
                                </div>
                                <div className="text-left report-icon row px-2">
                                    <Button className="rounded-circle col">
                                        <IoMdCheckmarkCircleOutline />
                                    </Button>
                                    <div className="col">
                                        <b className="m-0">{metrics.broadcastDelivered}</b>
                                        <p className="m-0" style={{ fontSize: "0.8rem" }}>Delivered</p>
                                    </div>
                                </div>
                                <div className="text-left report-icon row px-2">
                                    <Button className="rounded-circle col">
                                        <FaRegEye />
                                    </Button>
                                    <div className="col">
                                        <b className="m-0">{metrics.broadcastRead}</b>
                                        <p className="m-0" style={{ fontSize: "0.8rem" }}>Read</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow border-0 p-3 mt-4">
                <h3 className="hd">Top Broadcast Engaged Contacts</h3>
                <Divider color="secondary"/>
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
                        <SearchBox/>
                    </div>
                </div>

                <div className="table-responsive mt-3">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>SR #</th>
                                <th>CLIENT Image</th>
                                <th>CLIENT NAME</th>
                                <th>SENT MESSAGE</th>
                                <th>DElIVERED MESSAGE</th>
                                <th>READ MESSAGE</th>
                                <th className="text-center">ACTIONS</th>
                            </tr>
                        </thead>

                        <tbody className="thead-dark">
                            <tr>
                                <td>1</td>
                                <td><div className="userImg">
                                    <span className="rounded-circle">
                                        <img src={image} />
                                    </span>
                                </div></td>
                                <td>Hassan Ali</td>
                                <td>230</td>
                                <td>220</td>
                                <td>200</td>
                                <td className="actions d-flex align-items-center justify-content-center">
                                    <Button color="secondary" style={{ backgroundColor: "rgba(203, 60, 231, 0.2)" }}><FaEye /></Button>
                                    <Button color="success" style={{ backgroundColor: "rgba(26, 159, 83, 0.2)" }}><FaPencilAlt /></Button>
                                    <Button color="error" style={{ backgroundColor: "rgba(241, 17, 51, 0.2)" }}><MdDelete /></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><div className="userImg">
                                    <span className="rounded-circle">
                                        <img src={image} />
                                    </span>
                                </div></td>
                                <td>Hassan Ali</td>
                                <td>230</td>
                                <td>220</td>
                                <td>200</td>
                                <td className="actions d-flex align-items-center justify-content-center">
                                    <Button color="secondary" style={{ backgroundColor: "rgba(203, 60, 231, 0.2)" }}><FaEye /></Button>
                                    <Button color="success" style={{ backgroundColor: "rgba(26, 159, 83, 0.2)" }}><FaPencilAlt /></Button>
                                    <Button color="error" style={{ backgroundColor: "rgba(241, 17, 51, 0.2)" }}><MdDelete /></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><div className="userImg">
                                    <span className="rounded-circle">
                                        <img src={image} />
                                    </span>
                                </div></td>
                                <td>Hassan Ali</td>
                                <td>230</td>
                                <td>220</td>
                                <td>200</td>
                                <td className="actions d-flex align-items-center justify-content-center">
                                    <Button color="secondary" style={{ backgroundColor: "rgba(203, 60, 231, 0.2)" }}><FaEye /></Button>
                                    <Button color="success" style={{ backgroundColor: "rgba(26, 159, 83, 0.2)" }}><FaPencilAlt /></Button>
                                    <Button color="error" style={{ backgroundColor: "rgba(241, 17, 51, 0.2)" }}><MdDelete /></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><div className="userImg">
                                    <span className="rounded-circle">
                                        <img src={image} />
                                    </span>
                                </div></td>
                                <td>Hassan Ali</td>
                                <td>230</td>
                                <td>220</td>
                                <td>200</td>
                                <td className="actions d-flex align-items-center justify-content-center">
                                    <Button color="secondary" style={{ backgroundColor: "rgba(203, 60, 231, 0.2)" }}><FaEye /></Button>
                                    <Button color="success" style={{ backgroundColor: "rgba(26, 159, 83, 0.2)" }}><FaPencilAlt /></Button>
                                    <Button color="error" style={{ backgroundColor: "rgba(241, 17, 51, 0.2)" }}><MdDelete /></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><div className="userImg">
                                    <span className="rounded-circle">
                                        <img src={image} />
                                    </span>
                                </div></td>
                                <td>Hassan Ali</td>
                                <td>230</td>
                                <td>220</td>
                                <td>200</td>
                                <td className="actions d-flex align-items-center justify-content-center">
                                    <Button color="secondary" style={{ backgroundColor: "rgba(203, 60, 231, 0.2)" }}><FaEye /></Button>
                                    <Button color="success" style={{ backgroundColor: "rgba(26, 159, 83, 0.2)" }}><FaPencilAlt /></Button>
                                    <Button color="error" style={{ backgroundColor: "rgba(241, 17, 51, 0.2)" }}><MdDelete /></Button>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    {/* <div className="d-flex pb-2 tableFooter">
                        <Pagination count={10} className='ms-auto' color="primary" />
                    </div> */}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
