## viewport

* css3的新特性，适用于智能手表等非矩形屏幕

  - viewport-fit: auto|cover|contain

  - @media(shape: rect|round)

  - shape-inside / border-boundary

```css
@viewport {
  width: extend-to-zoom 100%;
  heigth: auto;
  zoom: 1.0;
}

// 等价于
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```