//本人封装的大写字母插件 （自定义插件）（小写变大写）
let myPlugins = {}

myPlugins.install = function (Vue, options) {
    // console.log(options)
    Vue.directive(options.name, (element, params) => {
        //打印
        console.log(params)
        console.log(element)
        //变大写
        element.innerHTML = params.value.toUpperCase()
    });
}

export default myPlugins