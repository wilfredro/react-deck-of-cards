import React, { Component } from 'react';
import { render } from 'react-dom';
import Table from './Table';
import './style.scss';

class App extends Component {

  render() {
    return (
      <div>
        <Table />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
