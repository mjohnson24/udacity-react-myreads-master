import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  changeShelf = (book: any, shelf: string) => {
    BooksAPI.update(book, shelf).then(response => {
      this.updateBookShelf();
    });
  };

  updateBookShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBooks booksOnShelf={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchBooks onChangeShelf={this.changeShelf} booksOnShelf={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;