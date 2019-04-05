import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from './User';
import axios from 'axios';
import './app.css';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios.get('api/users')
      .then(response =>{
        this.setState({ users: response.data });
      })
      .catch(error =>{
        console.log(error);
      });
  }

  render() {
    const userList = this.state.users.map(u => (
      <User
        key={u._id}
        id={u._id}
        name={u.name}
        image={u.picture}
      />
    ));

    return (
      <div>
        <Link to={'/create-book'}>
          <button type="button">
            Create new Book
          </button>
        </Link>
        
        <h2>All Users</h2>
        <div>{userList}</div>
      </div>
    );
  }
}

export default UserList;
