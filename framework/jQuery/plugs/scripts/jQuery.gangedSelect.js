(function($) {
  jQuery.fn.gangedSelect = function(opts){
    var options = jQuery.extend({
      async: false,   // Asynchronous data
      url: '',        // Asynchronous request
      level: 1,        // 几级联动
      localData: []
    }, opts);
    var that = this;

    var rendeSelect = function(list){
      var str = '<option value="">请选择</option>';
      for(var i = 0, l = list.length; i < l; i++){
        var item = list[i] || {};
        str += '<option value="'+ item.code +'">'+ item.description +'</option>';
      }
      return str;
    };

    var requestData = function(data, cb){
      jQuery.ajax({
        url: options.url,
        method: 'POST',
        data: data,
        succuss: function(res){
          if(res && res.succuss){
            cb(res);
          }else{
            console.error('获取数据失败：' + res.errorMessage);
          }
        },
        error: function(res){
          console.error('获取数据异常：' + res.errorMessage);
        }
      });
    };

    this.on('change', 'select', function(){
      var index = that.find('select').index(e.target) + 1,
        v = this.value;
      if(options.async && index <= options.level){
        requestData({id: v}, function(res){
          var str =  rendeSelect(res.data || []);
          that.append('<select>'+str+'</select>');
        });
      }else{
        rendeSelect(localData);
      }
    });

    // init
    requestData({id: 1}, function(res){
      var str =  rendeSelect(res.data || []);
      that.append('<select>'+str+'</select>');
    });

    return this;
  };
})(jQuery);
