/**
 * Created by dongrui on 2018/2/24.
 */
//1.var 声明 ES5以下只支持var声明变量
var a = 10;
//在函数内部定义变量
function f() {
    var message = "Hello, world!";
    return message;
}
//在其它函数内部访问相同的变量
//g可以获取到f2函数里定义的a变量
function f2() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    };
}
var g = f2();
g(); // returns 11;
//当g在f3已经执行完后才被调用，它仍然可以访问及修改a
function f3() {
    var a = 1;
    a = 2;
    var b = g();
    a = 3;
    return b;
    function g() {
        return a;
    }
}
f3(); // returns 2
//2.作用域规则 var声明有些奇怪的作用域规则
function f4(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f4(true); // returns '10'
f4(false); // returns 'undefined'
//里层的for循环会覆盖变量i，因为所有i都引用相同的函数作用域内的变量
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}
//3.变量获取怪异之处
//setTimeout在若干毫秒后执行一个函数，并且是在for循环结束后。 for循环结束后，i的值为10
for (var i = 0; i < 10; i++) {
    setTimeout(function () { console.log(i); }, 100 * i);
}
//通常的解决方法是使用立即执行的函数表达式（IIFE）
//参数i会覆盖for循环里的i，但是因为我们起了同样的名字
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}
//4.let 声明 语法上同var
var hello = "Hello!";
//块作用域:块作用域变量在包含它们的块或for循环之外是不能访问的
//b的作用域是if语句块里
function f5(input) {
    var a = 100;
    if (input) {
        // Still okay to reference 'a'
        var b = a + 1;
        return b;
    }
    // Error: 'b' doesn't exist here
    //return b;
}
//在catch语句里声明的变量也具有同样的作用域规则
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}
// Error: 'e' doesn't exist here
//console.log(e);
//块级作用域的变量的另一个特点是，它们不能在被声明之前读或写
//a2++; // illegal to use 'a' before it's declared;
var a2;
//仍然可以在一个拥有块作用域变量被声明前获取它
//如果生成代码目标为ES2015，现代的运行时会抛出一个错误
function foo() {
    // okay to capture 'a'
    return a;
}
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();
//let a;
//5.重定义及屏蔽
function f6(x) {
    var x;
    var x;
    if (true) {
        var x;
    }
}
//let声明就不会这么宽松了
var x2 = 10;
//let x2 = 20; // 错误，不能在1个作用域里多次声明`x`
//并不是要求两个均是块级作用域的声明TypeScript才会给出一个错误的警告
function f7(x) {
    //let x = 100; // error: interferes with parameter declaration
}
function g7() {
    var x = 100;
    //var x = 100; // error: can't have both declarations of 'x'
}
{
    var a_1 = 10;
}
;
{
    var a_2 = 10;
}
;
//块级作用域变量需要在明显不同的块里声明
function f8(condition, x) {
    if (condition) {
        var x_1 = 100;
        return x_1;
    }
    return x;
}
f8(false, 0); // returns 0
f8(true, 0); // returns 100
//在一个嵌套作用域里引入一个新名字的行为称做屏蔽,通常来讲应该避免使用屏蔽
function sumMatrix2(matrix) {
    var sum = 0;
    for (var i_1 = 0; i_1 < matrix.length; i_1++) {
        var currentRow = matrix[i_1];
        for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
            sum += currentRow[i_2];
        }
    }
    return sum;
}
//6.块级作用域变量的获取
//var声明的变量时,创建了一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。
function theCityThatAlwaysSleeps() {
    var getCity;
    if (true) {
        var city_1 = "Seattle";
        getCity = function () {
            return city_1;
        };
    }
    return getCity(); //"Seattle"
}
//当let声明变量时，不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域
var _loop_1 = function(i_3) {
    setTimeout(function () { console.log(i_3); }, 100 * i_3); //会输出与预料一致的结果：0 1 2 ...9
};
for (var i_3 = 0; i_3 < 10; i_3++) {
    _loop_1(i_3);
}
