import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./filterGenre.css";

function FilterGenre() {
  const [isOpen, setIsOpen] = useState(false);

  const genres = ["HORROR", "ACTION", "COMEDY", "DRAMA", "THRILLER"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-genre">
      <p className="button-filter" onClick={toggleDropdown}>
        GENRE {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </p>
      {isOpen && (
        <ul className="genre-list">
          {genres.map((genre, index) => (
            <li key={index} className="genre-item">
              {genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterGenre;
