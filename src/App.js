import React from 'react';
import Container from 'react-bootstrap/Container'
import AddTodo from './components/AddTodo';
import ListTodo from './components/ListTodo';
import { Provider } from 'react-redux';
import {store} from './redux';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Container>
            <h1 className="text-center heading">Todo App</h1>
            <AddTodo></AddTodo>
            <hr/>
            <ListTodo></ListTodo>
          </Container>
      </div>
    </Provider>
  );
}

export default App;
