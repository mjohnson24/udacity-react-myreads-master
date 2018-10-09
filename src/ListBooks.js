import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class ListBooks extends React.Component {
  state = {};

  changeShelf = (bookId: string, e: any) => {
    let temp = this.props.booksOnShelf;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: temp
      });
    });
  };

  render() {
    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read']
    }


    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
            { Object.keys(shelves).map((shelf) =>
              <BookShelf
                key={shelf}
                books={this.props.booksOnShelf.filter(book => book.shelf === shelves[shelf][1])}
                onChangeShelf={this.changeShelf}
                shelftitle={shelves[shelf][0]}
              />
            )}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;