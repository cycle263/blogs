(function($) {
  $.fn.calendar = function(ym, data){
    data = data || [];
    var ymStr = ym.toString();
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();   // 当天日历的月份
    var year = today.getFullYear();
    var y = parseInt(ymStr.slice(0, 4));
    var m = parseInt(ymStr.slice(4)) - 1;   // 展示日历的月份
    var isLeap = function(year){    // 闰年判断
      return year % 4 === 0 ? (year % 100 !== 0 ? 1 : (year % 400 === 0 ? 1 : 0)) : 0;
    };
    var fristDay = new Date(y, m, 1);
    var dayOfWeek = fristDay.getDay();  // 当月头天星期几
    var days_per_month = new Array(31, 28 + isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var tr_num = Math.ceil((dayOfWeek + days_per_month[m]) / 7);  // 总行数
    var str = '<table class="date-table"><thead><tr><th>星期日</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th></tr></thead><tbody>';
    var renderContent = function(arr){
      var cstr = '';
      for(var m = 0; m < arr.length; m++){
        cstr += '<div class="content"><span class="info">'+arr[m].time+'</span><a class="info" href="' + arr[m].link + '" target="_blank">' + arr[m].name + '</a></div>';
      }
      return cstr;
    };

    for(var i = 0; i < tr_num; i++){
      str += '<tr>';
      for (j = 0; j < 7; j++){
        var index = i * 7 + j;  // 单元格index
        var date_temp = index - dayOfWeek + 1;
        var date = date_temp <= 0 ? days_per_month[m] + date_temp : date_temp > days_per_month[m] ? date_temp - days_per_month[m] : date_temp;
        var temp = [];
        var isThisMonth = !(date_temp <= 0 || date_temp > days_per_month[m]);   // 是否是本月日期
        for(var k = 0; k < data.length; k++){   // 展示对应日期的数据
          if(data[k].day === date){
            temp.push(data[k]);
          }
        }
        str += '<td ' + (date === day && month === m && year === y ? 'class="today"' : '') + '><div class="date-container"><span class="date">' + (!isThisMonth ? (index > 20 ? (m + 2 > 12 ? 1 : m + 2) : m) + '月' + date + '日' : date) + '</span>' + (temp && temp.length && isThisMonth ? renderContent(temp) : '') + '</div></td>';
      }
      str += '</tr>';
    }
    str += '</tbody></table>';
    $(this).html(str);
  };
})(jQuery);
