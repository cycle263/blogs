// interview 打印样式调试
$$('.js-header-wrapper,.pagehead,.js-zeroclipboard-container,.commit-tease,.file-header,.site-footer-container').forEach(function(ele){
  ele.parentNode.removeChild(ele);
});
$$('.entry-content')[0].style.padding = '0px';
$$('.new-discussion-timeline')[0].style.width = '100%';
$$('.file')[0].style.margin = '0';
