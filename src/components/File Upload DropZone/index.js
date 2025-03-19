import React, { useState } from "react";
import "../../assets/stylesheets/Dropzone.css";

const FileUploadDropzone = () => {
    const [file, setFile] = useState(null);
    const fileLimit = 25 * 1024 * 1024; // 25MB
    const allowedExtensions = ["xls", "xlsx"];

    const handleFileSelection = (selectedFile) => {
        if (!selectedFile) return;
        const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
            alert("Only Excel files (.xls, .xlsx) are allowed!");
            return;
        }
        
        if (selectedFile.size > fileLimit) {
            alert("File size exceeds 25MB limit!");
            return;
        }
        
        setFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFileSelection(e.dataTransfer.files[0]);
    };

    return (
        <form className="dropzone-box">
            <h2>Upload Excel File</h2>
            <p>Click to upload or drag and drop</p>
            <div className="dropzone-area" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                <div className="file-upload-icon">
                    <i className='bx bx-cloud-upload'></i>
                </div>
                <input type="file" accept=".xls,.xlsx" onChange={(e) => handleFileSelection(e.target.files[0])} />
                <div className="file-info">
                    {file ? <p>File Selected: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)</p> : <p>No File Selected</p>}
                </div>
            </div>
            <div className="dropzone-description"><span>Max file size: 25MB</span></div>
            <div className="dropzone-actions">
                <button type="reset" onClick={() => setFile(null)}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default FileUploadDropzone;
