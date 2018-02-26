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
    }
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
function f4(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f4(true);  // returns '10'
f4(false); // returns 'undefined'

//里层的for循环会覆盖变量i，因为所有i都引用相同的函数作用域内的变量
function sumMatrix(matrix: number[][]) {
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
    setTimeout(function() { console.log(i); }, 100 * i);
}

//通常的解决方法是使用立即执行的函数表达式（IIFE）
//参数i会覆盖for循环里的i，但是因为我们起了同样的名字
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}


//4.let 声明 语法上同var
let hello = "Hello!";

//块作用域:块作用域变量在包含它们的块或for循环之外是不能访问的
//b的作用域是if语句块里
function f5(input: boolean) {
    let a = 100;
    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
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
let a2;

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
let x2 = 10;
//let x2 = 20; // 错误，不能在1个作用域里多次声明`x`

//并不是要求两个均是块级作用域的声明TypeScript才会给出一个错误的警告
function f7(x) {
    //let x = 100; // error: interferes with parameter declaration
}
function g7() {
    let x = 100;
    //var x = 100; // error: can't have both declarations of 'x'
}
{ let a = 10};
{ let a = 10};

//块级作用域变量需要在明显不同的块里声明
function f8(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }
    return x;
}
f8(false, 0); // returns 0
f8(true, 0);  // returns 100

//在一个嵌套作用域里引入一个新名字的行为称做屏蔽,通常来讲应该避免使用屏蔽
function sumMatrix2(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}


//6.块级作用域变量的获取
//var声明的变量时,创建了一个变量的环境。就算作用域内代码已经执行完毕，这个环境与其捕获的变量依然存在。
function theCityThatAlwaysSleeps() {
    let getCity;
    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }
    return getCity(); //"Seattle"
}

//当let声明变量时，不仅是在循环里引入了一个新的变量环境，而是针对每次迭代都会创建这样一个新作用域
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i); //会输出与预料一致的结果：0 1 2 ...9
}


//7.const声明 拥有与let相同的作用域规则，但是不能对它们重新赋值。
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat,
}

/*// Error:Left-hand side of assignment expression cannot be a constant.
kitty = {
    name: "Danielle",
    numLives: numLivesForCat
};*/

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;


//8.let vs const  使用最小特权原则，所有变量除了你计划去修改的都应该使用const


/*解构：解构赋值允许你使用数组或对象字面量的语法，将数组和对象的属性付给各种变量。
展开：允许你讲一个数组展开为另一个数组，或一个对象展开为另一个对象。*/
//9.解构数组
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
// swap variables
[first, second] = [second, first];
//作用于函数参数
function f9([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
//f9(input); //Error: Argument of type 'number[]' is not assignable to parameter of type '[number, number]'.Property '0' is missing in type 'number[]'.
//可以在数组里使用...语法创建剩余变量
let [first2, ...rest] = [1, 2, 3, 4];
console.log(first2); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
//你可以忽略你不关心的尾随元素
let [, second2, , fourth2] = [1, 2, 3, 4];


//10.对象解构
let obj = {
    a10: "foo",
    b10: 12,
    c10: "bar"
};
/*let { a10, b10 } = obj;
//可以用没有声明的赋值
({ a10, b10 } = { a10: "baz", b10: 101 });*/
//在对象里使用...语法创建剩余变量：
let { a10, ...passthrough } = obj;
let total = passthrough.b10 + passthrough.c10.length;


//11.属性重命名
// 你可以将 a10: newName1 读做 “a10 作为 newName1“
let { a10: newName1, b10: newName2 } = obj;
// let {a10, b10}: {a10: string, b10: number} = obj;


//12.默认值  可以让你在属性为 undefined 时使用缺省值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}


//13.函数声明  解构表达式要尽量保持小而简单
type C = { a: string, b?: number }
function f13({ a, b }: C): void {
    // ...
}

function f131({ a, b } = { a: "", b: 0 }): void {
    // ...
}
f131(); // ok, default to { a: "", b: 0 }

function f132({ a, b = 0 } = { a: "" }): void {
    // ...
}
f132({ a: "yes" }); // ok, default b = 0
f132(); // ok, default to {a: ""}, which then defaults b = 0
//f132({}); // error, 'a' is required if you supply an argument


//14.展开  允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。
let first4 = [1, 2];
let second4 = [3, 4];
let bothPlus = [0, ...first4, ...second4, 5];

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" }; //defaults里的food属性会重写food: "rich"
//展开一个对象实例时，你会丢失其方法
class C1 {
    p = 12;
    m() {
    }
}
let c = new C1();
let clone = { ...c };
clone.p; // ok
//clone.m(); // Error:Property 'm' does not exist on type '{ p: number; }'.
//TypeScript编译器不允许展开泛型函数上的类型参数