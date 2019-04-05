import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {title: '', author: '', user_id: '', users: []};
  }

  componentDidMount() {
    axios.get('/api/books/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          author: response.data.author
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
    const obj = {
      _id: this.props.match.params.id,
      title: this.state.title,
      author: this.state.author
    };
    axios.put('/api/books/', obj)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h3>Update Books</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle} />
          </div>
          <div className="form-group">
            <label>Author: </label>
            <input type="text" className="form-control" value={this.state.author} onChange={this.onChangeAuthor} />
          </div>
          <div className="form-group">
            <input type="submit" value="Update Books" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
