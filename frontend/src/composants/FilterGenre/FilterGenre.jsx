import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./filterGenre.css";

function FilterGenre() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const genres = ["Horror", "Action", "Comedy", "Drama", "Thriller"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="filter-genre" ref={ref}>
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
