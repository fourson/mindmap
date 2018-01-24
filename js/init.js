/* 加载页面时运行 */

// 给String类型加一个format方法以便打印log
// 有以下两种调用方式:
// var template1="我是{0}，今年{1}了";
// var template2="我是{name}，今年{age}了";
// var result1=template1.format("silhouette",19);
// var result2=template1.format({name:"silhouette",age:19});
String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length === 1 && typeof (args) === "object") {
            for (var key in args) {
                result = result.replace(new RegExp("(\\{" + key + "\\})", "g"), args[key]);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === undefined)
                    return "";
                else {
                    var reg = new RegExp("(\\{" + i.toString() + "\\})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else
        return this;
};


initialize();

//todo:创建repository并且修改链接为项目地址
console.log("Github link: https://github.com/fourson");


