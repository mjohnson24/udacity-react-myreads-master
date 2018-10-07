import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Rx from "rxjs/Rx";

class SearchBooks extends React.Component {
  state = {
    query: "",
    books: []
  };

  searchInput: Rx.Subject<any>;

  constructor() {
    super();
    this.searchInput = new Rx.Subject();
    this.searchInput.debounceTime(600).subscribe(param => {
      this.errorSearchBook(param);
    });
  }

  updateQuery = (query: string) => {
    this.setState({
      query: query
    });
    if (query) {
      this.searchInput.next(query);
    } else {
      this.setState({
        books: []
      });
    }
  };

  updateBooks(books: any) {
    const verifiedBooks = books.map(book => {
      book.shelf = "none";
      this.props.booksOnShelf.forEach(bookOnShelf => {
        if (book.id === bookOnShelf.id) {
          book.shelf = bookOnShelf.shelf;
        }
      });
      return book;
    });
    this.setState({
      books: verifiedBooks
    });
  }

  errorSearchBook(query: string) {
    BooksAPI.search(query, 20).then(
      response => {
        if (response.error) {
          this.setState({
            books: []
          });
        } else {
          this.updateBooks(response);
        }
      },
      error => {
        console.log("OH NO!!!! You broke it! An error has occured!");
      }
    );
  }

  updateBookSearch(book: any, shelf: string) {
    let temp = this.state.books;
    const bookToUpdate = temp.filter(t => t.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: temp
    });
    this.props.onChangeShelf(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input">
            <input
              type="text"
              placeholder="Search by author or title"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ul className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 135,
                      height: 200,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}
                  />
                  <div className="book-shelf-change">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateBookSearch(book, e.target.value);
                      }}>
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchBooks;