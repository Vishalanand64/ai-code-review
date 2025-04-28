import React, { Component } from 'react';
import { render } from 'react-dom';
import Button from './button'
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div className = 'body-container'>
        <Button color="blue" label = "facebook" />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
