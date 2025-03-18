import React from 'react';
import { IoSearch } from 'react-icons/io5';

const SearchBox = ({ style }) => {
  return (
    <div className="searchbox position-relative" style={style}>
      <IoSearch className="me-2" />
      <input type="text" placeholder="Search here..." autoFocus />
    </div>
  );
}

export default SearchBox;
