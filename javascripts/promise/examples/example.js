/* wait方法 */
$.extend({
  wait: function(t){
    return $.Deferred(function(df){
      setTimeout(df.resolve, t);
    });
  }
});
