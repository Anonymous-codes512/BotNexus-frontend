import React, { useState, useEffect, useRef } from "react";
import logo from '../../assets/images/logo.png';
import { Button, ButtonGroup, Popper, Grow, Paper, MenuItem, MenuList, ClickAwayListener } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Icon for Export
import TableChartIcon from '@mui/icons-material/TableChart'; // Icon for EXCEL
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // Icon for PDF
import { jsPDF } from "jspdf"; // jsPDF library
import { autoTable } from 'jspdf-autotable'
import * as XLSX from "xlsx"; // xlsx library

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(null);

    const Reports = [
        { id: 1, title: "Report 1" },
        { id: 2, title: "Report 2" },
        { id: 3, title: "Report 3" },
        { id: 4, title: "Report 4" },
    ];

    const options = ['PDF', 'Export as', 'EXCEL'];
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
        if (selectedIndex === 0) {
            exportPDF(); // Export to PDF
        } else if (selectedIndex === 2) {
            exportExcel(); // Export to Excel
        }
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleReportClick = (report) => {
        setSelectedReport(report);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const table = document.getElementById('report-table');

        const tableStyles = {
            theme: 'striped',
            alternateRowStyles: {
                fillColor: [192, 192, 192],
            },
            styles: {
                halign: 'center',
                valign: 'middle',
                lineWidth: 0.1,
                lineColor: [0, 0, 0, 0.4],
            },
        };

        // Add table to the PDF using autoTable with the custom styles
        autoTable(doc, {
            html: '#report-table',
            ...tableStyles, // Apply custom styles here
        });

        // Save PDF
        doc.save(`${selectedReport.title}.pdf`);
    };


    const exportExcel = () => {
        const table = document.getElementById('report-table');
        const ws = XLSX.utils.table_to_sheet(table);

        // Create a new workbook and append the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report Data');

        // Save Excel file
        XLSX.writeFile(wb, `${selectedReport.title}.xlsx`);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedReport(null);
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
                    <div className="row hd ms-1 ps-2 pb-2">Reports</div>
                    <div className="d-flex row m-2">
                        {Reports.map((report) => (
                            <Button
                                key={report.id}
                                variant="contained"
                                color="primary"
                                className="my-1 text-capitalize d-flex"
                                onClick={() => handleReportClick(report)}
                            >
                                {report.title}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                {selectedReport ? (
                    <div className="col-md-9 right-column chat-screen p-0">
                        <div className="card shadow border-0 p-3 m-2" style={{ backgroundColor: '#ebe9e9' }}>
                            <div className="row d-flex align-items-center justify-content-between">
                                {/* Report Title */}
                                <div className="col-auto d-flex align-items-center">
                                    <h4 className="hd m-0">{selectedReport.title}</h4>
                                </div>

                                {/* Button Group */}
                                <div className="col-auto">
                                    <ButtonGroup
                                        variant="contained"
                                        ref={anchorRef}
                                        aria-label="Button group with a nested menu"
                                    >
                                        <Button onClick={handleClick}>
                                            <FileDownloadIcon sx={{ mr: 1 }} /> {options[selectedIndex]}
                                        </Button>
                                        <Button
                                            size="small"
                                            aria-controls={open ? "split-button-menu" : undefined}
                                            aria-expanded={open ? "true" : undefined}
                                            aria-label="select merge strategy"
                                            aria-haspopup="menu"
                                            onClick={handleToggle}
                                        >
                                            <ArrowDropDownIcon />
                                        </Button>
                                    </ButtonGroup>

                                    {/* Popper Menu */}
                                    <Popper
                                        sx={{ zIndex: 1 }}
                                        open={open}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList id="split-button-menu" autoFocusItem>
                                                            <MenuItem
                                                                key="pdf"
                                                                selected={0 === selectedIndex}
                                                                onClick={(event) => handleMenuItemClick(event, 0)}
                                                            >
                                                                <PictureAsPdfIcon sx={{ mr: 1 }} /> PDF
                                                            </MenuItem>
                                                            <MenuItem
                                                                key="excel"
                                                                selected={2 === selectedIndex}
                                                                onClick={(event) => handleMenuItemClick(event, 2)}
                                                            >
                                                                <TableChartIcon sx={{ mr: 1 }} /> EXCEL
                                                            </MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            </div>

                            <div className="table-responsive mt-3">
                                <table className="table table-bordered" id="report-table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>SR #</th>
                                            <th>List ID</th>
                                            <th>List Name</th>
                                            <th>List Folder</th>
                                            <th>Total Contacts</th>
                                            <th>Creation Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td>12</td>
                                            <td>13</td>
                                            <td>asd</td>
                                            <td>123</td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td>01</td>
                                            <td>12</td>
                                            <td>13</td>
                                            <td>asd</td>
                                            <td>123</td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td>01</td>
                                            <td>12</td>
                                            <td>13</td>
                                            <td>asd</td>
                                            <td>123</td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td>01</td>
                                            <td>12</td>
                                            <td>13</td>
                                            <td>asd</td>
                                            <td>123</td>
                                            <td>123</td>
                                        </tr>
                                        <tr>
                                            <td>01</td>
                                            <td>12</td>
                                            <td>13</td>
                                            <td>asd</td>
                                            <td>123</td>
                                            <td>123</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-md-9 right-column chat-screen p-0 d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <img src={logo} alt="Logo" style={{ width: '200px', opacity: '0.6' }} />
                            <p style={{ fontSize: "0.7rem" }}>View and manage all your reports in one place.</p>
                            <p style={{ fontSize: "0.7rem" }}>Stay informed with real-time report updates.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reports;
