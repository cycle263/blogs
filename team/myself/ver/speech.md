* encode vs btoa vs escape

```js
fetch('https://api.github.com/repos/cycle263/blogs/git/blobs/9d98c5b00150c1ee29a8f0f07a996459e7189420')
.then(res => res.json())
.then(json => console.log(decodeURIComponent(escape(atob(json.content)))));
```

* escape

  不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。