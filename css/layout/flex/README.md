## flex

> 设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

* 六大属性

`justify-content、justify-items、justify-self`

`align-content、align-items、align-self`

* flex简写

`flex: 0 1 auto` 不能伸展，但可收缩

`flex: 1 1 auto` 伸缩自如

`flex: 0 0 auto` 完全不能伸缩

* 自动margin

  ```css
  .automarigin {
    display: flex;
  }
  .automargin div {
    margint-top: auto;  // 推到下方
  }
  ```


![flex](./images/flex.png)

```css
.grid { display: flex; }
.grid-cell { flex:1 }
.grid-cell.col-1 { flex: 0 0 8.33333%; }
.grid-cell.col-2 { flex: 0 0 16.66667%; }
.grid-cell.col-3 { flex: 0 0 25%; }
.grid-cell.col-4 { flex: 0 0 33.33333%; }
.grid-cell.col-5 { flex: 0 0 41.66667%; }
.grid-cell.col-6 { flex: 0 0 50%; }
.grid-cell.col-7 { flex: 0 0 58.33333%;}
.grid-cell.col-8 { flex: 0 0 66.66667%;}
.grid-cell.col-9 { flex: 0 0 75%;}
.grid-cell.col-10{ flex: 0 0 83.33333%;}
.grid-cell.col-11{ flex: 0 0 91.66667%;}
.grid-cell.col-12{ flex: 0 0 100%;}

.grid.grid-top      { align-items: flex-start; }
.grid.grid-middle   { align-items: center; }
.grid.grid-bottom   { align-items: flex-end; }
.grid.grid-stretch  { align-items: stretch; }
.grid.grid-baseline { align-items: baseline; }
.grid.grid-left     { justify-content: flex-start; }
.grid.grid-center   { justify-content: center; }
.grid.grid-right    { justify-content: flex-end; }
.grid.grid-between  { justify-content: space-between; }
.grid.grid-around   { justify-content: space-around; }
```
