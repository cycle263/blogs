```js
import ajax from 'ajax';
import Loading from 'Loading';
import Child from './Child';

class TrainingListPage extends Component {
  constructor(props) {
    super(props);
    this.requestData = this.requestData.bind(this);

    // 阻塞渲染，出现白屏
    this.requestData();
  }

  requestData() {
    ajax({
      method: 'GET',
      async: false,    // 同步请求
    }).then(res => {
      this.dispatch('updateProps', { data: res});
    });
  }

  componentWillMount() {
    this.requestData();   // react 16.3异步渲染可能执行多次，另外同构会执行两次，服务端和客户端各自执行一次
  }

  // componentDidMount主要用于有副作用的方法，例如事件监听，ajax请求，
  componentDidMount() {
    this.requestData();   // 官方推荐方式，避免各类问题
  }

  render() {
    const { data = [] } = this.props;
    return (
      <div style={{ width: '100%' }}>
        { // constructor 和 componentWillMount中发起ajax的话（无论同步和异步），Loading不会渲染 }
        { data ? data.map(item => <Child>{item.name || ""}</Child>) : <Loading /> }
      </div>
    );
  }
}
```