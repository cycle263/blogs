* contributions贡献图

  ```js
  var colors = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823', '#eeeeee', '#eeeeee'];
  $$('.js-calendar-graph-svg g rect').forEach(function(ele){
    var r = Math.floor(Math.random() * 7);
    ele.setAttribute('fill', colors[r]);
  });
  ```

* interview 源码文件打印样式调试

  ```js
  $$('.js-header-wrapper,.file-navigation,.pagehead,.js-zeroclipboard-container,.commit-tease,.file-header,.site-footer-container,.footer').forEach(function(ele){
    ele.parentNode.removeChild(ele);
  });
  $$('.entry-content')[0].style.padding = '0px';
  $$('.new-discussion-timeline')[0].style.width = '100%';
  $$('.file')[0].style.margin = '0';
  $$('.markdown-body li>p, .markdown-body li, .markdown-body h2').forEach(function (ele) {
    ele.style.marginBottom = '6px';
    ele.style.marginTop = '6px';
    ele.style.fontSize = '14px';
    ele.style.lineHeight = '22px';
  });
  ```

* md文件打印样式

  ```js
  $$('#footer_wrap,#header_wrap').forEach(function(ele){
    ele.parentNode.removeChild(ele);
  });
  $$('#main_content')[0].style.maxWidth = '900px';
  $$('#main_content')[0].style.paddingTop = '0px';
  $$('body')[0].style.fontSize = '15px';
  ```