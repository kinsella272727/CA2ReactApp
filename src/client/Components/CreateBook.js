import React, {Component} from 'react';
import axios from 'axios';

export default class CreateBook extends Component {

  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {title: '', author: '', user_id: '', users: []};
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();

    console.log('Form submitted:');
    console.log(`Title: ${this.state.title}`);
    console.log(`Author: ${this.state.author}`);

    const newBook = {
      title: this.state.title,
      author: this.state.author,
    };

    axios.post('/api/books', newBook)
      .then(res => console.log(res.data));

    this.setState({title: '', author: '', user_id: ''});
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Book</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Author: </label>
            <input type="text"
              className="form-control"
              value={this.state.author}
              onChange={this.onChangeAuthor}
            />
          </div>
          <div>

          </div>
          <div className="form-group">
            <input type="submit" value="Create Book" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
