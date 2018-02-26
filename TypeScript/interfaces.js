var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by dongrui on 2018/2/26.
 * TypeScript的核心原则之一是：对值所具有的结构进行类型检查
 * 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
 */
//1.接口初探
//printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性
//我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
function printLabel1(labelledObj1) {
    console.log(labelledObj1.label);
}
var myObj1 = { size: 10, label: "Size 10 Object" };
printLabel1(myObj1);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var p1 = { x: 10, y: 20 };
//p1.x = 5; // Error:(48, 4) TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
//TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
var a = [1, 2, 3, 4];
var ro = a;
/*ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!*/
a = ro;
function createSquare4(config) {
    // ...
    return;
}
//let mySquare4 = createSquare4({ colour: "red", width: 100 });
//绕开这些检查非常简单。 最简便的方法是使用类型断言
var mySquare4 = createSquare4({ width: 100, opacity: 0.5 });
//这个对象赋值给一个另一个变量： 因为squareOptions不会经过额外属性检查，所以编译器不会报错
var squareOptions = { colour: "red", width: 100 };
var mySquare4_2 = createSquare4(squareOptions);
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
//对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
var mySearch2;
mySearch2 = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
//函数的参数会逐个进行检查,可不指定类型
var mySearch3;
mySearch3 = function (src, sub) {
    var result = src.search(sub);
    //let result3 = src.trString(); //Error:(109, 23) TS2551: Property 'trString' does not exist on type 'string'. Did you mean 'toString'?
    return result > -1;
};
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
// 共有支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引但是数字索引的返回值必须是字符串索引返回值类型的子类型
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var myArray2 = ["Alice", "Bob"];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    return Clock;
}());
var Clock2 = /** @class */ (function () {
    function Clock2(h, m) {
    }
    Clock2.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock2;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = /** @class */ (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
var square = {};
square.color = "blue";
square.sideLength = 10;
var square2 = {};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
//11.接口继承类
//当接口继承了一个类类型时，它会继承类的成员但不包括其实现
//创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）
var Control = /** @class */ (function () {
    function Control() {
    }
    return Control;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextBox;
}(Control));
/*// Error: Property 'state' is missing in type 'Image'.
class Image2 implements SelectableControl {
    select() { }
}*/
var Location2 = /** @class */ (function () {
    function Location2() {
    }
    return Location2;
}());
