import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Book from './Book';
import axios from 'axios';
import './app.css';
import App from './App';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };

    this.updateUsers = this.updateUsers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get(`/api/users/${this.props.match.params.id}/books`)
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUsers() {
    axios.get(`/api/users/${this.props.match.params.id}/books`)
      .then(response => {
        this.setState({ books: response.data});
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(bookId) {
    axios
      .delete('/api/books', {
        data: {
          id: bookId
        }
      })
      .then(response => {
        this.updateUsers();
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const bookLists = this.state.books.map(u => (
      <Book
        key={u._id}
        id={u._id}
        title={u.title}
        author={u.author}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <div class="container">
        {bookLists.length ?
          <div>
            <h2>All Books</h2>
            <div>{bookLists}</div></div> :
          <h2>No Books</h2> }
      </div>
    );
  }
}

const Book = (props) => {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-info" onClick={() => {props.handleDelete(props.id);}}>
            Delete
          </button>

          <Link to={`/edit/${props.id}`}>
            <button type="button" class="btn btn-info">
          Edit Book
            </button>
          </Link>
        </div>
      </div>
      <h2>{props.title}</h2>
      <p>{props.author}</p>
    </div>
  );
};

export default BookList;
