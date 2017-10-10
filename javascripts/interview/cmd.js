// interview 打印样式调试
$$('.js-header-wrapper,.pagehead,.js-zeroclipboard-container,.commit-tease,.file-header,.site-footer-container,.footer').forEach(function(ele){
  ele.parentNode.removeChild(ele);
});
$$('.entry-content')[0].style.padding = '0px';
$$('.new-discussion-timeline')[0].style.width = '100%';
$$('.file')[0].style.margin = '0';
$$('.markdown-body h2').forEach(function(ele){
  ele.style.padding = '0px';
  ele.style.marginTop = '8px';
});






// md文件打印样式
$$('#footer_wrap,#header_wrap').forEach(function(ele){
  ele.parentNode.removeChild(ele);
});
$$('#main_content')[0].style.maxWidth = '900px';
$$('#main_content')[0].style.paddingTop = '0px';
$$('body')[0].style.fontSize = '15px';
