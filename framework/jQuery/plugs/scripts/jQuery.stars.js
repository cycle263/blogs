(function($) {
  $.fn.stars = function(options) {

    // default option
    var defaults = {

    };

    options = $.extend(defaults, options);

    this.each(function(key, ele){
      var initEvent = function(){
        $(ele).on('click', '.c-star', function(){

        });
      };

      initEvent();
    });
  };
})(jQuery);
