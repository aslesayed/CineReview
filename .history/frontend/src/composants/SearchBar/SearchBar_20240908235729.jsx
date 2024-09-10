import React, { useState, useContext, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { DataContext } from "../../contexts/DataContext";
import "./searchbar.css";
import { Link } from "react-router-dom";

function SearchBar() {
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const searchContainerRef = useRef(null);

  const { contents } = useContext(DataContext);

  const handleSearch = (term) => {
    if (term) {
      const filteredResults = contents.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setResults([]);
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="searchbar">
        <input
          type="text"
          className={active ? "search-input active" : "search-input"}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            setActive(!active);
            setResults([]);
          }}
        >
          <IoSearchOutline />
        </button>
      </div>

      <div className="search-results">
        {results.length > 0 &&
          results.map((item) => (
            <Link
              to={`/contents/${item.content_id}`}
              key={item.content_id}
              className="search-result-item"
              onClick={() => setResults([])}
            >
              <div>
                {item.name} ({item.type})
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
