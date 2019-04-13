## react实现核心代码理解

* Component

  ```js
  function Component(props, context, update) {}
  Component.prototype.setState = function(partialState, callback) {}
  const React = {
    Component,
    // ...
  }
  ```

  - class component

    + component

    + pure component

  - function component

* component instance

  ref 可以指向一个dom节点或者一个类组件(class component)的实例，但是不能用于函数式组件。

* element

  类组件的render方法以及函数式组件的返回值均为element。

* createElement

  ```js
  // @ type [string|function|class]
  function createElement(type, props, ...children) {
    props = Object({}, props);
    props.children = [].concat(...children).filter(child => child !== null && child !== false)
      .map(child => child instanceof Object ? child : createTextElement(child));
    return {type, props};
  }
  ```

* render (ReactDOM.render)

  ```js
  // 缓存一帧虚拟DOM
  let rootInstance = null;
  function render(ele, parentDom) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(parentDom, prevInstance, ele);   // diff算法
    rootInstance = nextInstance;
  }
  ```

* instantiate

  关联真实的dom的方法

  ```js
  function instantiate(element) {
    const { type, props = {} } = element;
    const isDom = typeof type === 'string';   // dom类型或component类型
    // class or function component
    const isClassElement = !!(type.prototype && type.prototype.isReactComponent); 
    if (isDom) {
      const isText = type === TEXT_ELEMENT;
      const dom = isText ? document.createTextNode('') : document.createElement(type);
      updateDomProperties(dom, [], element.props);
      const children = props.children || [];
      const childInstances = children.map(instantiate);
      const childDoms = childInstances.map(inst => inst.dom);
      childDoms.forEach(childDom => dom.appendChild(childDom));
      return {
        element,
        dom,
        childInstances
      };
    } else if(isClassElement) {
      const instance = {};
      const publicInstance = createPublicInstance(element, instance);
      const childElement = publicInstance.render();
      const childInstance = instantiate(childElement);
      Object.assign(instance, {
        dom: childInstance.dom,
        element,
        childInstance,
        publicInstance
      });
      return instance;
    } else {
      // function component
      if (typeof type !== 'function') return null;
      const childElement = type(element.props);
      const childInstance = instantiate(childElement);
      return {
        dom: childInstance.dom,
        element,
        childInstance
      };
    }
  }
  ```

* reconcile (diff算法)

  react16将reconcile算法由之前的stack架构升级成了fiber架构，更近一步做的性能优化，不会阻塞js主线程，可以进行异步渲染。fiber架构底层是基于requestIdleCallback来调度diff算法的执行，也就是可以随时暂时diff比较执行，让用户输入、UI渲染等任务先行。requestIdleCallback是一个当浏览器处于闲置状态时，调度工作的新的性能相关的API.

  ```js
  function reconcile(parentDom, instance, element) {
    const { publicInstance } = instance;
    // 初次加载
    if (instance === null) {
      const newInstance = instantiate(element);
      const { publicInstance: pubInst } = newInstance;
      // componentWillMount
      pubInst && isFunction(pubInst.componentWillMount) && pubInst.componentWillMount();
      parentDom.appendChild(newInstance.dom);
      // componentDidMount
      pubInst && isFunction(pubInst.componentDidMount) && pubInst.componentDidMount();
      return newInstance;
    } else if(element === null) {
      // 卸载
      publicInstance && isFunction(publicInstance.componentWillUnmount)
        && publicInstance.componentWillUnmount();
      parentDom.removeChild(instance.dom);
      return null;
    } else if(instance.element.type !== element.type) {
      // next节点类型变化
      const newInstance = instantiate(element);
      const { publicInstance: pubInst } = newInstance;
      pubInst && isFunction(pubInst.componentDidMount) && pubInst.componentDidMount();
      parentDom.replaceChild(newInstance.dom, instance.dom);
      return newInstance;
    } else if(typeof element.type === 'string') {
      // 真实DOM
      updateDomProperties(instance.dom, instance.element.props, element.props);
      instance.childInstances = reconcileChildren(instance, element);
      instance.element = element;
      return instance;
    } else {
      // 更新情况
      if (publicInstance && isFunction(publicInstance.shouldcomponentUpdate)) {
        if (!publicInstance.shouldcomponentUpdate()) {
          return null;
        }
      }
      publicInstance && isFunction(publicInstance.componentWillUpdate)
        && publicInstance.componentWillUpdate();
      publicInstance.props = element.props;
      const newChildElement = publicInstance.render();
      const oldChildInstance = instance.childInstance;
      const newChildInstance = reconcile(parentDom, oldChildInstance, newChildElement);
      publicInstance && isFunction(publicInstance.componentDidUpdate)
        && publicInstance.componentDidUpdate();
      instance.dom = newChildInstance.dom;
      instance.childInstance = newChildInstance;
      instance.element = element;
      return instance;
    }
  }

  functio isFunction(func) {
    return typeof func === 'function';
  }

  function reconcileChildren (instance, element) {
    const { dom, childInstance } = instance;
    const newChildElements = element.props.children || [];
    const count = Math.max(childInstances.length, newChildElements.length);
    const newChildInstances = [];
    for (let i = 0; i < count; i++) {
        newChildInstances[i] = reconcile(dom, childInstances[i], newChildElements[i]);
    }
    return newChildInstances.filter(instance => instance !== null);
  }
  ```