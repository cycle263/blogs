/*! jQuery ellipsis - v1.1.1 - 2016-12-28
* Copyright (c) 2016 cycle263; Licensed MIT */
(function($) {
    $.fn.ellipsis = function(options) {

        // default option
        var defaults = {
            'row' : 1, // show rows
            'onlyFullWords': false, // set to true to avoid cutting the text in the middle of a word
            'char' : '...', // ellipsis, supports HTML format
            'callback': function() {}
        };

        options = $.extend(defaults, options);

        this.each(function() {
            // get element text
            var $this = $(this);
            var text = $this.text();
            var origText = text;
            var origLength = origText.length;
            var origHeight = $this.height();

            // get height
            $this.html('a');
            var lineHeight =  parseFloat($this.css("lineHeight"), 10);
            var rowHeight = $this.height();
            var gapHeight = lineHeight > rowHeight ? (lineHeight - rowHeight) : 0;
            var targetHeight = gapHeight * (options.row - 1) + rowHeight * options.row;

            if (origHeight <= targetHeight && origHeight !== 0) {
                $this.html(text);
                return;
            }

            var start = 1, length = 0;
            var end = text.length;
            var isHtml = options['char'].indexOf('<') > -1;

            while (start < end) { // Binary search for max length
                length = Math.ceil((start + end) / 2);

                $this.html(text.slice(0, length) + options['char']);

                if ($this.height() <= targetHeight) {
                    start = length;
                } else {
                    end = length - 1;
                }
            }

            text = text.slice(0, start);

            if (options.onlyFullWords) {
                text = text.replace(/[\u00AD\w\uac00-\ud7af]+$/, ''); // remove fragment of the last word together with possible soft-hyphen characters
            }
            text += options['char'];

            $this.html(text);

            options.callback.call(this);
        });

        return this;
    };
}) (jQuery);
