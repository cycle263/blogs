(function($) {
  $.fn.Cstars = function(options) {

    // default option
    var defaults = {
      starsNum: 5    // number of the stars
    };

    options = $.extend(defaults, options);

    this.each(function(key, ele){
      var container = $(ele);

      var initHtml = function(){
        var str = '';
        for(var i = 0; i < options.starsNum; i++){
          str += '<span class="c-star" data-key="'+ (i + 1) +'"></span>';
        }
        container.html(str + '<input type="hidden" name="'+ container.attr("name") +'" />');
      };

      var initEvent = function(){
        container.on('click', '.c-star', function(){
          var me = $(this),
            input = container.find('input'),
            key = me.data('key') - 0,
            stars = container.find('.c-star');
          input.val(key);
          stars.toggleClass('c-star-checked', false);
          me.prevAll().add(me).addClass('c-star-checked');
        });
      };

      initHtml();
      initEvent();
    });
    return this;
  };
})(jQuery);
