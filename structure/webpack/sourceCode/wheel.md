```js
const fs = require('fs')
const path = require('path')
const esprima = require('esprima')    // 源码转成ast
const estraverse = require('estraverse')    // 遍历过滤ast
// 定义上下文 即所有的寻址都按照这个基准进行
const context = path.resolve(__dirname, '../')
// 处理路径
const pathResolve = (data) => path.resolve(context, data)
// 定义全局数据格式
const dataInfo = {
    // 入口文件源码
    source: '',
    // 分析入口文件源码得出的依赖信息
    requireInfo: null,
    // 根据依赖信息得出的各个模块
    modules: null
}
/**
 * 读取文件
 * @param {String} path 
 */
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err)
                reject(err)
                return
            }
            resolve(data)
        })
    })
}
/**
 * 分析入口源码
 */
const getRequireInfo = () => {
    // 各个依赖的id 从1开始是因为0是入口文件
    let id = 1
    const ret = []
    // 使用esprima将入口源码解析成ast
    const ast = esprima.parse(dataInfo.source, {range: true})
    // 使用estraverse遍历ast
    estraverse.traverse(ast, {
        enter (node) {
            // 筛选出require节点
            if (node.type === 'CallExpression' && node.callee.name === 'require' && node.callee.type === 'Identifier') {
                // require路径，如require('./index.js')，则requirePath = './index.js'
                const requirePath = node.arguments[0]
                // 将require路径转为绝对路径
                const requirePathValue = pathResolve(requirePath.value)
                // 如require('./index.js')中'./index.js'在源码的位置
                const requirePathRange = requirePath.range
                ret.push({requirePathValue, requirePathRange, id})
                id++
            } 
        }
    })
    return ret
}
/**
 * 模块模板
 * @param {String} content 
 */
const moduleTemplate = (content) => `function (module, require) {\n${content}\n},`
/**
 * 获取模块信息
 */
const getModules = async () => {
    const requireInfo = dataInfo.requireInfo
    const modules = []
    for (let i = 0, len = requireInfo.length; i < len; i++) {
        const file = await readFile(requireInfo[i].requirePathValue)
        const content = moduleTemplate(file.toString())
        modules.push(content)
    }
    return modules
}
/**
 * 将入口文件如require('./module/one.js')等对应成require(1)模块id
 */
const replace = () => {
    const requireInfo = dataInfo.requireInfo
    // 需要倒序处理，因为比如第一个require('./module/one.js')中的路径是在源码字符串42-59这个区间
    // 而第二个require('./module/two.js')中的路径是在源码字符串82-99这个区间，那么如果先替换位置较前的代码
    // 则此时源码字符串已经少了一截（从'./module/one.js'变成1），那第二个require的位置就不对了
    const sortRequireInfo = requireInfo.sort((item1, item2) => item1.requirePathRange[0] < item2.requirePathRange[0])
    sortRequireInfo.forEach(({requirePathRange, id}) => {
        const start = requirePathRange[0]
        const end = requirePathRange[1]
        const headerS = dataInfo.source.substr(0, start)
        const endS = dataInfo.source.substr(end)
        dataInfo.source = `${headerS}${id}${endS}`
    })
}
/**
 * 输出打包好的文件
 */
const output = async () => {
    const data = await readFile(pathResolve('./template/indexTemplate.js'))
    const indexModule = moduleTemplate(dataInfo.source)
    const allModules = [indexModule, ...dataInfo.modules].join('')
    const result = `${data.toString()}([\n${allModules}\n])`
    fs.writeFile(pathResolve('./build/output.js'), result, function (err) {
        if (err) {
            throw err;
        }
    })
}

const main = async () => {
    // 读取入口文件
    const data = await readFile(pathResolve('./index.js'))
    dataInfo.source = data.toString()
    // 获取依赖信息
    dataInfo.requireInfo = getRequireInfo()
    // 获取模块信息
    dataInfo.modules = await getModules()                                                                             
    // 将入口文件如require('./module/one.js')等对应成require(1)模块id
    replace()
    // 输出打包好的文件
    output()
    console.log(JSON.stringify(dataInfo))
}
main()
```