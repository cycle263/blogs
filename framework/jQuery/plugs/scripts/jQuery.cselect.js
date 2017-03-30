(function($) {
  $.fn.cselect = function(opts) {

    // default option
    var defaults = {
      method: 'POST',
      dragElement: null,
      targetElement: null,
      prevTarget: null
    };

    opts = $.extend(defaults, opts);

    this.each(function(key, ele){
      var select = $(ele),
        container = select.parent(),
        items = container.find('.select-items'),
        currentRequest = null,
        inputStr = '<li class="input"><input class="hidden-input" type="text" /></li>',
        innerStr = '<span class="close">x</span><span class="before"></span><span class="after"></span>';

      // 异步获取数据
      var requestData = function(name){
        items.html('数据加载中...').css({'top': select[0].clientHeight + 1, 'width': select.width()}).show();
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
            if(res.success || res.total) {
              renderItems(res.data);
              currentRequest = null;
            } else {
              items.html('搜索为空').css({'top': select[0].clientHeight + 1, 'width': select.width()}).show();
            }
          }
        });
      };

      // 渲染待选项的html
      var renderItems = function(data){
        if(Object.prototype.toString.call(data).slice(8,-1) !== "Array"){
          throw TypeError('Parameter is not an array');
          return;
        }

        var str = data.length ? '' : '数据为空',
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
      };

      // 渲染下拉框默认值
      var renderSelect = function(data){
        data = data || [];
        var str = '';
        data.forEach(function(item){
          str += '<li draggable="true" data-id="' + item.id + '">' + (item.name || item.text || "") + innerStr + '</li>';
        });
        select.html(str);
      };

      var initEvent = function(){
        // 键盘输入事件
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

        // 任意位置插入选项
        select.on('click', '.before, .after', function(event){
          event.stopPropagation();
          select.find('.input').remove();
          if($(this).hasClass('before')){
            $(inputStr).insertBefore($(this).parent()).find('input').focus();
          } else if($(this).hasClass('after')){
            $(inputStr).insertAfter($(this).parent()).find('input').focus();
          }
          requestData('');
        });
        container.on('click', '.c-select', function(event){
          event.stopPropagation();
          select.find('.input').remove();
          if($(this).hasClass('c-select')){
            var my = event.offsetY,
              oy = select[0].scrollTop,
              targetEle = null;
            $(this).find('li').each(function(k, ele){
              var ey = ele.offsetTop,
                eh = ele.offsetHeight;
              if(my + oy >= ey - 4 && my + oy <= ey + eh + 4){
                targetEle = ele;
              }
            });
            if(targetEle !== null){
              $(inputStr).insertAfter(targetEle).find('input').focus();
            }else{
              $(inputStr).appendTo(this).find('input').focus();
            }
            requestData('');
          }
        });

        // 拖动已选中项的位置 'dragstart', 'dragend', 'dragover', 'dragenter', 'drop'
        var docEle = document.body,
          _debounce = function(fn, delay, context) {
            var timer = null

            if (delay === 0) {
              return fn
            }
            return function () {
              var eContext = context || this
              var args = arguments
              clearTimeout(timer)
              timer = setTimeout(function () {
                fn.apply(eContext, args)
              }, delay)
            }
          },
          _insertBeforeEle = function(isMoving, ele, target){
            if(isMoving){
              if(!$('li.ghost').length){
                $(target).clone().addClass('ghost').css({'left': '0px', 'top': '0px'}).removeClass('moving').insertBefore(ele);
                opts.prevTarget = ele;
              }else{
                if(ele === opts.prevTarget) return;
                $('li.ghost').remove();
                $(target).clone().addClass('ghost').css({'left': '0px', 'top': '0px'}).removeClass('moving').insertBefore(ele);
              }
            }else{
              $('li.ghost').remove();
              $(target).insertBefore(ele);
            }
          },
          _insertAfterEle = function(isMoving, ele, target){
            if(isMoving){
              if(!$('li.ghost').length){
                $(target).clone().addClass('ghost').css({'left': '0px', 'top': '0px'}).removeClass('moving').insertAfter(ele);
                opts.prevTarget = ele;
              }else{
                if(ele === opts.prevTarget) return;
                $('li.ghost').remove();
                $(target).clone().addClass('ghost').css({'left': '0px', 'top': '0px'}).removeClass('moving').insertAfter(ele);
              }
            }else{
              $('li.ghost').remove();
              $(target).insertAfter(ele);
            }
          },
          _updateSelect = function(isMoving){
            var dragtarget = opts.dragElement;
            var toTarget = opts.targetElement;
            var px = event.pageX;
            var py = event.pageY;
            var o = $(toTarget).offset();
            var ex = o.left,
              ey = o.top,
              ew = toTarget.offsetWidth,
              eh = toTarget.offsetHeight;

            if(py >= ey && py <= ey + eh + 3){
              if(px >= ex && px <= ex + ew/2 + 8){
                _insertBeforeEle(isMoving, toTarget, dragtarget);
              }else if(px > ex + ew/2){
                _insertAfterEle(isMoving, toTarget, dragtarget);
              }
            }
          };
        select.on('dragstart', 'li:not(.input)', function(){
          event.stopPropagation();
          opts.dragElement = this;
          event.dataTransfer.dropEffect = "move";
        });
        select.on('dragenter', 'li:not(.input)', function(){
          event.stopPropagation();
          if(this === opts.dragElement) return;
          opts.targetElement = this;
          _updateSelect(true);
        });
        select.on('dragend', 'li:not(.input)', function(){
          event.stopPropagation();
          _updateSelect();
          console.log(event.pageY, event.pageX, $(opts.targetElement).offset());
        });

        // 删除已选项
        select.on('click', '.close', function(){
          event.stopPropagation();
          $(this).parent().remove();
        });
        select.on('mousedown', '.close', function(){
          event.stopPropagation();
          $(this).parent().remove();
        });

        // 选中待选项
        var cacheEle = null;
        items.on('click', 'li', function(event){
          event.stopPropagation();
          var tempIndex = -1;
          if($(this).hasClass('selected')) return;
          if(select.find('.input').length){
            tempIndex = select.find('.input').index();
            select.find('.input').replaceWith($(this.outerHTML).append(innerStr));
            cacheEle = select.find('li').eq(tempIndex);
          }else{
            cacheEle = ($(this.outerHTML).append(innerStr)).insertAfter(cacheEle);
          }
          $(this).addClass('selected');
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
  position: relative;
  width: 360px;
  max-height: 200px;
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
.c-select li.moving{
  cursor: move;
  z-index: 9;
  opacity: .8;
  color: #999;
}
.c-select li.insertAfter, .c-select li.insertBefore{
  border: 1px solid red;
}
.c-select li.insertAfter::after, .c-select li.insertBefore::before{
  content: '';
  position: absolute;
  top: 0;
  width: 50%;
  height: 25px;
  background-color: #999;
  opacity: .7;
}
.c-select li.insertAfter::after{
  right: 0;
}
.c-select li.insertBefore::before{
  left: 0;
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
.ghost{opacity:.8;}
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
