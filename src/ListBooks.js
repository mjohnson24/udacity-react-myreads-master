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
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            key="currentlyReading"
            books={this.props.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.changeShelf}
            shelftitle="Currently Reading"
          />
          <BookShelf
            key="wantToRead"
            books={this.props.booksOnShelf.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.changeShelf}
            shelftitle="Want to Read"
          />
          <BookShelf
            key="read"
            books={this.props.booksOnShelf.filter(book => book.shelf === "read")}
            onChangeShelf={this.changeShelf}
            shelftitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;