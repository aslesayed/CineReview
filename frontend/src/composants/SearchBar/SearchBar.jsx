import  { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./searchbar.css";

function SearchBar() {
  const [active, setActive]=useState(false)
  return (
    <div className="search-container">
      <div className="searchbar">
        <input type="text" className={active?'search-input active':'search-input'} placeholder="Search" />

        <button className="search-button" onClick={()=>setActive(!active)}>
          {" "}
          <IoSearchOutline />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
