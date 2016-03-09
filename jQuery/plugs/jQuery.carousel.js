$(function(){
    jQuery.fn.carousel = function(opts){
        var setttings = jQuery.extend({
            intervalTime: 5     //轮询时间间隔
        }, opts);

        this.each(function(key, ele){
            var carouselEle = $(this),
                carousel = {};
            carousel = {
                intervalNum: -1,
                init: function(){
                    carousel.initEvent();
                    carousel.cycle();
                },
                initEvent: function(){
                    carouselEle.on('click', '.carousel-indicators li', function(){
                        var n = $(this).data('slide-to') - 0,
                            i = $('.carousel-indicators .active', carouselEle).data('slide-to') - 0,
                            direction = n > i ? 'left' : 'right';
                        if(n !== i) carousel.goTo(i, n, direction);
                        clearInterval(carousel.intervalNum);
                        carousel.cycle();
                    });

                    carouselEle.on('click', '.carousel-control', function(){
                        var i = $('.carousel-indicators .active', carouselEle).data('slide-to') - 0,
                            len = $('.carousel-indicators li', carouselEle).length - 0,
                            direction = $(this).hasClass('right') ? 'left' : 'right';
                        if($(this).hasClass('right')){
                            n = i >= len - 1 ? 0 : i + 1;
                        }else{
                            n = i <= 0 ? len - 1 : i - 1;
                        }
                        carousel.goTo(i, n, direction);
                        clearInterval(carousel.intervalNum);
                        carousel.cycle();
                    });
                },
                whichTransitionEvent: function(){
                    var el = document.createElement('fakeelement');
                    var transitions = {
        			    'transition': 'transitionend',
        			    'OTransition': 'oTransitionEnd',
        			    'MozTransition': 'transitionend',
        			    'WebkitTransition': 'webkitTransitionEnd'
    			    };
                    for(var t in transitions){
                        if( el.style[t] !== undefined ){
                            return transitions[t];
                        }
                    }
                },
                cycle: function(){
                    carousel.intervalNum = setInterval(function () {
                        $('.carousel-control.right', carouselEle).trigger('click');
                    }, 1000 * setttings.intervalTime);
                },
                goTo: function(index, next, direction){
                    var len = $('.carousel-indicators li', carouselEle).length - 0,
                        type = direction === 'right' ? 'prev' : 'next';

                    jQuery('.carousel-indicators .active', carouselEle).removeClass('active');
                    jQuery('.carousel-indicators li', carouselEle).eq(next).addClass('active');

                    jQuery('.carousel-inner .item', carouselEle).eq(next).addClass(type).width();     //强制回流

                    jQuery('.carousel-inner .active', carouselEle).addClass(direction);
                    jQuery('.carousel-inner .item', carouselEle).eq(next).addClass(direction).width();

                    jQuery('.carousel-inner .item.active', carouselEle).one(carousel.whichTransitionEvent(), function(){
                        jQuery('.carousel-inner .active', carouselEle).removeClass('active ' + direction);
                        jQuery('.carousel-inner .item', carouselEle).eq(next).removeClass(type + ' ' + direction).addClass('active');
                    });
                }
            };

            carousel.init();
        });

        return this;
    };
});
