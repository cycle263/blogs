import React from 'react';
import ReactDom from 'react-dom';
import '../common/style.css'

const GroceryList = React.createClass({
  getInitialState: function() {
    return {}
  },

  handleClick: function(i) {
    this.props.clickCallback(this.props.items[i], i);
  },

  render: function() {
    return (
      <div>
        {this.props.items.map(function(item, i) {
          return (
            <div className={item.active
              ? "list active"
              : "list"} onClick={this.handleClick.bind(this, i)} key={i}>{item.name}</div>
          );
        }, this)}
      </div>
    );
  }
});

const App = React.createClass({
  getInitialState: function() {
    return {
      data: [
        {
          name: 'Apple',
          active: true
        }, {
          name: 'Banana',
          active: false
        }, {
          name: 'Cranberry',
          active: false
        }
      ]
    }
  },

  handleClick(event) {
    console.log(ReactDom.findDOMNode(this.refs.showText));
  },

  clickCallback: function(content, i) {
    var data = this.state.data.slice();
    data.forEach((item, key) => {
      item.active = false;
    });
    data[i].active = true;
    this.refs.showText.value = content.name;
    this.setState(data);
  },

  render: function() {
    return (
      <div className="container">
        <GroceryList clickCallback={this.clickCallback} items={this.state.data}/>
        <div style={{
          marginTop: 12
        }}>
          <button className="btn" onClick={this.handleClick}>获取DOM</button>
          <input ref="showText" type="text"/>
        </div>
      </div>
    )
  }
});

export default App;
