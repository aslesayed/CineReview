import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./searchbar.css";

const mockData = [
  { id: 1, title: "Inception", type: "Movie" },
  { id: 2, title: "The Matrix", type: "Movie" },
  { id: 3, title: "Breaking Bad", type: "Series" },
  { id: 4, title: "Stranger Things", type: "Series" },
  { id: 5, title: "Interstellar", type: "Movie" },
  { id: 6, title: "The Office", type: "Series" },
];

function SearchBar() {
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (term) => {
    if (term) {
      const filteredResults = mockData.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container">
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
        <button className="search-button" onClick={() => setActive(!active)}>
          <IoSearchOutline />
        </button>
      </div>
      <div className="search-results">
        {results.length > 0 &&
          results.map((item) => (
            <div key={item.id} className="search-result-item">
              {item.title} ({item.type})
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
