## webpack之代码拆分

* CommonsChunkPlugin

    - options.name/names (string | string[])

        哪些代码块，可以为数组

    - options.filename(string)

        代码块输出的名称

    - options.minChunks(number | Infinity | function(module, count) -> boolean)

    - options.chunks(string[])

    - options.children(boolean)

    - options.async(boolean | string)

    - options.minSize
