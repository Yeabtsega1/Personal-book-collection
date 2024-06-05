import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookSearch() {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (query.length > 1) {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
      );
      const data = await response.json();
      setBooks(data.docs);
    }
  };

  const addToBookShelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];

    const isBookAlreadyAdded = bookshelf.some(
      (savedBook) => savedBook.key === book.key
    );

    if (!isBookAlreadyAdded) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    } else {
      alert("This book is already in your bookshelf!");
    }
  };

  const goToBookShelf = () => {
    navigate("/bookshelf");
  };

  return (
    <div className="booksearch">
      <div className="search">
        <span>Search by book name:</span>
        <input
          type="search"
          className="b-search"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className="results">
        {books.map((book) => (
          <div key={book.key} className="book-card">
            {/* <h4>Book Title: {book.title}</h4> */}
            {/* <h4><strong>Edition Count:</strong>{book.edition_count}</h4> */}
            <h4>
              <span className="label">Book Title:</span>
              <span className="value"> {book.title}</span>
            </h4>
            <h4>
              <span className="label">Edition Count:</span>
              <span className="value"> {book.edition_count}</span>
            </h4>
            <button onClick={() => addToBookShelf(book)} className="b-card">
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
      <div className="shelf">
        <input
          type="button"
          value="My Bookshelf"
          className="b-shelf"
          onClick={goToBookShelf}
        />
      </div>
    </div>
  );
}

export default BookSearch;
