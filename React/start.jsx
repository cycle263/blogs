import React from 'react';
import ReactDom from 'react-dom';
import '../common/style.css'

const GroceryList = React.createClass({
  handleClick: function(i) {
    alert('You clicked: ' + this.props.items[i]);
  },

  render: function() {
    console.log(this.refs);
    return (
      <div>
        {this.props.items.map(function(item, i) {
          return (
            <div className="list" onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
          );
        }, this)}
      </div>
    );
  }
});

const App = React.createClass({
  handleClick(event){
    console.log(ReactDom.findDOMNode(this.refs.Grocery));
  },
  render: function() {
    return (
      <div className="container">
        <GroceryList ref="Grocery" on items={['Apple', 'Banana', 'Cranberry']} />
        <div>
          <button onClick={this.handleClick}>Test</button>
        </div>
      </div>
    )
  }
});

export default App;
