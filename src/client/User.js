import React from 'react';
import { Link } from 'react-router-dom';

class User extends React.Component {

  render() {
    return (
      <div>
        <div>
          <div>
            <figure>
              <img alt="Profile" src={this.props.image} />
            </figure>
          </div>
          <div>
            <div>
              <div>
                <p>{this.props.name}</p>
                <Link to={`/book/${this.props.id}`}>
                  <button type="button">
                    View Books
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
