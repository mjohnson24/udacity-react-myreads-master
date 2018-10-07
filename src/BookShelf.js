import React from "react";

class BookShelf extends React.Component {
  state = {};

  render() {
    return (
      <div className="book-shelf">
        <h2 className="book-shelf-title">
          {this.props.shelftitle}
        </h2>
        <div className="book-shelf-books">
          <ol className="books-grid">
            {this.props.books.map(book =>
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
                    <select value={book.shelf} onChange={e => this.props.onChangeShelf(book.id, e)}>
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
                <div className="book-authors">
                  {book.authors &&
                    <div className="book-authors">
                      {book.authors[0]}
                    </div>}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;