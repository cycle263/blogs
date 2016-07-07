## ECMAScript 6 新功能

    > [es 6 案例解析](http://es6-features.org/)

* constants - 常量

    ECMAScript 6 写法：
    ```
    const PI = 3.141593;
    PI > 3.0;
    ```

    ECMAScript 5 写法：
    ```
    Object.defineProperty(typeof global === "object" ? global : window, "PI", {
        value:        3.141593,
        enumerable:   true,
        writable:     false,
        configurable: false
    })
    PI > 3.0;
    ```

* 块作用域 - 变量和函数

    ```
    {
        function foo () { return 1; }
        foo() === 1;
        {
            function foo () { return 2; }
            foo() === 2;
        }
        foo() === 1;
    }
    ```

* 箭头函数 - =>

    ```
    odds  = evens.map(v => v + 1);
    pairs = evens.map(v => ({ even: v, odd: v + 1 }));
    nums  = evens.map((v, i) => v + i);
    ```

* 扩展参数处理 - ...和默认值

    ```
    function f (x, y, ...a) {
        return (x + y) * a.length;
    }
    f(1, 2, "hello", true, 7) === 9;
    ```

    ```
    var params = [ "hello", true, 7 ];
    var other = [ 1, 2, ...params ]; // [ 1, 2, "hello", true, 7 ]
    f(1, 2, ...params) === 9;

    var str = "foo";
    var chars = [ ...str ]; // [ "f", "o", "o" ]
    ```

* 模板字符串

    - 字符串插入

        ```
        var customer = { name: "Foo" };
        var card = { amount: 7, product: "Bar", unitprice: 42 };
        message = `Hello ${customer.name},
        want to buy ${card.amount} ${card.product} for
        a total of ${card.amount * card.unitprice} bucks?`;
        ```

    - 自定义插入

        ECMAScript 6 写法：
        ```
        get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`;
        ```

        ECMAScript 5 写法：
        ```
        get([ "http://example.com/foo?bar=", "&quux=", "" ],bar + baz, quux);
        ```

    - 字符串访问

        ```
        function quux (strings, ...values) {
            strings[0] === "foo\n";
            strings[1] === "bar";
            strings.raw[0] === "foo\\n";
            strings.raw[1] === "bar";
            values[0] === 42;
        }
        quux `foo\n${ 42 }bar`

        String.raw `foo\n${ 42 }bar` === "foo\\n42bar";
        ```

* 进制和编码

    - 进制

        ECMAScript 6 写法：
        ```
        0b111110111 === 503;
        0o767 === 503;
        ```

        ECMAScript 5 写法：
        ```
        parseInt("111110111", 2) === 503;
        parseInt("767", 8) === 503;
        0767 === 503; // only in non-strict, backward compatibility mode
        ```

    - 编码

        ```
        "𠮷".length === 2;
        "𠮷".match(/./u)[0].length === 2;
        "𠮷" === "\uD842\uDFB7";
        "𠮷" === "\u{20BB7}";
        "𠮷".codePointAt(0) == 0x20BB7;
        for (let codepoint of "𠮷") console.log(codepoint);
        ```

* 缩写语法

    `obj = {x, y}` 等同于 `obj = {x: x, y: y}`;

    ```
    let obj = {
        foo: "bar",
        [ "baz" + quux() ]: 42
    };
    obj = {
        foo (a, b) {
            …
        },
        bar (x, y) {
            …
        }
    };
    ```

* 赋值分配

    ```
    var list = [ 1, 2, 3 ];
    var [ a, , b ] = list;
    [ b, a ] = [ a, b ];    //a、b值互换

    var list = [ 7, 42 ];
    var [ a = 1, b = 2, c = 3, d ] = list;
    a === 7;
    b === 42;
    c === 3;
    d === undefined;

    var { op, lhs, rhs } = getASTNode();    //多个赋值

    var { op: a, lhs: { op: b }, rhs: c } = getASTNode();   //多个深层赋值
    ```

    ECMAScript 6 写法：
    ```
    function f ([ name, val ]) {
        console.log(name, val);
    }
    function g ({ name: n, val: v }) {
        console.log(n, v);
    }
    function h ({ name, val }) {
        console.log(name, val);
    }
    f([ "bar", 42 ]);
    g({ name: "foo", val:  7 });
    h({ name: "bar", val: 42 });
    ```

    ECMAScript 5 写法：
    ```
    function f (arg) {
        var name = arg[0];
        var val  = arg[1];
        console.log(name, val);
    };
    function g (arg) {
        var n = arg.name;
        var v = arg.val;
        console.log(n, v);
    };
    function h (arg) {
        var name = arg.name;
        var val  = arg.val;
        console.log(name, val);
    };
    f([ "bar", 42 ]);
    g({ name: "foo", val:  7 });
    h({ name: "bar", val: 42 });
    ```

* 模块

    ```
    //  lib/math.js
    export function sum (x, y) { return x + y };
    export var pi = 3.141593;

    //  someApp.js
    import * as math from "lib/math";
    console.log("2π = " + math.sum(math.pi, math.pi));

    //  otherApp.js
    import { sum, pi } from "lib/math";
    console.log("2π = " + sum(pi, pi));


    //  lib/mathplusplus.js
    export * from "lib/math";
    export var e = 2.71828182846;
    export default (x) => Math.exp(x);

    //  someApp.js
    import exp, { pi, e } from "lib/mathplusplus";
    console.log("e^{π} = " + exp(pi));
    ```
