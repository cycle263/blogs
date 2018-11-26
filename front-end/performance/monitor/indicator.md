## 前端指标监控

* 白屏时间；

* 首屏时间；

    - 首屏相关的除了 FP 还有两个指标，分别称为 FCP (First Contentful Paint，页面有效内容的绘制) 和 FMP (First Meaningful Paint，页面有意义的内容绘制)

* 用户可交互时间；

* 总下载时间；

* DNS解析时间；

* TCP连接时间；

* HTTP请求时间；

* HTTP响应时间；

* 页面停留时长

    window.onload / window.onbeforeunload, pageshow / pagehide, onfoucs / onblur, visibilitychange

    |       action        |        desc        |
    | ------------------- | ------------------ |
    |         进入         | 加载，跳转，刷新，前进后退 |
    |      活跃状态切换      | 失焦，最小化，切换tab, 电脑休眠  |
    |           离开        | 关闭页面，跳转，刷新，前进后退   |

## 页面加载时间计算

* performance.timing  返回的[PerformanceTiming对象](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming)

* 其他方法

```js
//首屏时间尝试：
//1,获取首屏基线高度
//2,计算出基线dom元素之上的所有图片元素
//3,所有图片onload之后为首屏显示时间
//
function getOffsetTop(ele) {
    var offsetTop = ele.offsetTop;
    if (ele.offsetParent !== null) {
        offsetTop += getOffsetTop(ele.offsetParent);
    }
    return offsetTop;
}

var firstScreenHeight = win.screen.height;
var firstScreenImgs = [];
var isFindLastImg = false;
var allImgLoaded = false;
var t = setInterval(function() {
    var i, img;
    if (isFindLastImg) {
        if (firstScreenImgs.length) {
            for (i = 0; i < firstScreenImgs.length; i++) {
                img = firstScreenImgs[i];
                if (!img.complete) {
                    allImgLoaded = false;
                    break;
                } else {
                    allImgLoaded = true;
                }
            }
        } else {
            allImgLoaded = true;
        }
        if (allImgLoaded) {
            collect.add({
                firstScreenLoaded: startTime - Date.now()
            });
            clearInterval(t);
        }
    } else {
        var imgs = body.querySelector('img');
        for (i = 0; i < imgs.length; i++) {
            img = imgs[i];
            var imgOffsetTop = getOffsetTop(img);
            if (imgOffsetTop > firstScreenHeight) {
                isFindLastImg = true;
                break;
            } else if (imgOffsetTop <= firstScreenHeight && !img.hasPushed) {
                img.hasPushed = 1;
                firstScreenImgs.push(img);
            }
        }
    }
}, 0);



doc.addEventListener('DOMContentLoaded', function() {
    var imgs = body.querySelector('img');
    if (!imgs.length) {
        isFindLastImg = true;
    }
});

win.addEventListener('load', function() {
    allImgLoaded = true;
    isFindLastImg = true;
    if (t) {
        clearInterval(t);
    }
    collect.log(collect.global);
});
```

### 参考链接:

* [1、首屏计算的黑魔法](https://www.zhihu.com/question/23212408/answer/56647975)
