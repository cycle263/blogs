define("utils/sharing", ["jQuery"], function(e) {
    var t = {
        twitter: function(t) {
            window.open("http://twitter.com/home?status=" + encodeURIComponent(e("title").text() + " " + location.href))
        },
        facebook: function(e) {
            window.open("http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURIComponent(location.href))
        },
        "google-plus": function(e) {
            window.open("https://plus.google.com/share?url=" + encodeURIComponent(location.href))
        },
        weibo: function(t) {
            window.open("http://service.weibo.com/share/share.php?content=utf-8&url=" + encodeURIComponent(location.href) + "&title=" + encodeURIComponent(e("title").text()))
        },
        instapaper: function(e) {
            window.open("http://www.instapaper.com/text?u=" + encodeURIComponent(location.href))
        },
        vk: function(e) {
            window.open("http://vkontakte.ru/share.php?url=" + encodeURIComponent(location.href))
        }
    }
      , n = function() {
        e(document).on("click", "a[data-sharing],button[data-sharing]", function(n) {
            n && n.preventDefault();
            var r = e(this).data("sharing");
            t[r](e(this))
        })
    }
    ;
    return {
        init: n
    }
})
