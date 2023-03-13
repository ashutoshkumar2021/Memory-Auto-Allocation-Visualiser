import React, { Component } from 'react';
import Header from "./components/Header";
import Visualization from "./components/Visualization";



class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Visualization/>
      </div>
    );
  }
}

export default App;
