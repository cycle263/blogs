jQuery.fn.extend({
    /*
     * @id 容器id  
     * @showMonth 展示月份部分
     */
    "monthCalendar": function(showMonth){
        var container = this,
            curFirstYear,
            input = container.find('#c-month-input');

        //渲染月份
        var renderMonth = function(){
            var m = (new Date()).getMonth() + 1, str = '', arr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            for(var i = 1, l = arr.length; i <= l; i++){
                str += '<li data-value="' + i + '">' + arr[i - 1] + '</li>';
            }
            container.find('.c-calendar-month').html(str).find('li').filter(function(){return jQuery(this).data("value") - 0 === m}).addClass('active');
        };

        //渲染年份
        var renderYear = function(){
            var y = (new Date()).getFullYear(), str = '<li class="c-prev"><<</li><li class="c-next">>></li><li>', arr = [];
            curFirstYear = curFirstYear === undefined ? y - 4 : curFirstYear;
            for(var i = 0; i < 10; i++){
                arr.push(curFirstYear + i);
            }
            str += arr.join("</li><li>");
            str += "</li>";
            container.find('.c-calendar-year').html(str).find('li').filter(function(){return jQuery(this).text() - 0 === y}).addClass('active');
        };

        var init = function(){
            showMonth ? renderMonth() : container.find('.c-calendar-month').hide();
            renderYear();

            //弹出日历选择框
            container.on('click', '#c-month-input,.c-down-arrow', function(event){
                event.stopPropagation();
                event.preventDefault();
                jQuery(this).siblings('.c-month-calendar').show();
            });

            //年月选择事件
            container.on('click', 'li:not(".c-next,.c-prev")', function(event){
                var me = jQuery(this);
                me.closest('ul').find('.active').removeClass('active');
                me.addClass('active');
            });

            //下一批年份
            container.on('click', '.c-next', function(event){
                curFirstYear += 10;
                renderYear();
            });
            //上一批年份
            container.on('click', '.c-prev', function(event){
                curFirstYear -= 10;
                renderYear();
            });

            //OK按钮点击事件
            container.on('click', '.c-btns .button-primary', function(event){
                var str = '',
                    m = container.find('.c-calendar-month .active').data('value') - 0,
                    y = container.find('.c-calendar-year .active').text();
                str = showMonth ? y + (m > 9 ? "-" + m : "-0" + m) : y;
                input.val(str);
                jQuery('.c-month-calendar').hide();
            });

            //隐藏日历选择框
            container.on('click', '.c-btns .button', function(event){
                jQuery('.c-month-calendar').hide();
            });
        };

        init();
    }
});
