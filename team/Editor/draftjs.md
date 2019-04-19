## draftjs

* editorState

  整个编辑器的状态对象，初始化通过静态方法EditorState.createEmpty方法创建空文本editorState。

* contentState

* Entity

  文本上附加一些额外的信息，比如超链接

* Decorator

  自定义组件来渲染特定的内容，使用CompositeDecorator类定义所需的装饰器行为

* blockRendererFn

  ```js
  const ImgComponent = (props) => {
    return (
      <img style={{height: '300px', width: 'auto'}} src={props.blockProps.src} alt="图片"/>
    )
  }

  function myBlockRenderer(contentBlock) {
    // 获取到contentBlock的文本信息，可以用contentBlock提供的其它方法获取到想要使用的信息
    const text = contentBlock.getText();

    // 我们假定这里图片的文本格式为![图片名称](htt://....)
    let matches = text.match(/\!\[(.*)\]\((http.*)\)/);
    if (matches) {
      return {
        component: ImgComponent,  // 指定组件
        editable: false,  // 这里设置自定义的组件可不可以编辑，因为是图片，这里选择不可编辑
        // 这里的props在自定义的组件中需要用this.props.blockProps来访问
        props: {
            src: matches[2],,
        }
      };
    }
  }


  // 调用
  <Editor
    editorState={this.state.editorState}
    onChange={this.onChange}
    blockRendererFn={myBlockRenderer}/>
  ```

## draft API

* RichUtils.toggleInlineStyle

  @editorState 光标选中区域的editorState, @inlineStyle 内联样式map名称。

* contentState.getBlockForKey(blockKey)

  获取blockKey对应的contentBlock


### 参考资料

[draftjs开发富文本|marx](https://marxjiao.com/2017/08/14/use-draft-js/)
[draftjs中文文档翻译](http://seejs.me/draft-js-cn/docs/apican-kao/richutils.html)