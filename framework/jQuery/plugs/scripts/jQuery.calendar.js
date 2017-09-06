(function($) {
  $.fn.calendar = function(ym){
    var ymStr = ym.toString();
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var y = parseInt(ymStr.slice(0, 4));
    var m = parseInt(ymStr.slice(4)) - 1;
    var isLeap = function(year){    // 闰年判断
      return year % 4 === 0 ? (year % 100 !== 0 ? 1 : (year % 400 === 0 ? 1 : 0)) : 0;
    };
    var fristDay = new Date(y, m, 1);
    var dayOfWeek = fristDay.getDay();
    var days_per_month = new Array(31, 28 + isLeap(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var tr_num = Math.ceil((dayOfWeek + days_per_month[m]) / 7);
    var str = '<table class="date-table"><thead><tr><th>星期日</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th></tr></thead><tbody>';
    for(var i = 0; i < tr_num; i++){
      str += '<tr>';
      for (j = 0; j < 7; j++){
        var index = i * 7 + j;
        var date = index - dayOfWeek + 1;
        date = date <= 0 ? days_per_month[m - 1] + date : date > days_per_month[m] ? date - days_per_month[m] : index - dayOfWeek + 1;
        str += '<td ' + (date === day && month === m && year === y ? 'class="today"' : '') + '><div class="date-container"><span class="date">' + date + '</span></div></td>';
      }
      str += '</tr>';
    }
    str += '</tbody></table>';
    $(this).html(str);
  };
})(jQuery);
