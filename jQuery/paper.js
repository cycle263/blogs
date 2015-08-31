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
            "currentForm": "body",      //格式： "jQuery(#myForm)" -- 同一页面多个分页组件必传
            "method": "GET",            //默认请求方法
            "currentPage": 0,           //当前页数
            "pageSize": 10,             //默认每页显示条数
            "maxPageNum": 8,            //默认每批最大页面数
            "firstPageNum": 1,          //默认第一个页码数
            "itemsCount": 0,            //总条数
            "pagesCount": 0             //总页数
        }, opts);

        var container = this,
            form = jQuery(opts.currentForm),
            renderPager = function(res, text, xhr){
                jQuery.extend(opts, {"itemsCount": res.itemsCount, "pagesCount": res.pagesCount});
                var pagesCount = opts.pagesCount - 0,
                    currentPage = opts.currentPage - 0,
                    str = '<div class="m-pager">'
                    +'<span>共计<i class="m-itemsCount">'+opts.itemsCount+'</i>条，一共<i class="m-pagesCount">'+pagesCount+'</i>页</span>';

                if(pagesCount){
                    if(currentPage > pagesCount || currentPage < 0 || !jQuery.isNumeric(currentPage)){
                        alert('无此页数据！');
                        return;
                    }
                    str += '<div class="m-page-right"><ul class="m-pager-list">';
                    str += renderFirstPage();
                    str += renderPrevPages();
                    str += renderPageNum();
                    str += renderNextPages();
                    str += renderLastPage();
                    str += "</ul>";
                    str += '<span class="m-page-skip"><input class="m-page-num" type="text" /><button class="m-page-btn">跳转</button></span>'
                        +'</div></div>';
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
                    alert('No data...');
                }else{
                    pageNums = difference > maxNum ? maxNum : difference;
                    for(var num = 1; num <= pageNums; i++,num++){
                        str += '<li class="' + (curPage === i ? 'active' : '') +'"><a class="pager-num" page-num="'+i+'">'+i+'</a></li>';
                    }
                }
                return str;
            },

            renderFirstPage = function(){
                var curPage = opts.currentPage - 0;
                if(curPage !== 1){
                    return '<li class="m-first-pager"><a>First</a></li>';
                }
                return '';
            },

            renderPrevPages = function(){
                var curPage = opts.currentPage - 0;
                if(curPage !== 1){
                    return '<li class="m-prev-pager"><a>Prev</a></li>';
                }
                return '';
            },

            renderNextPages = function(){
                var pCount = opts.pagesCount - 0,
                    firstNum = opts.firstPageNum - 0,
                    difference = pCount - firstNum,
                    maxNum = opts.maxPageNum - 0
                    curPage = opts.currentPage - 0;
                if(curPage !== pCount && difference > maxNum){
                    return '<li class="m-next-pager"><a>Next</a></li>';
                }
                return '';
            },

            renderLastPage = function(){
                var curPage = opts.currentPage - 0,
                    pagesCount = opts.pagesCount - 0;
                if(curPage !== pagesCount){
                    return '<li class="m-last-pager"><a>Last</a></li>';
                }
                return '';
            },

            initEvents = function(){                
                //查询按钮点击事件
                form.on("click", ".pager-query", function(event){
                    event.preventDefault();
                    opts.currentPage = 1;
                    pagerRequest();
                });

                //数字按钮点击事件
                form.on("click", ".m-pager-list li:not('.m-prev-pager,.m-next-pager')", function(event){
                    event.preventDefault();
                    opts.currentPage = jQuery(this).find('.pager-num').attr('page-num') - 0;                    
                    pagerRequest();
                });

                //首页末页事件
                form.on("click", ".m-first-pager, .m-last-pager", function(event){
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
                form.on("click", ".m-prev-pager, .m-next-pager", function(event){
                    event.preventDefault();
                    if(jQuery(this).hasClass("m-next-pager")){
                        opts.currentPage = form.find('.m-pager-list li:not(".m-next-pager") .pager-num').last().attr('page-num') - 0 + 1;
                    }else{
                        opts.currentPage = form.find('.m-pager-list li:not(".m-prev-pager") .pager-num').first().attr('page-num') - opts.maxPageNum;
                    }
                    opts.firstPageNum = opts.currentPage - 0;     
                    pagerRequest();
                });

                //跳转按钮点击事件
                form.on("click", ".m-pager .m-page-btn", function(event){
                    event.preventDefault();
                    opts.currentPage = jQuery(this).siblings('.m-page-num').val() - 0;

                    updateFirstPageNum();
                    if(!jQuery.isNumeric(opts.currentPage) || opts.currentPage <= 0){
                        alert('无此页数据！');
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
                opts.firstPageNum = batchs * maxNum + 1;
            },

            pagerRequest = function(){
                jQuery.extend(opts, jQuery.serializeObject(form));                
                jQuery.support.cors = true;     //兼容IE
                jQuery.ajax({
                    type: opts.method,
                    url: url,
                    data: jQuery.objectFilter(opts, function(value, key){
                        var notMust = {'currentForm': false, 'method': false, 'itemsCount': false, 'pagesCount': false};
                        if(!(key in notMust)){
                            return true;
                        }
                        return false;
                    }),
                    success: function(res, text, xhr){
                        renderPager(res, text, xhr);
                        callback(res, text, xhr);
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert('network error: ' + textStatus);
                        throw new Error(errorThrown);
                    }
                });
            };

        initEvents();
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
.m-pager{position: relative;font-family:"Microsoft YaHei", "微软雅黑",Georgia;}
.m-page-right{position: absolute;right: 20px;top:0;}
.m-pager-list{display: inline-block;margin:0;}
.m-pager-list li{display: inline-block;list-style:none;border: 1px solid #ddd; padding:4px 14px;cursor: pointer;}
.m-pager-list .active{background-color: #6cb5f4;color: #fff;border-color: #6cb5f4;}
.m-pager-list li:hover{background-color: #ccc;}
.m-page-num{width:40px;margin:0 5px;padding: 1px;}
 */

/*
 * exmaple:
 * jQuery('.pagerContainer').Paper(url,callback,opts)
 */
