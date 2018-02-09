* contributions贡献图

  ```
  var colors = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823'];
  $$('.js-calendar-graph-svg g rect').forEach(function(ele){
    var r = Math.floor(Math.random() * 5);
    ele.setAttribute('fill', colors[r]);
  });
  ```
