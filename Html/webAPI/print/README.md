## web前端打印

* `window.print / document.execCommand('print')`

* 打印样式

  - `@media print{}`

  - `<style type="text/css" media="print"></style>` or `<link rel="stylesheet" media="print" href="print.css">`

  - `@import url("print.css") print`

  - 打印分页样式

    ```css
    .page {
      break-after: page;
      page-break-after: always;
    }
    ```

  - 去掉页眉页脚

    ```css
    @media print {
      @page {
        margin: 0;
      }
      body {
        margin: 2cm;
      }
    }
    ```