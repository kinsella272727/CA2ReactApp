import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import UserList from './UserList';
import BookList from './BookList';
import CreateBook from './Components/CreateBook';
import EditBook from './Components/EditBook';

const App = () => {
  return(
    <HashRouter>
      <div>
        <Route exact path="/" component={UserList} />
        <Route path="/book/:id" component={BookList} />
        <Route path="/create-book" component={CreateBook} />
        <Route path="/edit/:id" component={EditBook} />
      </div>
    </HashRouter>
  );
};

export default App;
