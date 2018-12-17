import React, { Component } from 'react';
import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class NotAvailable extends Component {
  render() {
    return (
      <div>
        <p>Sorry, we currently only operate in California.</p>
        <p>Check out the <a href="https://transgenderlawcenter.org">Transgender Law Center</a> for help in your state.</p>
      </div>
    )
  }
}

export default NotAvailable;
