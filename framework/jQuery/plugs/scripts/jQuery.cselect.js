(function($) {
  $.fn.cselect = function(opts) {

    // default option
    var defaults = {
      method: 'POST'
    };

    opts = $.extend(defaults, opts);

    this.each(function(key, ele){
      var select = $(ele),
        container = select.parent(),
        items = container.find('.select-items'),
        currentRequest = null,
        inputStr = '<li class="input"><input class="hidden-input" type="text" /></li>',
        innerStr = '<span class="close">x</span><span class="before"></span><span class="after"></span>',
        requestData = function(name){
          currentRequest = jQuery.ajax({
            url: opts.url || '',
            type: opts.method,
            data: jQuery.extend(opts.data, {meterialNameOption: encodeURIComponent(name)}),
            beforeSend: function()    {
              if(currentRequest != null) {
                currentRequest.abort();
              }
            },
            success: function(res) {
              if(res.success) {
                var str = '',
                  data = res.data,
                  selectedItem = select.find('li').map(function(k, ele){
                    return $(ele).data('id');
                  }).toArray();
                for(var i = 0, l = data.length; i < l; i++){
                  var item = data[i], selected = '';
                  for(var j = 0, len = selectedItem.length; j < len; j++){
                    if(item.id === selectedItem[j]){
                      selected = 'selected';
                    }
                  }
                  str += '<li class="' + selected + '" data-id="' + item.id + '">' + (item.name || item.text || "") + '</li>';
                }
                items.html(str).css({'top': select[0].clientHeight + 1, 'width': select.width()}).show();
                currentRequest = null;
              }else {
                items.html('搜索为空').css({'top': select[0].clientHeight + 1, 'width': select.width()}).show();
              }
            }
          });
        };

      var renderSelect = function(data){
        data = data || [];
        data.forEach(function(item){
          select.html('<li data-id="' + item.id + '">' + (item.name || item.text || "") + innerStr + '</li>');
        });
      };

      var initEvent = function(){
        select.on('keyup', '.input input', function(){
          var me = $(this),
            t = me.val();
          me.css('width', (t.length * 13 + 12) + 'px');
          requestData(t);
        });
        select.on('click', '.input input', function(event){
          event.stopPropagation();
        });

        $('body').click(function(){
          select.find('.input').remove();
          items.hide();
        });
        select.on('click', '.before, .after', function(event){
          event.stopPropagation();
          select.find('.input').remove();
          if($(this).hasClass('before')){
            $(inputStr).insertBefore($(this).parent()).find('input').focus();
          } else if($(this).hasClass('after')){
            $(inputStr).insertAfter($(this).parent()).find('input').focus();
          }
        });
        container.on('click', '.c-select', function(event){
          event.stopPropagation();
          select.find('.input').remove();
          if($(this).hasClass('c-select')){
            var mx = event.offsetX,
              my = event.offsetY,
              targetEle = null;
            $(this).find('li').each(function(k,ele){
              var ex = ele.offsetLeft,
                ey = ele.offsetTop,
                ew = ele.offsetWidth,
                eh = ele.offsetHeight;
              if(my >= ey && my <= ey + eh){
                targetEle = ele;
              }
            });
            if(targetEle !== null){
              $(inputStr).insertAfter(targetEle).find('input').focus();
            }else{
              $(inputStr).appendTo(this).find('input').focus();
            }
          }
        });
        select.on('click', 'li:not(.input)', function(event){
          event.stopPropagation();
          select.find('.input').remove();
          $(inputStr).insertAfter(this).find('input').focus();
        });

        select.on('click', '.close', function(event){
          event.stopPropagation();
          $(this).parent().remove();
        });

        items.on('click', 'li', function(event){
          event.stopPropagation();
          if($(this).hasClass('selected')) return;
          select.find('.input').replaceWith($(this.outerHTML).append(innerStr));
          items.hide();
        });
      };

      initEvent();
      ele.renderSelect = renderSelect;
    });
    return this;
  };
})(jQuery);

/*
.c-select {
  width: 280px;
  max-height: 300px;
  min-height: 36px;
  padding: 4px 2px;
  margin: 0;
  border: 1px solid #aaa;
  border-radius: 5px;
  overflow: auto;
}
.c-select li{
  display: inline-block;
  position: relative;
  list-style: none;
  padding: 2px 0px 2px 16px;
  border: 1px solid #aaa;
  border-radius: 5px;
  margin: 3px 8px;
  background-color: #e4e4e4;
  color: #555;
  font-size: 14px;
  white-space: nowrap;
}
.c-select li .before, .c-select li .after{
  display: inline-block;
  position: absolute;
  width: 8px;
  height: 24px;
  top: 0;
}
.c-select li .before{
  left: -9px;
}
.c-select li .after{
  right: -9px;
}
.c-select li .close{
  display: inline-block;
  height: 20px;
  width: 24px;
  line-height: 20px;
  text-align: center;
  color: #999;
  cursor: pointer;
}
.c-select li.input{
  padding: 0;
  outline: none;
  border: none;
  margin: 0;
}
.c-select li.input input{
  outline: none;
  font-size: 13px;
}
.hidden-input {
  border: none;
  width: 24px;
  padding: 6px;
  height: 32px;
  display: inline-block;
}
.select-items {
  width: 280px;
  max-height: 300px;
  position: absolute;
  top: 75px;
  z-index: 9;
  background: #fff;
  color: #666;
  border: 1px solid #999;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  overflow: hidden;
  padding: 2px;
  margin: 0;
  overflow: auto;
}
.select-items li {
  cursor: pointer;
  padding: 4px 16px;
  list-style: none;
  line-height: 24px;
  white-space: nowrap;
}
.select-items li:hover{
  background-color: #5897fb;
  color: #fff;
}
.select-items li.selected {
  background-color: #ddd;
}
*/
