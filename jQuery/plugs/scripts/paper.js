/*
 * @url
 * @callback
 * @opts
 * exampel: jQuery("#container").Pager(url, cb, opts)
 * author: cycle
 * create date: 2015-08-21
 */
jQuery.fn.extend({
    /*
    * @url 请求地址(必传)
    * @callback 请求回调函数(必传)
    * @opts 其他可选参数
     */
    'Paper': function(url, callback, opts){
        if(!url){
            throw new SyntaxError('No url...');
        }
        if(!callback){
            throw new SyntaxError('No callback...');
        }
        if(!jQuery.isFunction(callback)){
            throw new TypeError('Callback is not function...');
        }

        opts = jQuery.extend({
            "isInitQuery": false,       //初始化是否查询数据
            "currentForm": "body",      //格式： "jQuery(#myForm)" -- 同一页面多个分页组件必传
            "method": "GET",            //默认请求方法
            "currentPage": 0,           //当前页数
            "pageSize": 10,             //默认每页显示条数
            "maxPageNum": 8,            //默认每批最大页面数
            "firstPageNum": 1,          //默认第一个页码数
            "itemsCount": 0,            //总条数
            "pagesCount": 0,            //总页数
            "showCountInfo": true,      //展示数据统计信息
            "showGoBtn": true,          //展示跳转按钮
        }, opts);

        var container = this,
            form = jQuery(opts.currentForm),
            renderPager = function(res, text, xhr){
                jQuery.extend(opts, {"itemsCount": res.itemsCount, "pagesCount": res.pagesCount});
                var pagesCount = opts.pagesCount - 0,
                    currentPage = opts.currentPage - 0,
                    str = opts.showCountInfo ? '<div class="m-pager">'
                    +'<span>共计<i class="m-itemsCount">'+opts.itemsCount+'</i>条，一共<i class="m-pagesCount">'+pagesCount+'</i>页</span>' : '<div class="m-pager">';

                if(pagesCount){
                    if(currentPage > pagesCount || currentPage < 0 || !jQuery.isNumeric(currentPage)){
                        console.error('无此页数据！');
                        return;
                    }
                    str += '<div class="m-page-right"><ul class="m-pager-list">';
                    str += renderPrevPages();
                    str += renderPageNum();
                    str += renderNextPages();
                    str += "</ul>";
                    if(opts.showCountInfo){
                        str += '<span class="m-page-skip"><input class="m-page-num" type="text" /><button class="button m-page-btn">Go</button></span>';
                    }
                    str += '</div></div>';
                }
                container.html(str);
            },

            renderPageNum = function(){
                var i = opts.firstPageNum - 0, str = '', pageNums,
                    pCount = opts.pagesCount - 0,
                    curPage = opts.currentPage - 0,
                    difference = pCount - i + 1,
                    maxNum = opts.maxPageNum - 0;
                if(!pCount){
                    console.error('No data...');
                }else{
                    pageNums = difference > maxNum ? maxNum : difference;
                    for(var num = 1; num <= pageNums; i++,num++){
                        if(i > 0) {
                          str += '<li class="m-pager-num ' + (curPage === i ? 'active' : '') +'"><a class="pager-num" page-num="'+i+'">'+i+'</a></li>';
                        }
                    }
                }
                return str;
            },

            renderPrevPages = function(){
                var curPage = opts.currentPage - 0;
                if(curPage !== 1){
                    return '<li class="m-first-pager"><a>First</a></li><li class="m-prev-pager"><a>Prev</a></li>';
                }
                return '';
            },

            renderNextPages = function(){
                var pCount = opts.pagesCount - 0,
                    curPage = opts.currentPage - 0;
                if(curPage !== pCount){
                    return '<li class="m-next-pager"><a>Next</a></li><li class="m-last-pager"><a>Last</a></li>';
                }
                return '';
            },

            // 渲染loading
            renderLoading = function(hide) {
              var body = $('body');
              if(hide) {
                if(body.contains('.loading-container')){
                  body.remove('.loading-container');
                }
              } else {
                var str = '<div class="loading-container"><div class="paper-loading">数据加载中...</div></div>';
                if(!body.contains('.loading-container')){
                  body.append(str);
                }
              }
            },

            initEvents = function(){
                //查询按钮点击事件
                form.off("click", ".pager-query").on("click", ".pager-query", function(event){
                    event.preventDefault();
                    opts.currentPage = 1;
                    pagerRequest();
                });

                //数字按钮点击事件
                form.off("click", ".m-pager-list .m-pager-num").on("click", ".m-pager-list .m-pager-num')", function(event){
                    event.preventDefault();
                    opts.currentPage = jQuery(this).find('.pager-num').attr('page-num') - 0;
                    pagerRequest();
                });

                //首页末页事件
                form.off("click", ".m-first-pager, .m-last-pager").on("click", ".m-first-pager, .m-last-pager", function(event){
                    event.preventDefault();
                    if(jQuery(this).hasClass("m-first-pager")){
                        opts.currentPage = 1;
                    }else{
                        opts.currentPage = opts.pagesCount - 0;
                    }
                    updateFirstPageNum();
                    pagerRequest();
                });

                //翻批次按钮点击事件
                form.off("click", ".m-prev-pager, .m-next-pager").on("click", ".m-prev-pager, .m-next-pager", function(event){
                    event.preventDefault();
                    var eles = $('.pager-num'),
                        f = eles.first().text() - 0,
                        l = eles.last().text() - 0,
                        maxNum = opts.maxPageNum - 0,
                        pCount = opts.pagesCount - 0;

                    if(jQuery(this).hasClass("m-next-pager")){
                        opts.currentPage = form.find('.m-pager-list .active .pager-num').attr('page-num') - 0 + 1;
                    }else{
                        opts.currentPage = form.find('.m-pager-list .active  .pager-num').attr('page-num') - 1;
                    }
                    if(opts.currentPage !== pCount && opts.currentPage !== 1){
                        if(opts.currentPage === l){
                            opts.firstPageNum = opts.currentPage - 0;
                        }else if(opts.currentPage === f){
                            var temp =  opts.currentPage - (maxNum - 1);
                            opts.firstPageNum = temp > 0 ? temp : opts.firstPageNum;
                        }
                    }
                    pagerRequest();
                });

                //跳转按钮点击事件
                form.off("click", ".m-pager .m-page-btn").on("click", ".m-pager .m-page-btn", function(event){
                    event.preventDefault();
                    opts.currentPage = jQuery(this).siblings('.m-page-num').val() - 0;

                    updateFirstPageNum();
                    if(!jQuery.isNumeric(opts.currentPage) || opts.currentPage <= 0){
                        console.error('无此页数据！');
                        return;
                    }
                    pagerRequest();
                });
            },

            updateFirstPageNum = function(){
                var curPage = opts.currentPage - 0,
                    maxNum = opts.maxPageNum - 0,
                    batchs = Math.floor(curPage / maxNum);
                batchs = curPage % maxNum === 0 ? batchs - 1 : batchs;
                var temp = batchs * maxNum + 1;
                opts.firstPageNum = temp > 0 ? temp : 1;
            },

            pagerRequest = function(){
                jQuery.extend(opts, jQuery.serializeObject(form));
                jQuery.support.cors = true;     //兼容IE
                jQuery.ajax({
                    type: opts.method,
                    url: url,
                    data: jQuery.objectFilter(opts, function(value, key){
                        var notMust = {'currentForm': false, 'method': false, 'itemsCount': false, 'pagesCount': false, 'isInitQuery': false, 'firstPageNum': false, 'maxPageNum': false, 'showCountInfo': false, 'showGoBtn': false};
                        if(!(key in notMust)){
                            return true;
                        }
                        return false;
                    }),
                    success: function(res, text, xhr){
                        callback(res, text, xhr);
                        renderPager(res, text, xhr);
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        console.error('network error: ' + textStatus);
                        throw new Error(errorThrown);
                    }
                });
            };

        initEvents();
        if(opts.isInitQuery){
            opts.currentPage = 1;
            pagerRequest();
        }
        this.refreshPager = pagerRequest;

        return this;
    }
});

//序列化成json对象
jQuery.extend({
    "serializeObject": function(jQueryform){
        if(jQuery.type(jQueryform) !== "object"){
            throw new TypeError('Param is not jQuery selector...');
        }

        var tempArr = jQueryform.serializeArray(),
            result = {};
        jQuery.map(tempArr, function(n, i){
            result[n['name']] = n['value'];
        });

        return result;
    },
    //过滤json对象方法
    "objectFilter": function(obj, predicate) {
        var result = {}, key;

        for (key in obj) {
            if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
                result[key] = obj[key];
            }
        }

        return result;
    }
});

/*
 * 样式
.m-pager{position: relative;font-family:"Microsoft YaHei", "微软雅黑",Georgia;min-height:32px;margin: 8px;}
.m-page-right{position: absolute;right: 20px;top:0;}
.m-pager-list{display: inline-block;margin:0;}
.m-pager-list li{display: inline-block;list-style:none;border: 1px solid #ddd; padding:4px 10px;cursor: pointer;border-radius: 6px;}
.m-pager-list .active{background-color: #6cb5f4;color: #fff;border-color: #6cb5f4;}
.m-pager-list .active a{color: #fff;}
.m-pager-list li:hover{background-color: #ddd;}
.m-page-num{width:40px;margin:0 5px;padding: 1px;}
.m-page-btn{}
 */

 /*
  * loading样式
.loading-container{
  width:100%;
  height:100%;
  position:fixed;
  background-color:rgba(0,0,0,.4);
  top:0;
  left:0;
  z-index: 9999;
}
.paper-loading {
  font-size: 10px;
  position:absolute;
  top:50%;
  margin-top:-5.5em;
  margin: 5em auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: loadAnimation 1.4s infinite linear;
  animation: loadAnimation 1.4s infinite linear;
}
.paper-loading:before {
  width: 50%;
  height: 50%;
  background: #FFF;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.paper-loading:after {
  background: #0dcecb;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes loadAnimation {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loadAnimation {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
 */

/*
 * exmaple:
 * jQuery('.pagerContainer').Paper(url,callback,opts)
 */
