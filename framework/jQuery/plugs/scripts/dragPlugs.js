jQuery.fn.extend({
    'draggabled': function(options){
        var dragging = false,
            mousedown = {},
            docEle = document.body,
            target = this,
            _getPagePosition = function(){
                return {
                    x: event.clientX + docEle.scrollLeft,
                    y: event.clientY + docEle.scrollTop,
                    left: $(target).css('left'),
                    top: $(target).css('top'),
                };
            },
            _updateMousedownData = function(p){
                mousedown.x = p.x;
                mousedown.y = p.y;
                mousedown.left = parseInt(p.left, 10);
                mousedown.top = parseInt(p.top, 10);
            },
            _updateRectangle = function(){
                var p = _getPagePosition();
                $(target).css('left', p.x - mousedown.x + mousedown.left + 'px');
                $(target).css('top', p.y - mousedown.y + mousedown.top + 'px');
                console.log(p.x - mousedown.x + mousedown.left + 'px', p.y - mousedown.y + mousedown.top + 'px');
            };

        this.on('mousedown', function(event){
            event.preventDefault();
            _updateMousedownData(_getPagePosition());
            dragging = true;
            console.log(mousedown);
        });
        this.on('mousemove', function(event){
            event.preventDefault();
            if(dragging === true){
                _updateRectangle();
            }
        });
        $(docEle).on('mouseup', function(event){
            event.preventDefault();
            dragging = false;
        });
    }
});
