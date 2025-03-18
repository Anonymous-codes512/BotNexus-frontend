import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
    return (
        <div className="searchbox position-relative">
            <IoSearch className="me-2"/>
            <input type="text" placeholder="Search here..."/>
        </div>
    )
}

export default SearchBox;