```js
import ajax from 'ajax';
import Loading from 'Loading';
import Child from './Child';

class TrainingListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.requestData = this.requestData.bind(this);

    // 同步请求时阻塞渲染，出现白屏; 提前异步请求并不能规避二次渲染，相反不利于规范和语义理解
    this.requestData();
  }

  requestData(v) {
    ajax({
      method: 'GET',
      async: !!v,    // 同步或异步
    }).then(res => {
      this.dispatch('updateProps', { data: res});
    });
  }

  componentWillMount() {
    // react 16.3异步渲染可能执行多次，另外同构会执行两次，服务端和客户端各自执行一次
    this.requestData(true);
  }

  // componentDidMount主要用于有副作用的方法，例如事件监听，ajax请求，
  componentDidMount() {
    this.requestData(true);   // 官方推荐方式，避免各类问题
  }

  render() {
    const { data = [] } = this.props;
    return (
      <div style={{ width: '100%' }}>
        { // 复杂的渲染过程，极端情况下，初次渲染中ajax请求可能已经获取到response去更新state/props }
        <canvas />
        { // constructor 和 componentWillMount中发起ajax的话（无论同步和异步），Loading不会渲染 }
        { data ? data.map(item => <Child>{item.name || ""}</Child>) : <Loading /> }
      </div>
    );
  }
}
```