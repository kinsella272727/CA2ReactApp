import React from 'react';
import { Link } from 'react-router-dom';

class User extends React.Component {

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <figure>
              <img alt="Profile" src={this.props.image} />
            </figure>
          </div>

          <div class="row" >
            <div class="col-sm" id="books">
              <p>{this.props.name}</p>
              <Link to={`/book/${this.props.id}`}>
                <button type="button" class="btn btn-info">
                  View Books
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
