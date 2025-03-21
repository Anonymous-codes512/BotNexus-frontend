import React from 'react';
import { IoSearch } from 'react-icons/io5';

const SearchBox = ({ onSearch, style }) => {
  // Handle the input change and pass the value to the onSearch function
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="searchbox position-relative" style={style}>
      <IoSearch className="me-2" />
      <input 
        type="text" 
        className="w-100" 
        placeholder="Search here..." 
        autoFocus 
        onChange={handleInputChange} // Capture input change
      />
    </div>
  );
}

export default SearchBox;
