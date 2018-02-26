/**
 * Created by dongrui on 2018/2/26.
 * TypeScript的核心原则之一是：对值所具有的结构进行类型检查
 * 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约
 */
//1.接口初探
//printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性
//我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
//只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
interface LabelledValue {
    label: string;
}
function printLabel1(labelledObj1: LabelledValue) {
    console.log(labelledObj1.label);
}
let myObj1 = {size: 10, label: "Size 10 Object"};
printLabel1(myObj1);

//2.可选属性
//好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let mySquare = createSquare({color: "black"});

//3.只读属性
//一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用readonly来指定只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
//p1.x = 5; // Error:(48, 4) TS2540: Cannot assign to 'x' because it is a constant or a read-only property.

//TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
/*ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!*/
a = ro as number[];

//readonly vs const
// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。
// 做为变量使用的话用const，若做为属性则使用readonly


//4.额外的属性检查
interface SquareConfig4 {
    color?: string;
    width?: number;
}
function createSquare4(config: SquareConfig4): { color: string; area: number } {
    // ...
    return ;
}
//let mySquare4 = createSquare4({ colour: "red", width: 100 });
//绕开这些检查非常简单。 最简便的方法是使用类型断言
let mySquare4 = createSquare4({ width: 100, opacity: 0.5 } as SquareConfig4);
//最佳的方式是能够添加一个字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
//这个对象赋值给一个另一个变量： 因为squareOptions不会经过额外属性检查，所以编译器不会报错
let squareOptions = { colour: "red", width: 100 };
let mySquare4_2 = createSquare4(squareOptions);

//5.函数类型
//为了使用接口表示函数类型，我们需要给接口定义一个调用签名
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}

//对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
let mySearch2: SearchFunc;
mySearch2 = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}
//函数的参数会逐个进行检查,可不指定类型
let mySearch3: SearchFunc;
mySearch3 = function(src, sub) {
    let result = src.search(sub);
    //let result3 = src.trString(); //Error:(109, 23) TS2551: Property 'trString' does not exist on type 'string'. Did you mean 'toString'?
    return result > -1;
}


//6.可索引的类型:可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
//我们定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用number去索引StringArray时会得到string类型的返回值
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];

// 共有支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引但是数字索引的返回值必须是字符串索引返回值类型的子类型
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}
// Error:(132, 5) TS2413: Numeric index type 'Animal' is not assignable to string index type 'Dog'.
/*interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}*/
//字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    //name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

//你可以将索引签名设置为只读，这样就防止了给索引赋值
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
//myArray2[2] = "Mallory"; // Error:(148, 1) TS2542: Index signature in type 'ReadonlyStringArray' only permits reading.


//7.类类型--实现接口:TypeScript也能够用它来明确的强制一个类去符合某种契约
interface ClockInterface {
    currentTime: Date;
}
class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

//也可以在接口中描述一个方法，在类里实现它，如同下面的setTime方法一样
interface ClockInterface2 {
    currentTime: Date;
    setTime(d: Date);
}
class Clock2 implements ClockInterface2 {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

//8.类静态部分与实例部分的区别
interface ClockConstructor {
    new (hour: number, minute: number);
}
/*
class Clock3 implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}//当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误*/

// ClockConstructor为构造函数所用和ClockInterface为实例方法所用。
// 了方便我们定义一个构造函数createClock，它用传入的类型创建实例。
interface ClockConstructor3 {
    new (hour: number, minute: number): ClockInterface3;
}
interface ClockInterface3 {
    tick();
}
function createClock(ctor: ClockConstructor3, hour: number, minute: number): ClockInterface3 {
    return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface3 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface3 {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


//9.继承接口
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

//一个接口可以继承多个接口，创建出多个接口的合成接口
interface Shape2 {
    color: string;
}
interface PenStroke2 {
    penWidth: number;
}
interface Square2 extends Shape2, PenStroke2 {
    sideLength: number;
}
let square2 = <Square2>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;


//10.混合类型
//一个对象可以同时做为函数和对象使用，并带有额外的属性
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


//11.接口继承类
//当接口继承了一个类类型时，它会继承类的成员但不包括其实现
//创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）
class Control {
    private state: any;
}
interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control implements SelectableControl {
    select() { }
}
class TextBox extends Control {

}
/*// Error: Property 'state' is missing in type 'Image'.
class Image2 implements SelectableControl {
    select() { }
}*/
class Location2 {

}