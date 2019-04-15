## vue双向绑定的实现

* Observer

  数据监听器Observer，对数据对象的所有属性进行监听，有变动获取最新值并通知订阅者。

  [Observer实现思路](./observe)

* Compile

  指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。

  [Compile实现思路](./compile)

* Watcher

  Watcher函数，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。

  [Watcher实现思路](./watcher)

* v_modal的简单实现

  自定义一个Form组件，通过contex向表单子组件暴露两个属：

  - modal，Form表单的所有数据（包括表单元素子组件），一般用键值对表示，modal可以由父组件传入，也可自控。

  - changeModal，改变modal数据的方法

  ```js
  class MyForm extends Component {
    static childContextTypes = {
      modal: PropTypes.object,
      changeModal: PropTypes.func,
    }

    constructor(props, context) {
      super(props, context);
      this.state = {
        modal: {},
      };
    }

    changeModal = (k, v) => {
      this.setState({
        modal: { ...this.state.modal, [k]: v },
      });
    }

    getChildContext() {
      return {
        modal: this.state.modal,
        changeModal: this.changeModal,
      };
    }

    onSubmit = () => {
      // 提交form表单所有数据
      console.log(this.state.modal);
    }

    render() {
      return (
        <div>
          {this.props.children}
          <button type="button" onClick={this.onSubmit}>提交</button>
        </div>
      )
    }
  }

  // 双向绑定HOC
  function proxyHoc(WrappedComponent) {
    return class extends Component {
      static contextTypes = {
        model: PropTypes.object,
        changeModel: PropTypes.func
      }

      onChange = (event) => {
        const { changeModel } = this.context;
        const { v_model } = this.props;
        changeModel(v_model, event.target.value);
      }

      render() {
        const { model } = this.context;
        const { v_model } = this.props;
        return <WrappedComponent {...this.props} value={model[v_model]} 
          onChange={this.onChange} />;
      }
    }
  }

  // 表单校验HOC
  function validateHoc(WrappedComponent) {
    return class extends Component {
      constructor(props) {
        super(props);
        this.state = { error: '' }
      }
      onChange = (event) => {
        const { validator } = this.props;
        if (validator && typeof validator.verifyFunc === 'function') {
          if (!validator.verifyFunc(event.target.value)) {
            this.setState({ error: validator.msg })
          } else {
            this.setState({ error: '' })
          }
        }
      }
      render() {
        return <div>
          <WrappedComponent onChange={this.onChange}  {...this.props} />
          <div className="error-info">{this.state.error || ''}</div>
        </div>
      }
    }
  }

  @proxyHoc
  @validateHoc
  class Input extends Component {
    render() {
      return <input {...this.props}></input>
    }
  }

  export default class extends Component {
    render() {
      const validatorName = {
        verifyFunc: (val) => !!val,
        msg: '请输入name'
      }
      const validatorPwd = {
        verifyFunc: (val) => val && val.length > 8,
        msg: '密码必须大于8位'
      }
      return (
        <MyForm>
          <Input type="text" v_model="name" validator={validatorName} />
          <Input type="password" v_model="pwd" validator={validatorPwd} />
        </MyForm>
      )
    }
  }
  ```




