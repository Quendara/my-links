import React, { Component } from 'react';
import { render } from 'react-dom';
import { List } from "./list";

const items = [
  {
    name:"Tracking ",
    link:"https://master.d1skuzk79uqu7w.amplifyapp.com/"
  },
  {
    name:"Todos ",
    link:"https://master.d3cslmw4si24vo.amplifyapp.com/"
  },
  {
    name:"Bücherei ",
    link:"https://katalog.dortmund.de/aDISWeb/app?service=direct/0/Home/%24DirectLink&sp=SOPAC02&sp=SBK00000000"
  },  

  
] 



class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Links' 
    };
  }

  render() {
    return (
      <div className="container">
      <h3>Links</h3>
      <List items={items} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
