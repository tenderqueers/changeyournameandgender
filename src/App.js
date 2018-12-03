import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Let's get started!</h1>
        <h2>Are you currently living in California?</h2>
        <Button color="success">Yes</Button>
        <Button color="danger">No</Button>
      </div>
    );
  }
}

export default App;
