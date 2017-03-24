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
          str += '<li data-id="' + item.id + '">' + (item.name || item.text || "") + innerStr + '</li>';
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
          }
        });

        // 拖动已选中项的位置
        var dragging = null,
          mousedown = {},
          docEle = document.body,
          _getPagePosition = function(target){
              return {
                  x: event.clientX + docEle.scrollLeft,
                  y: event.clientY + docEle.scrollTop,
                  left: target.css('left'),
                  top: target.css('top'),
              };
          },
          _updateMousedownData = function(p){
              mousedown.x = p.x;
              mousedown.y = p.y;
              mousedown.left = parseInt(p.left, 10);
              mousedown.top = parseInt(p.top, 10);
          },
          _updateRectangle = function(target){
              var p = _getPagePosition(dragging);
              target.css({'left': p.x - mousedown.x + mousedown.left + 'px', 'top': p.y - mousedown.y + mousedown.top + 'px'});
          },
          _updateSelect = function(target){
            var tele = null,
              mx = event.offsetX,
              my = event.offsetY,
              tx = target.offsetLeft,
              ty = target.offsetTop;
            select.find('li:not(.input)').each(function(k, ele){
              if(ele === target)return;
              var ex = ele.offsetLeft,
                ey = ele.offsetTop,
                ew = ele.offsetWidth,
                eh = ele.offsetHeight;

              if(my + ty >= ey - 4 && my + ty <= ey + eh + 4){
                if(mx + tx >= ex && mx + tx <= ex + ew/2){
                  $(target).insertBefore(ele);
                }else if(mx + tx > ex + ew/2){
                  tele = ele;
                }
              }
            });
            if(tele !== null){
              $(target).insertAfter(tele);
            }
            $(target).css({'left': '0px', 'top': '0px'}).removeClass('moving');
          };
        select.on('mousedown', 'li:not(.input)', function(event){
          event.stopPropagation();
          $(this).addClass('moving');
          dragging = $(this);
          _updateMousedownData(_getPagePosition(dragging));
        });
        select.on('mousemove', 'li:not(.input)', function(event){
          event.stopPropagation();
          if(dragging !== null){
            _updateRectangle(dragging);
          }
        });
        $(docEle).on('mouseup', function(event){
          event.stopPropagation();
          if(dragging === null) return;
          _updateSelect(dragging[0]);
          dragging = null;
        });

        // 删除已选项
        select.on('click', '.close', function(event){
          event.stopPropagation();
          $(this).parent().remove();
        });
        select.on('mousedown', '.close', function(event){
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
