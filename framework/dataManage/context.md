## react context API

context API主要用来解决跨组件传参泛滥的问题（prop drilling)。

* 旧context API（react 16.3之前）

  虽然功能上context可以跨层级传递，但是本质上context也是同props一样一层一层的往下传递的，当层级过深的时候还是会出现效率问题，代码非常多的冗余，例如：childContextTypes 和 getChildContext。另外，shouldComponentUpdate方法能阻断context的传递，导致无法透传的情况。

  ```js
  // 传递者，生成数据并放入context中
  class DeliverComponent extends Component {  
    getChildContext() {
      return { color: "purple" };
    }
    render() {
      return <MidComponent />
    }
  }
  DeliverComponent.childContextTypes = {  
    color: PropTypes.string
  };

  // 中间与context无关的组件
  const MidComponent = (props) => <ReceiverComponent />;

  // 接收者，需要用到context中的数据
  const ReceiverComponent = (props, context) =>  
    <div style={{ color: context.color }}> Hello, this is receiver. </div>;
  ReceiverComponent.contextTypes = {  
    color: PropTypes.string
  };
  ReactDOM.render(  
    <DeliverComponent>
      <MidComponent>
        <ReceiverComponent />
      </MidComponent>
    </DeliverComponent>, document.getElementById('root'));
  ```

* 新context API（react 16.3）

  React自16.3开始提供了一个新的context api，彻底解决了旧Context API存在的种种问题。

  新的context api可以直接将context数据传递到传递到子组件中而不需要像旧context api那样级联传递。因此也可以突破shouldComponentUpdate的限制。

  ```js
  import React, { Component, createContext } from 'react';

  const DEFAULT_STATE = { color: 'red' };  
  const { Provider, Consumer } = createContext(DEFAULT_STATE);

  // 传递者，生成数据并放入context中
  class DeliverComponent extends Component {  
    state = { color: "purple" };

    render() {
      return (
        <Provider value={this.state}>
          <MidComponent />
        </Provider>
      )
    }
  }

  // 中间与context无关的组件
  const MidComponent = (props) => <ReceiverComponent />;

  // 接收者，需要用到context中的数据
  const ReceiverComponent = (props) => (  
    <Consumer>
      {context => (
        <div style={{ color: context.color }}> Hello, this is receiver. </div>
      )}
    </Consumer>
  );

  ReactDOM.render(  
    <DeliverComponent>
      <MidComponent>
        <ReceiverComponent />
      </MidComponent>
    </DeliverComponent>, document.getElementById('root'));
  ```

  新的context api主要包含一个Provider和Consumer对，在Provider输入的数据可以在Consumer中获得。